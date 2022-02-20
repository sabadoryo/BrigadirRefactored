class Test {
  discription() {
    return 'Test command from: test/test';
  }

  run(user, discordMessage, commandsName, params) {
    discordMessage.reply('Hello from test/test!');
  }
}

module.exports = Test;