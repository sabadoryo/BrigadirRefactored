module.exports = {
  commands_root: 'commands',
  command_suffix: process.env.COMMAND_SUFFIX ? process.env.COMMAND_SUFFIX : '!',
  separation_suffix: process.env.SEPARATION_SUFFIX ? process.env.SEPARATION_SUFFIX : '_',
  flag_suffix: process.env.FLAG_SUFFIX ? process.env.FLAG_SUFFIX : '--',
};