const db = require('../components/database')

async function upsertUser(user) {
    return db.user.upsert({
        where: {
            discord_id: user.id
        },
        create: {
            discord_id: user.id,
            name: user.username,
            discord_score: 1,
            avatar_hash: user.avatar
        },
        update: {
            discord_id: user.id,
            name: user.username,
            discord_score: {
                increment : 1
            },
            avatar_hash: user.avatar
        }
    })
}

async function getUserWithClanwarProfiles(userId) {
    return db.user.findUnique({
        where: {
            id: userId
        },
        include : {
            clanwarProfiles : {
                include : {
                    discipline: true
                }
            }
        }
    })
}

async function getUsersWithinRangeWhereDiscipline(userIds, discipline) {
    return db.user.findMany({
        where: {
            id: { in: userIds }
        },
        include: {
            clanwarProfiles : {
                where: {
                    discipline: {
                        name: discipline.name
                    }
                }
            }
        }
    })
}

module.exports = {
  upsertUser,
  getUserWithClanwarProfiles,
  getUsersWithinRangeWhereDiscipline
}