const { MessageEmbed } = require('discord.js');

async function createTable(headers, rows = []) {
  const {Table}  = await import('embed-table');

  const table = new Table({
    titles: ['Level', 'Money', 'Wins'],
    titleIndexes: [0, 20, 28],
    columnIndexes: [0, 18, 26],
    start: '`',
    end: '`',
    padEnd: 3
  })

  for (const row of rows) {
    table.addRow(row)
  }

  return new MessageEmbed().addFields(table.field())
}

module.exports = {
  createTable
}