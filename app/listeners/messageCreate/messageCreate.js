
const {upsertUser} = require('../../models/User');
const CommandProcessor = require('../../components/commandProcessor');
const BotConfig = require('../../config/botConfig');

module.exports = async msg => {
  if (msg.author.bot || !msg.member.user) return;

  const user = await upsertUser(msg.member.user);

  if (msg.content.startsWith(BotConfig.command_suffix)) {

    if (process.env.MAINTENANCE_MODE == "ON" && msg.channel.id != "944535211096559676") {
      msg.reply(':tools: maintenance mode :tools: ')
      return;
    }

    const commandProcessor = new CommandProcessor(user, msg);
    await commandProcessor.start();
  }
};