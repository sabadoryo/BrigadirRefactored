class Test {
  discription() {
    return 'Test command from: test';
  }

  run(user, discordMessage, commandsName, params) {
    discordMessage.reply('Hello from test!');
  }
}

module.exports = Test;