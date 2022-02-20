const CommandProcessor = require('../components/commandProcessor');
  
module.exports = async msg => {
  if (msg.author.bot) return;

  if (msg.content.startsWith(process.env.COMMAND_SUFFIX)) {
    const commandProcessor = new CommandProcessor(msg);
    commandProcessor.start();
  } else {
    console.log("Not command")
  }
}