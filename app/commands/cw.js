const db  =  require('../components/database')
const minimist = require('minimist');
const { upsertUser, getUsersWithinRangeWhereDiscipline } = require('../models/User')
const { upsertUserClanWarProfile, updateUserClanwarProfilePoints } = require ('../models/UserClanwarProfile')
const { RANKED, teamATemplateName, teamBTemplateName, CW_CATEGORY_ID, MAIN_VOICE_ID, startMvpPollCollector } = require('../logic/cw')
const { createDefaultTable} = require ('../helpers/defaultTable')
const { getClanwarByName, createClanwar, finishClanwar, clanwarSetPog } = require('../models/ClanWar');
const { createTeam } = require('../models/Team');
const { getDisciplineByName } = require('../models/Discipline');
const { selectMenu } = require('../helpers/selectMenu');

class ClanWars {
  algorithms = ["ranked", "preset", "random"];
  algorithm = null;
  teamA = null;
  teamB = null;
  message = null;
  players = [];
  discipline = null;
  clanwar = null;
  voiceA = null;
  voiceB = null;
  teamAMeta = null;
  teamBMeta = null;
  clanwarEndMessage = null;
  winnerTeam = null;

  description() {
    return `Начать рейтинговый clan wars.
    Флаги:
    --discipline
    --name
    Очень много валидации, поэтому пробуйте прописывать флаги если будет ошибка то вам ее покажут`;
  }

  async run(user, message, commandsName, params) {
    this.message = message;
    this.args = minimist(params)
    this.voiceChannel = message.member.voice.channel;
    const mode = this.args._.includes('cancel') ? 'cancel' : this.args._.includes('end') ? 'end' : 'start'

    const validator = await this.validate(mode) 
    if (validator.errorFound) {
      this.message.reply(validator.errorMessage)
      return;
    }

    switch (mode) {
      case 'start':
        this.algorithm = this.algorithms.includes(this.args.algorithm) ? this.args.algorithm : RANKED;
        this.discipline = await getDisciplineByName(this.args.discipline)
        this.startClanwar();
        break;
      case 'end':
        this.endClanwar();
        break;
      case 'cancel':
        this.cancelClanwar();
        break;
    }
  }

  async startClanwar() {
    await this.setPlayers()
    await this.makeTeams()
    await this.createVoiceChannels()
    await this.distributePlayersToVoiceChannels()
    await this.createClanwar()
    this.anounceClanwar()
  }

  async makeTeams() {
    this.balanceTeams()
    await this.createTeams()
  }

  async setPlayers() {
    const usersId = []

    for (const [id, discordInfo] of this.voiceChannel.members) {
      const user = await upsertUser(discordInfo.user)
      await upsertUserClanWarProfile(user.id, this.discipline.id)
      usersId.push(user.id)
    }

    this.players = await getUsersWithinRangeWhereDiscipline(usersId, this.discipline)
  }

  balanceTeams() {
    switch (this.algorithm) {
      case RANKED:
        this.players.sort((a,b) => {
          if ( a.clanwarProfiles[0].points < b.clanwarProfiles[0].points ){
            return -1;
          }
          if ( a.clanwarProfiles[0].points > b.clanwarProfiles[0].points ){
            return 1;
          }
          return 0;
        })    
        this.teamA = this.players.filter((v, i) => i % 2);
        this.teamB = this.players.filter((v ,i) => !(i % 2));
    }
  }

  async createTeams() {
    const teamAIds = this.teamA.map(value => { return { member_id: value.id } })
    const teamBIds = this.teamB.map(value => { return { member_id: value.id } })

    this.teamAMeta = this.teamA;
    this.teamBMeta = this.teamB;

    this.teamA = await createTeam(teamATemplateName, teamAIds)
    this.teamB = await createTeam(teamBTemplateName, teamBIds)
  }

  async createClanwar() {
    this.clanwar = await createClanwar(this.args.name, this.teamA.id, this.teamB.id, this.discipline.id, this.voiceA.id, this.voiceB.id)
  }

  async createVoiceChannels() {
    const uniqueString = await import('unique-string');
    const cwCategory = await this.message.guild.channels.cache.find(c => c.id === CW_CATEGORY_ID);
   
    this.voiceA = await this.message.guild.channels.create(this.teamA.name, {
      type: "GUILD_VOICE",
      parent: cwCategory
    })

    this.voiceB = await this.message.guild.channels.create(this.teamB.name, {
      type: "GUILD_VOICE",
      parent: cwCategory
    })
  }

  async distributePlayersToVoiceChannels() {
    const teamAIds = this.teamA.members.map(member => member.member.discord_id)
    const teamBIds = this.teamB.members.map(member => member.member.discord_id)

    for (const [memberId, member] of this.voiceChannel.members) {
      if (teamAIds.includes(memberId)) {
        member.voice.setChannel(this.voiceA.id)
      }
      if (teamBIds.includes(memberId)) {
        member.voice.setChannel(this.voiceB.id)
      }
    }
  }

  async anounceClanwar() {
    let anouncement = `@everyone КВшка ${this.clanwar.name} по ${this.discipline.name} только что началась!\n`;

    const teamAMetaData = this.teamAMeta.map(m => { return { name: m.name, value : m.clanwarProfiles[0].points }})
    const teamBMetaData = this.teamBMeta.map(m => { return { name: m.name, value : m.clanwarProfiles[0].points }})
    
    const tableA = createDefaultTable(teamAMetaData, this.teamA.name);
    const tableB = createDefaultTable(teamBMetaData, this.teamB.name);

    this.message.reply({embeds : [tableA, tableB]})
  }

