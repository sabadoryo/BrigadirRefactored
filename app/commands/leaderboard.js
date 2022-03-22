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

    let gold = [], silver = [], bronze = []

    discipline.clanwarProfiles.forEach((profile, i) => {
      let data = {name: `${i + 1}.${profile.user.name}`, value: profile.points}
      if (i < 3) {
        gold.push(data)
      }

      if(i >= 3 && i < 7) {
        silver.push(data)
      }

      if (i >= 7 && i < 10) {
        bronze.push(data)
      }
    })

    const goldTable = createDefaultTable(gold, `top 3 ${discipline.name}`, 'golden boyz', '#FFD700')
    const silverTable = createDefaultTable(silver, `top 4 - 7 ${discipline.name}`, 'silver boyz', '#C0C0C0')
    const bronzeTable = createDefaultTable(bronze, `top 8+ ${discipline.name}`, 'bronze boyz', '#CD7F32')

    discordMessage.reply({
      embeds: [
        goldTable,
        silverTable,
        bronzeTable
      ]
    }).then(m => {
      setTimeout(() =>  {
        m.delete()
        discordMessage.delete()
      }, 30000)
    })
  }
}

module.exports = Leaderboard;