const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'emoji',
        cooldown: 10,
    },
    run: async(client, message, args) => {
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        if(!lan) {
        if(!args[0]) return message.reply('Você não colocou o emoji!')
        let emoji = client.emojis.cache.find(x => `${args[0]}`.includes(x.id))
        if(!emoji) return message.reply('Não foi possivel achar esse emoji!')
        let tipo = emoji.animated
        if(tipo) {
          moment.locale('pt-br')
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Info`)
                .addField('Emoji', `**Nome:** ${emoji} \n**ID:** ${emoji.id} \n**Animado:** Sim\n**Menção:** \ :${emoji.name}:`)

             return message.channel.send(embed)
        } else {
moment.locale('pt-br')
            const embed = new MessageEmbed()
                .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1`)
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Info`)
                .addField('Emoji', `**Nome:** ${emoji.name} \n**ID:** ${emoji.id} \n**Animado:** Não\n**Menção:** \\${emoji} \n**Data criada:** ${moment(emoji.createdAt).format('LLL')}`)

            return message.quote(embed)
           }
        } else {
            if(lan.lang === 'en') {
                if(tipo) {
                    moment.locale('en')
                      const embed = new MessageEmbed()
                          .setColor('#9900f8')
                          .setTitle(`${client.user.username} - Info`)
                          .addField('Emoji', `**Name:** ${emoji} \n**ID:** ${emoji.id} \n**Animated:** Yes\n**Mention:** \ :${emoji.name}:`)
          
                       return message.channel.send(embed)
                  } else {
          moment.locale('en')
                      const embed = new MessageEmbed()
                          .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1`)
                          .setColor('#9900f8')
                          .setTitle(`${client.user.username} - Info`)
                          .addField('Emoji', `**Name:** ${emoji} \n**ID:** ${emoji.id} \n**Animated:** No\n**Mention:** \ :${emoji.name}:`)
          
                      return message.quote(embed)
                     }
                    }
                }
    }
}