const {upsertUser} = require('../../models/User');
const CommandProcessor = require('../../components/commandProcessor');
const BotConfig = require('../../config/botConfig');

module.exports = async msg => {
  if (msg.author.bot) return;

  const user = await upsertUser(msg.member.user);

  if (msg.content.startsWith(BotConfig.command_suffix)) {
    const commandProcessor = new CommandProcessor(user, msg);
    commandProcessor.start();
  }
};