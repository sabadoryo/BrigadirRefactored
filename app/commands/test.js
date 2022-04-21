class Test {
  description() {
    return 'Test Command';
  }

  async run(user, discordMessage, commandsName, params) {
    console.log('Hello from test');
  }

  flags() {
    return [
      {
        name: 'super',
        short_name: 's',
        description: 'super test',
      },
      {
        name: 'super-v2',
        short_name: 's2',
        description: 'super version 2 test',
      },
    ];
  }
}

module.exports = Test;