  async validate(validationMode) {
    let errorFound = true;
    let errorMessage = "";

    const disciplines = await db.discipline.findMany();
    const disciplineNames = disciplines.map(d => d.name)

    if (!this.args.discipline && validationMode === 'start') {
      errorMessage =  `Укажите дисциплину: **--discpline=?**\nСуществующие дисциплины: ${disciplineNames.join(",")}`;

      return { errorFound, errorMessage };
    }

    if (!disciplineNames.includes(this.args.discipline) && validationMode === 'start') {
      errorMessage =  `Несуществующая дисциплина: **${this.args.discipline}**\nСуществующие дисциплины: ${disciplineNames.join(",")}`;

      return { errorFound, errorMessage };
    }

    if (!this.args.name) {
      errorMessage =  `Укажите название: **--name=dota-cw**`;

      return { errorFound, errorMessage };
    }
    const isAlreadyOnGoingClanwar = await db.clanwar.findFirst({ where: { name: this.args.name, end_time : null } });
    
    if (isAlreadyOnGoingClanwar && validationMode === 'start') {
      errorMessage = `Квшка с названием ${this.args.name} уже идет и не закончена`;

      return { errorFound, errorMessage };
    }

    if (!isAlreadyOnGoingClanwar && validationMode === 'cancel') {
      errorMessage = `Кв с названием ${this.args.name} не существует`

      return { errorFound, errorMessage };
    }

    if (!this.voiceChannel && validationMode === 'start') {
      errorMessage = "Ты не находишься на голосовом канале";
      
      return { errorFound, errorMessage };
    }

    if (validationMode === 'end') {
      if (!this.args.winner) {
        errorMessage = "Укажите команду победителей: **--winner=teamA**"
        return { errorFound, errorMessage };
      }
      const clanwar = await getClanwarByName(this.args.name)
      console.log(clanwar)

      if (!clanwar) {
        errorMessage = `Такое кв **${this.args.name}** еще не начато`
        return { errorFound, errorMessage };
      }

      if (clanwar.teamA.name !== this.args.winner && clanwar.teamB.name !== this.args.winner) {
        errorMessage = `Указанная команда ${this.args.name} не учавствует в кв\nУчастники кв: ${clanwar.teamA.name}, ${clanwar.teamB.name}`
        return { errorFound, errorMessage };
      }
    }
    // if (validationMode === 'start' && this.voiceChannel.members.size !== 10) {
    //   errorMessage = 'На голосовом канале должно находиться ровно 10 работяг'
  
    //   return { errorFound, errorMessage };
    // }

    errorFound = false;
    errorMessage = null;


    return { errorFound, errorMessage };
  }
  
  async endClanwar() {
    this.clanwar = await getClanwarByName(this.args.name);
    await this.updatePoints();
    await this.closeClanwar();
    await this.transerEveryoneToMainVoice();
    await this.startPogPoll();
  }

  async updatePoints() {
    const winnerTeam = this.args.winner === this.clanwar.teamA.name ? this.clanwar.teamA : this.clanwar.teamB
    const loserTeam = this.args.winner === this.clanwar.teamA.name ? this.clanwar.teamB : this.clanwar.teamA

    for (const member of winnerTeam.members) {
      await updateUserClanwarProfilePoints(member.member_id, this.clanwar.discipline_id, 'inc', 25)
    }

    for (const member of loserTeam.members) {
      await updateUserClanwarProfilePoints(member.member_id, this.clanwar.discipline_id, 'dec', 25)
    }

    this.winnerTeam = winnerTeam
  }

  async transerEveryoneToMainVoice() {
    const tempVoiceA = this.message.guild.channels.cache.find(r => r.id === this.clanwar.voiceA_id);
    const tempVoiceB = this.message.guild.channels.cache.find(r => r.id === this.clanwar.voiceB_id);

    for (const [memberId, member] of tempVoiceA.members) {
      await member.voice.setChannel(MAIN_VOICE_ID)
    }

    for (const [memberId, member] of tempVoiceB.members) {
      await member.voice.setChannel(MAIN_VOICE_ID)
    }
    
    tempVoiceA.delete();
    tempVoiceB.delete();
  }

  async closeClanwar() {
    this.clanwar = await finishClanwar(this.clanwar, this.winnerTeam.id)
    const content = `@everyone\nCW **${this.clanwar.name}** - окончен!\nПобеда команды - ${this.clanwar.name}`
    const rowsEmbed = this.clanwar.winner.members.map(member => {
      return { name: member.member.name, value: member.member.clanwarProfiles[0].points }
    })

    const table = createDefaultTable(rowsEmbed, 'Обновленные ранги победителей')
    await this.message.reply({ content, embeds : [table] })
  }

  async startPogPoll() {
    const options = this.clanwar.winner.members.map( member => {
      return { label : member.member.name, value : member.member.id, description : member.member.clanwarProfiles[0].points}
    })
    const select = selectMenu(this.clanwar.id, 'Выберите MVP', options)

    const mvpPollMessage = await this.message.reply({
      components : [
        select
      ],
      content: "@everyone Выберите MVP, голосование длится 30 секунд"
    });

    const pogId = await startMvpPollCollector(mvpPollMessage, this.clanwar)

    const pog = await updateUserClanwarProfilePoints(parseInt(pogId), this.clanwar.discipline_id, 'inc', 15)

    await clanwarSetPog(this.clanwar.id, pog.id)

    mvpPollMessage.edit({
      content: `@everyone POG of **${this.clanwar.name}** is  <@${pog.user.discord_id}>:crown:`,
      components: []
    })
  }

  async cancelClanwar() {
    this.clanwar = await getClanwarByName(this.args.name)
    await finishClanwar(this.clanwar)
    await this.transerEveryoneToMainVoice()
    this.message.reply(`Кв ${this.clanwar.name} отменено`)
  }
}

module.exports = ClanWars;