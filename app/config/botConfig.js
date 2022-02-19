let BotConfig;

BotConfig = {
  command_suffix: process.env.COMMAND_SUFFIX ? process.env.COMMAND_SUFFIX : '!',
  separation_suffix: process.env.SEPARATION_SUFFIX ? process.env.SEPARATION_SUFFIX : '_',
};

module.exports = BotConfig;