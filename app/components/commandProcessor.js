const fs = require('fs');

class CommandProcessor {

  commandsRoot = '../commands/';

  constructor(message) {
    if (this.isValidCommand(message.content)) {
      message.reply('Invalid command!');
    } else {
      this.runCommand(message);
    }
  }

  runCommand(message) {
    try {

        const command = require(this.commandsRoot + this.getCommandPath(message.content));
        command.run(message);

    } catch (error) {

      if (error.code === 'MODULE_NOT_FOUND') {
        message.reply('This is not a command!');
      } else {
        message.reply('Incomprehensible error, write to programmers');
      }

    }
  }

  getCommandPath(messageContent) {
    return messageContent
      .replace(process.env.COMMAND_SUFFIX, '')
      .replace('_', '/');
  }

  isValidCommand(messageContent) {
    let result = messageContent.length <= 1;
    result = result || messageContent.includes('/');
    result = result || messageContent.includes('  ');

    return result;
  }
}

module.exports = CommandProcessor;