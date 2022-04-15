const { createDefaultTable } = require("../helpers/defaultTable");
const { createPartyWithLeader } = require("../models/Party");
const minimist = require('minimist');
const { getAllDisciplines } = require("../models/Discipline");

class Party {
  args = null
  user = null
  discordMessage = null
  discipline = null
  modes = ['create', 'join', 'leave']

  description() {
    return `Создать, войти или ливнуть с группы для КВшек
    !party create --name=partyName --discipline=dota
    !party join --name=partyName
    !party leave --name=partyName`;
  }

  async run(user, discordMessage, commandsName, params) {
    this.args = minimist(params)
    this.discordMessage = discordMessage
    this.user = user
    
    if (!(await this.validate())) {
      return;
    }

    const mode = this.args._[0]
    this.acronymizeParams()

    switch (mode) {
      case 'create':
        await this.createParty()
      case 'join':
        this.joinParty()
      case 'leave':
        this.leaveParty()
    }
  }

  async createParty() {
     const party =  await createPartyWithLeader(this.user.id, this.args.name)

     console.log(party.members)

     const rows = party.members.map(m => {
       return {name: m.member.name, value: '-'}
     })

     const table = createDefaultTable(rows, `Участники группы : ${party.name}`, `${this.discipline.name} - ${party.name}`)

     this.discordMessage.reply({
       content: `Группа создана\n Чтобы войти в эту группу впишите: !party join --${party.name}`,
       embeds: [
         table
       ]
     })
  }

  async joinParty() {

  }

  async validate() {
    if (!this.modes.includes(this.args._[0])) {
      this.discordMessage.reply(`Выберите валидное действие с группой, доступые:${this.modes.join(",")}`)
      return false;
    }

    const disciplines = await getAllDisciplines()
    if (!this.args.discipline) {
      this.discordMessage.reply(`Выберите дисциплину, доступые:${disciplines.map(d => d.name).join(",")}`)
      return false;  
    }

    if (!disciplines.map(d => d.name).includes(this.args.discipline)) {
      this.discordMessage.reply(`Не действитильная дисциплина, доступые:${disciplines.map(d => d.name).join(",")}`)
      return false;    
    }

    return true;
  }

  acronymizeParams() {
    if (this.args.n) {
      this.args.name = this.args.n
    }
    if (this.args.d) {
      this.args.discipline = this.args.d
    }
  }
}

module.exports = Party;