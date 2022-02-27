class Test {
  description() {
    return 'Test command from: test';
  }

  async run(user, discordMessage, commandsName, params) {
    discordMessage.reply('/tts Hello from test!');
  }
}

module.exports = Test;