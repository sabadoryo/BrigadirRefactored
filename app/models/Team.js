const db = require('../components/database')

async function createTeam(teamName, teamIds) {
  return await db.team.create({ 
    data: { 
      name: teamName, 
      members: {
        create : teamIds
      }
    },
    include: {
      members: {
        include: {
          member: true
        }
      }
    }
  })
}

module.exports = {
  createTeam
}