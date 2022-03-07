const { MessageActionRow, MessageButton } = require('discord.js');

const girlsIds = [
  '587652095210160149',
  '738433761691172944',
  '464758769965072384',
  '748278510807941150',
  '401046879015534592',
  '755174830424195153',
  '415525982141808641',
  '440226858630381579',
  '500027058244681728',
  '666322138059374626',
  '389822696617410560'
];

module.exports = async client => {
  console.log("Bot is online!")

  var guild = client.guilds.cache.get('634799085991231518');
 
  var channels = guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT');

  channels.map(async channel => {
    const message =  await channel.send(" Дорогие девушки сервера с Международным Женским Днем<3 \n Отрегируйте на это сообщение любым эмодзи для сюрприза");
    const filter = (reaction, user) => girlsIds.includes(user.id);
    const collector = message.createReactionCollector({ filter, time: 86400000 });
    collector.on('collect', (reaction,user) => {
      const march8Role = guild.roles.cache.find(r => r.id === '950485421459124224');
      const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
     
      memberWhoReacted.roles.add(march8Role);
      channel.send(`С праздником ${user.tag} <3, новая роль уже присвоена!`)
    });
    collector.on('end', collected => {
      channel.send('Event 8th March ended.')
    });
  })
}