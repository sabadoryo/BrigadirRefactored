const BotConfig = require('../config/botConfig');
const FlagObj = require('./flagObj');

class ParamProcessor {

  discordMessage;
  command;
  params = [];

  notFoundFlags = [];
  foundFlags = [];

  constructor(command, params) {
    this.command = command;
    this.params = params;
    this.parseParamToFlag();
  }

  parseParamToFlag() {
    for (let param of this.params) {

      if (param.startsWith(BotConfig.flag_suffix)) {
        const userFlag = param.replace(BotConfig.flag_suffix, '').split('=');
        const result = this.command.flags().find(function (flag) {
          if (flag.name === userFlag[0] || flag.short_name === userFlag[0]) {
            return true;
          }
        });

        if (result === undefined) {
          this.notFoundFlags.push(userFlag[0]);
        }

      }
    }
  }
}

module.exports = ParamProcessor;