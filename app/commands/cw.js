class ClanWars {
  description() {
    return 'Начать рейтинговый clan wars. Для детальной информации !cw --help';
  }

  async run(user, message, commandsName, params) {

    if (params.includes('--help')) {
      message.reply(`
        Flags:
        1) --algorithm : full-random, mmr, disbalance, preset. Алгоритм балансировки комманд
      `);

      return;
    }
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      message.reply('Ты не находишься на голосовом канале')
      return;
    }

    if (voiceChannel.members.size !== 10) {
      message.reply('На голосовом канале должно находиться ровно 10 работяг')
      return;
    }

    message.reply('Команда еще не готова')
    return;
    
  }
}

module.exports = ClanWars;