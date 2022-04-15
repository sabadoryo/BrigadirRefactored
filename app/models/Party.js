const db = require('../components/database')

async function createPartyWithLeader(leader_id, name) {
  return db.party.create({
    data: {
      name,
      leader_id,
      members: {
        create: [{member_id: leader_id}]
      }
    },
    include: {
      members: {
        include : {
          member: true
        }
      }
    }
  })
}

module.exports = {
  createPartyWithLeader
}