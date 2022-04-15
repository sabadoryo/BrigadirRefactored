const {PrismaClient} = require('@prisma/client');

class Help {
  description() {
    return 'heeeeeeelp';
  }

  async run(user, discordMessage, commandsName, params) {
    const prisma = new PrismaClient;
    const commands = await prisma.command.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    let message = '';
    commands.map((command) => {
      message += `**${command.name}**` + ' : ' + command.description + '\n\n';
    });

    discordMessage.reply(message);
  }
}

module.exports = Help;