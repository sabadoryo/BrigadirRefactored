const { MessageEmbed } = require('discord.js');

function createDefaultTable(rows = [], title) {
  const table = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(title)
    .setDescription('GL HF!');

  for (const row of rows) {
    if (row.name && row.value) {
      table.addField(row.name.toString(), row.value.toString())
    }
  }
    return table;
}

module.exports = {
  createDefaultTable
}