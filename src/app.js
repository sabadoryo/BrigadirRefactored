const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');

class App {
  constructor(token) {
    this.client = new Client({
      intents: [
          Intents.FLAGS.GUILDS,
          Intents.FLAGS.GUILD_MESSAGES,
          Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
          Intents.FLAGS.GUILD_MEMBERS,
          Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
          Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
          Intents.FLAGS.GUILD_VOICE_STATES,
          Intents.FLAGS.DIRECT_MESSAGES
      ],
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    });

    this.token = token
  }

  start() {
    this.client.login(process.env.TOKEN);
    return this.client
  }
}

module.exports = App