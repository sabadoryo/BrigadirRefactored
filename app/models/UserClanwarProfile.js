const db = require('../components/database')

async function upsertUserClanWarProfile(userId, disciplineId) {
  return db.userClanwarProfile.upsert({
    where: {
      user_id_discipline_id : {
        user_id : userId, 
        discipline_id: disciplineId
      }
    },
    create: {
      user_id : userId,
      discipline_id : disciplineId,
      points: 1000
    },
    update : {}
  })
}

async function updateUserClanwarProfilePoints(userId, disciplineId, type, amount) {
  return db.userClanwarProfile.update({
    where: {
      user_id_discipline_id : {
        user_id : userId, 
        discipline_id: disciplineId
      }
    },
    data: {
      points: {
       increment: type === 'inc' ? amount : -amount
      }
    },
    include : {
      user: true
    }
  })
}

async function getClanwarProfilesByDiscipline(discpline) {
  return db.userClanwarProfile.findMany({
    where : {
      discipline: {
        id : discpline.id
      }
    },
    include: {
      user: true
    }
  })
}

module.exports = {
  upsertUserClanWarProfile,
  updateUserClanwarProfilePoints,
  getClanwarProfilesByDiscipline
}