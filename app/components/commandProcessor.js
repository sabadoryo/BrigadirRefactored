const logger = require('simple-node-logger').createSimpleLogger('logs.txt');
const BotConfig = require('../config/botConfig');

class CommandProcessor {

  commandsRoot = '../commands/';
  discordMessage;
  commandName = '';
  params = [];

  constructor(message) {
    this.discordMessage = message;
    this.divideContent(message.content);
  }

  start() {
    if (this.isValidCommand()) {
      this.runCommand();
    } else {
      this.discordMessage.reply('Invalid command!');
    }
  }

  runCommand() {
    try {

      const command = require(this.commandsRoot + this.getCommandPath());
      command.run(this.discordMessage, this.commandName, this.params);
    } catch (error) {
      logger.error(error)
      if (error.code === 'MODULE_NOT_FOUND') {
        this.discordMessage.reply('This is not a command!');
      } else {
        this.discordMessage.reply('Incomprehensible error, write to programmers');
      }

    }
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