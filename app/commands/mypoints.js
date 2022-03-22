const { createDefaultTable } = require("../helpers/defaultTable");
const { getUserWithClanwarProfiles } = require("../models/User");

class Mypoints {
  args = null;

  description() {
    return 'Посмотреть ваши поинты';
  }

  async run(user, discordMessage, commandsName, params) {
    let userData = await getUserWithClanwarProfiles(user.id)
    let rowEmbeds = [];

    if (userData.clanwarProfiles.length > 0) {
      rowEmbeds = userData.clanwarProfiles.map(p => {
        return {name : p.discipline.name, value: p.points}
      })
    }

    rowEmbeds.push({name: "DiscordScore???", value: userData.discord_score})

    const table = createDefaultTable(rowEmbeds, 'Ваши поинты')

    discordMessage.reply({
      content: "ваши птсики",
      embeds: [
        table
      ]
    }).then(m => {
      setTimeout(() => {
        m.delete(),
        discordMessage.delete()
      }, 10000)
    })
  }
}

module.exports = Mypoints;