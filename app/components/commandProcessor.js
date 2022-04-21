const logger = require('simple-node-logger').createSimpleLogger('logs.txt');
const BotConfig = require('../config/botConfig');
const ParamProcessor = require('./paramProcessor');

class CommandProcessor {

  user;
  discordMessage;
  commandName = '';
  params = [];

  constructor(user, message) {
    this.user = user;
    this.discordMessage = message;
    this.divideContent(message.content);
  }

  async start() {
    if (this.isValidCommand()) {
      await this.runCommand();
    } else {
      this.discordMessage.reply('Invalid command!');
    }
  }

  async runCommand() {
    try {

      const Command = require('../' + BotConfig.commands_root + '/' + this.getCommandPath());
      const command = new Command();
      const paramProcessor = new ParamProcessor(command, this.params);
      if (paramProcessor.notFoundFlags.length) {
        this.discordMessage.reply('Not found flags: ' + paramProcessor.notFoundFlags.toString());
      }
      await command.run(this.user, this.discordMessage, this.commandName, this.params);

    } catch (error) {

      if (error.code === 'MODULE_NOT_FOUND') {
        this.discordMessage.reply('This is not a command!');
      } else {
        logger.error(error, this.user);
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