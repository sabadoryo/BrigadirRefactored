const {upsertUser} = require('../../models/User')

module.exports = async msg => {
  if (msg.author.bot) return;

  const user = await upsertUser(msg.member.user)

  console.log(user)

  if (msg.content.startsWith(process.env.COMMAND_SUFFIX)) {
    const commandProcessor = new CommandProcessor(msg);
    commandProcessor.start();
  } else {
    console.log("Not command")
  }
}