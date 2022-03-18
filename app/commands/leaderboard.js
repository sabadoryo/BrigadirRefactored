const minimist = require('minimist');
const { createDefaultTable } = require('../helpers/defaultTable');
const { getDisciplineByName, getAllDisciplines } = require('../models/Discipline');

class Leaderboard {
  args = null;

  description() {
    return `Показать топ по дисциплине: <dota,cs>`;
  }

  async run(user, discordMessage, commandsName, params) {
    this.args = minimist(params)
    const availableDiscs = await getAllDisciplines();
    const disciplines = availableDiscs.map(d => d.name).join(", ")

    if (!this.args._[0]) {
      discordMessage.reply(`Введите дисциплину :${disciplines}`)
      return;
    }

    const discipline = await getDisciplineByName(this.args._[0])

    if (!discipline) {
      discordMessage.reply(`Такой дисциплины не существует, существующие: ${disciplines}`)
      return;
    }

    const romsEmbed = discipline.clanwarProfiles.map(p => {
      return {name: p.user.name, value: p.points}
    })

    const table = createDefaultTable(romsEmbed, `Лидеры ${discipline.name}`)

    discordMessage.reply({
      embeds: [
        table
      ]
    })
  }
}

module.exports = Leaderboard;