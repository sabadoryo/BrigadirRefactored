const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function upsertUser(user) {
    return prisma.user.upsert({
        where: {
            discord_id: user.id
        },
        create: {
            discord_id: user.id,
            name: user.username,
            discord_score: 1
        },
        update: {
            discord_id: user.id,
            name: user.username
        }
    })
}

module.exports = {
  upsertUser
}