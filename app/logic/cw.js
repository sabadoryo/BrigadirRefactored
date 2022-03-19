const RANKED = 'ranked'
const teamATemplateName = 'teamA'
const teamBTemplateName = 'teamB'
const CW_CATEGORY_ID = '634799085991231521'
const MAIN_VOICE_ID = '851862381352058940'

function startMvpPollCollector(mvpPollMessage, clanwar) {
  return new Promise((resolve, reject) => {
    const filter = (interaction) => {
      interaction.deferUpdate();
      console.log(interaction)
      return interaction.isSelectMenu() && interaction.customId == clanwar.id;
    }
    const collector = mvpPollMessage.createMessageComponentCollector({
      filter,
      time: 5000
    })
  
    collector.on('end', async collected => {
      let answerList = {}
  
      for (const [id, answer] of collected) {
        if (!answerList[answer.values[0]]) {
          answerList[answer.values[0]] = 1;
        } else {
          answerList[answer.values[0]]++;
        }
      }
  
      let max = 0;
      let pogId = null;
      for (const i in answerList) {
        if (answerList[i] > max) {
          max = answerList[i]
          pogId = i
        }
      }
      resolve(pogId)
    })
  })
}

module.exports = {
  RANKED,
  teamATemplateName,
  teamBTemplateName,
  CW_CATEGORY_ID,
  MAIN_VOICE_ID,
  startMvpPollCollector
}