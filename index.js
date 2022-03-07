require('dotenv').config()
const App = require('./app/app')
const ready = require('./app/listeners/ready/ready')
const messageCreate = require('./app/listeners/messageCreate/messageCreate')
const messageReactionAdd = require('./app/listeners/messageReactionAdd/messageReactionAdd')

const app = new App(process.env.TOKEN)
const client = app.start()

client.on('ready', ready);

client.on('messageCreate', messageCreate)

// client.on('messageReactionAdd', messageReactionAdd)
