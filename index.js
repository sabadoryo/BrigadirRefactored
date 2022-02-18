require('dotenv').config()
const App = require('./src/app')
const ready = require('./src/listeners/ready')
const messageCreate = require('./src/listeners/messageCreate')
// const {PrismaClient} = require('@prisma/client')
// const prisma = new PrismaClient()
const app = new App(process.env.TOKEN)

const client = app.start()

client.on('ready', ready);

client.on('messageCreate', messageCreate)
