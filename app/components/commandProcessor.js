const logger = require('simple-node-logger').createSimpleLogger('logs.txt');
const BotConfig = require('../config/botConfig');
const fs = require('fs');

class CommandProcessor {

  user;
  discordMessage;
  commandName = '';
  params = [];
  helpCommandMessage = '';

  constructor(user, message) {
    this.user = user;
    this.discordMessage = message;
    this.divideContent(message.content);
  }

  start() {
    if (this.isValidCommand() && this.commandName !== BotConfig.help_command_name) {
      this.runCommand();
    } else if (this.commandName === BotConfig.help_command_name) {
      this.runHelpCommand(BotConfig.commands_root.replace('..', 'app')).then(() => {
        console.log(this.helpCommandMessage);
      });
    } else {
      this.discordMessage.reply('Invalid command!');
    }
  }

  runCommand() {
    try {

      const Command = require(BotConfig.commands_root + this.getCommandPath());
      const command = new Command();
      command.run(this.user, this.discordMessage, this.commandName, this.params);

    } catch (error) {

      if (error.code === 'MODULE_NOT_FOUND') {
        this.discordMessage.reply('This is not a command!');
      } else {
        logger.error(error, this.user);
        this.discordMessage.reply('Incomprehensible error, write to programmers');
      }

    }
  }

  async runHelpCommand(root) {
    await fs.readdir(root, (err, files) => {
      files.forEach(file => {
        const start = fs.statSync(root + file);
        if (start.isDirectory()) {
          this.runHelpCommand(root + file + '/');
        } else {
          const Command = require(root.replace('app', '..') + file.replace('.js', ''));
          const command = new Command();
          this.helpCommandMessage += command.discription() + '\n';
          console.log(command.discription());
        }
      });
    });
  }

  getCommandPath() {
    return this.commandName.replace(BotConfig.separation_suffix, '/');
  }

  isValidCommand() {
    return !(this.commandName.length <= 1 || this.commandName.includes('/'));
  }

  divideContent(messageContent) {
    const result = messageContent.split(' ');
    this.commandName = result.shift().replace(BotConfig.command_suffix, '');
    this.params = result;
  }
}

module.exports = CommandProcessor;