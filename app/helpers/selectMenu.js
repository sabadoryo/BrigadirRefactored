const { MessageActionRow,MessageSelectMenu  } = require('discord.js');

function selectMenu(customId, placeholder, options) {
  console.log(options)

  for (const opt of options) {
    const keys = Object.keys(opt)
    for (const key of keys) {
      opt[key] = opt[key].toString();
    }
  }

  return new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId(customId.toString())
					.setPlaceholder(placeholder)
					.addOptions(options),
			);
}

module.exports = {
  selectMenu
}