class Roll {
  description() {
    return 'Случайное число';
  }

  async run(user, discordMessage, commandsName, params) {
    const randomNumber = await Math.floor(Math.random() * 100)
    await discordMessage.reply(`${randomNumber}`)
  }
}

module.exports = Roll;