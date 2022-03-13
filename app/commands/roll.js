class Roll {
  description() {
    return 'Случайное число.';
  }

  async run(user, discordMessage, commandsName, params) {

    if (params.includes('--with-luck')) {
      discordMessage.reply('100')
      return;
    }
    const randomNumber = await Math.floor(Math.random() * 100)
    discordMessage.reply(`${randomNumber}`)
  }
}

module.exports = Roll;