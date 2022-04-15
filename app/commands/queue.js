const minimist = require('minimist');
const { createDefaultTable } = require('../helpers/defaultTable');
const { createQueue, findQueueByName, connectUserToQueue } = require('../models/Queue');

class Queue {
  modes = ['start', 'join', 'end', 'list']

  description() {
    return 'Создать очередь на кв или еще какой нибудь ивент\n!queue start --n=dotaCW --a=10?\n!queue end --n=dotaCW\n!queue list --n=dotaCW\n!queue join --n=dotaCW';
  }

  async run(user, discordMessage, commandsName, params) {
    this.args = minimist(params)
    this.discordMessage = discordMessage
    this.user = user
    this.acronymizeParams()


    if (!(await this.validate())) {
      return;
    }

    const mode = this.args._[0]

    switch (mode) {
      case 'start':
        await this.startQueue()
        break
      case 'join':
        this.joinQueue()
        break
      case 'end':
        this.endQueue()
        break
      case 'list':
        this.getQueueList()
    }
  }

  async validate() {
    if (!this.modes.includes(this.args._[0])) {
      this.discordMessage.reply(`Выберите валидное действие с группой, доступые:${this.modes.join(",")}`)
      return false;
    }

    if (!this.args.name) {
      this.discordMessage.reply('Параметр --name/-n не указан!')
      return false;
    }

    const mode = this.args._[0]
    const queue = await findQueueByName(this.args.name)


    if (mode == 'start' && queue && queue.is_opened) {
      this.discordMessage.reply(`Очередь с названием ${queue.name} уже открыта!`)
      return false;
    }

    if (mode == 'join' && !queue) {
      this.discordMessage.reply('Такой очереди не существует')
    }

    if (mode == 'join' && queue) {
      const userIds = queue.members.map(m => m.member.id)
      if (userIds.includes(this.user.id)) {
      this.discordMessage.reply(`Чел ты уже встал в очередь ${queue.name}`)
      return false;
      }
    }

    return true;
  }

  acronymizeParams() {
    if (this.args.n) {
      this.args.name = this.args.n
    }
    if (this.args.a) {
      this.args.amount = this.args.a
    }
  }

  async startQueue() {
    const queue = await createQueue(this.user.id, this.args.name, this.args.amount ?? 0);

    this.discordMessage.reply(`@everyone очередь на **${queue.name}** открыта!\nЧтобы присоедениться впишите:**!queue join --n=${queue.name}**\nПосмотреть список:**!queue list --n=${queue.name}**`)
  }

  async joinQueue() {
    const queue = await connectUserToQueue(this.args.name, this.user.id)

    console.log(queue)
  }

  async getQueueList() {
    const queue = await findQueueByName(this.args.name)

    const rows = queue.members.map((m,i) => {return {name: m.member.name, value : `${i+1}.`}})
    console.log(queue)
    const table = createDefaultTable(rows,`Лист очереди **${queue.name}**`,'списиок выведен по приоритету ко времени')
  
    this.discordMessage.reply({
      embeds: [
        table
      ]})
  }
}

module.exports = Queue;