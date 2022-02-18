class CommandProcessor {
  constructor (message) {
    this.runCommand(message.content)
  }

  runCommand(commandName) {
    const commandPath = commandName.replace(process.env.COMMAND_SUFFIX, '').replace('_', '/');
    const command = require('../commands/' + commandPath);
    command.run();
  }
}

module.exports = CommandProcessor;