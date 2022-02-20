require('dotenv').config()
const App = require('./app/app')
const ready = require('./app/listeners/ready/ready')
const messageCreate = require('./app/listeners/messageCreate/messageCreate')
// const {PrismaClient} = require('@prisma/client')
// const prisma = new PrismaClient()
const app = new App(process.env.TOKEN)

const client = app.start()

client.on('ready', ready);

client.on('messageCreate', messageCreate)
