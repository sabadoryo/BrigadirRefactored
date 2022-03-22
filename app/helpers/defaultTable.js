const { MessageEmbed } = require('discord.js');

function createDefaultTable(rows = [], title, description = 'GL HF!', color = '#0099ff') {
  const table = new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description);

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