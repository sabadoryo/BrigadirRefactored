const fs = require('fs');
const BotConfig = require('./app/config/botConfig');
const {PrismaClient} = require('@prisma/client');

run('app/' + BotConfig.commands_root + '/');

function run(root) {
  fs.readdir(root, async (err, files) => {
    for (const file of files) {

      const start = fs.statSync(root + file);

      if (start.isDirectory()) {
        run(root + file + '/');
      } else {

        console.log('save ' + file + 'from: ' + root);

        const path = root + file.replace('.js', '');

        const Command = require('./' + path);
        const command = new Command();
        const name = BotConfig.command_suffix + path
          .replace('app/' + BotConfig.commands_root + '/', '')
          .replace('/', BotConfig.separation_suffix);

        const prisma = new PrismaClient();
        await prisma.command.upsert({
          where: {
            name: name,
          },
          update: {
            description: command.description(),
          },
          create: {
            name: name,
            description: command.description(),
          },
        });

      }
    }
  });
}