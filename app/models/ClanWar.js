const db = require('../components/database')

async function getClanwarByName(name, end_time = null) {
  return await db.clanwar.findFirst({ 
    where: { 
      name: name, 
      end_time : end_time 
    }, 
    include: {
      teamA: {
        include: {
          members: true
        }
      },
      teamB: {
        include: {
          members: true
        }
      },
      winner: {
        include : {
          members: {
            include: {
              member : true
            }
          }
        }
      },
    } 
  })
}

async function createClanwar(name, teamAId, teamBId, disciplineId, voiceAId, voiceBId) {
  return await db.clanwar.create({
    data: {
      name: name,
      discipline: {
        connect: {id : disciplineId}
      },
      teamA: {
        connect: { id : teamAId },
      },
      teamB: {
        connect: { id : teamBId },
      },
      start_time: new Date(),
      voiceA_id : voiceAId,
      voiceB_id : voiceBId
    }
  })
}

async function finishClanwar(clanwar, winnerId) {
  return db.clanwar.update({
    where: {
      id: clanwar.id
    },
    data: {
      end_time: new Date(),
      winner_id: winnerId
    },
    include : {
      winner: {
        include : {
          members: {
            include: {
              member : {
                include: {
                  clanwarProfiles: {
                    where : {
                      discipline_id: clanwar.discipline_id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
}

async function clanwarSetPog(clanwarId, pogId) {
  return db.clanwar.update({
    where: {
      id: clanwarId
    },
    data: {
      pog_id : pogId
    }
  })
}

module.exports = {
  getClanwarByName,
  createClanwar,
  finishClanwar,
  clanwarSetPog,
}