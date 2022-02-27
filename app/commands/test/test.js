class Test {
  description() {
    return 'Test command from: test/test';
  }

  async run(user, discordMessage, commandsName, params) {
    discordMessage.reply('Hello from test/test!');
  }
}

module.exports = Test;