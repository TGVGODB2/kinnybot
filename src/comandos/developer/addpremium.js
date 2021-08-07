const db = require("../../../db");
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'addpremium',
        cooldown: 3
    },
    run: async(client, message, args) => {
        let gp = message.mentions.users.first()
if(!message.author ? message.user.id:message.author.id !== '425775842371829760') {
    message.reply('Apenas meu desenvolvedor pode executar esse comando!')
} else {
    let procm =  await db.premi.findOne({groupid: gp.id})
    let options = args.join(' ')
    if(!options) return message.reply('Mensal ou permanente?')
      if(!procm) {
            await db.premi.create({
                groupid: gp.id,
            })
        message.reply('Pronto! Esse membro agora é premium')
  
} else {
     message.reply('Esse membro já e premium!')   
    }
}
    }
}