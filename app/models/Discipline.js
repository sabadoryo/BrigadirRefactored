const db = require('../components/database')

async function getDisciplineByName(name) {
  return db.discipline.findFirst({
    where: {
      name: name,
    },
    include: {
      clanwarProfiles: {
        include: {
          user: true
        },
        orderBy: {
          points: 'desc',
        },
      }
    },
  })
}

async function getAllDisciplines() {
  return db.discipline.findMany();
}

module.exports = {
  getDisciplineByName,
  getAllDisciplines
}