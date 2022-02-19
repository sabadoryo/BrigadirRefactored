class CommandProcessor {

  rootPath = '../commands/';

  constructor (message) {
    if (this.isValidCommand(message.content)) {
      message.reply('Invalid command!');
    } else {
      this.runCommand(message);
    }
  }

  runCommand(message) {
    const command = require(this.rootPath + this.getPath(message.content));
    command.run(message);
  }

  getPath(messageContent) {
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