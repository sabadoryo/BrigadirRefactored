const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;

class Halyava {
  description() {
    return 'Быстрей забери халяву!';
  }

  async run(user, discordMessage, commandsName, params) {
    var threeHoursBefore = new Date();
    threeHoursBefore.setHours(threeHoursBefore.getHours() - 3);

    const lastHalyava = await prisma.halyava.findFirst({
        where: {
            createdAt: {
                gte: threeHoursBefore
            }
        }
    })

    if (lastHalyava) {
        let lastHalyavaDate = new Date(lastHalyava.createdAt)
        let nextHalyavaDate = new Date(lastHalyavaDate.setHours(lastHalyavaDate.getHours() + 3))
        let nextHalyavaSecondsLeft = (nextHalyavaDate.getTime() - (new Date).getTime()) / 1000

        discordMessage.reply(`Следующая халява будет доступна через ${nextHalyavaSecondsLeft} секунд`)
        return;
    } else {
        await this.proceedHalyava(user);
        discordMessage.channel.send(`**${user.name} сорвал халяву!** 🙀`)
    }
  }
  async proceedHalyava(user) {
    const randomScore =  Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            discord_score: user.discord_score + randomScore
        }
    })

    await prisma.halyava.create({
        data: {
            looterId: user.id,
            createdAt: new Date()
        }
    });
  }
}

module.exports = Halyava;