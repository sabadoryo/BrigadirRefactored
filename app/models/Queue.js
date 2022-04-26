const db = require('../components/database')

async function createQueue(creator_id, name, amount, discipline_id) {
  return db.queue.create({
    data: {
      name,
      amount,
      discipline_id,
      host_id: creator_id,
      members: {
        create: [{member_id: creator_id}]
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

async function findQueueByName(name) {
  return db.queue.findFirst({
    where : {
      name
    },
    include: {
      members: {
        include : {
          member: true
        },
        orderBy: {
          joined_at: 'asc'
        }
      }
    }
  })
}

async function connectUserToQueue(name, user_id) {
  return db.queue.update({
    where: {
      name
    },
    data: {
      members: {
        create: {
          member : {
            connect: {id : user_id}
          }
        }
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
  createQueue,
  findQueueByName,
  connectUserToQueue
}