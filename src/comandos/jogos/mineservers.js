const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'mineservers',
        cooldown: 10
    },
    run: async(client, message, args) => {
        let ip = args.join(' ')
        if(!ip) return message.reply('Digite o ip!')
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        if(!lan) {
        axios.get(`https://api.mcsrvstat.us/2/${ip}`).then(async response => {
            if(response.data.ip === '147.135.86.107' || response.data.ip === "54.39.234.40") {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Minecraft`, `**IP:** ${response.data.ip}:${response.data.port}\n**Jogadores** ${response.data.players.online}/${response.data.players.max} \n**Versão:** ${response.data.version} \n**JAR**: ${response.data.software} \n**MOTD:** ${response.data.motd.clean[0]}`)
                .setImage(`http://status.mclive.eu/${ip}/${ip}/25565/banner.png`)
            .setFooter('Cliente da Witch Host: Sim')

          return  message.channel.send(embed)
            }
            const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Minecraft`, `**IP:** ${response.data.ip}:${response.data.port}\n**Jogadores** ${response.data.players.online}/${response.data.players.max} \n**Versão:** ${response.data.version} \n**JAR**: ${response.data.software} \n**MOTD:** ${response.data.motd.clean[0]}`)
            .setImage(`http://status.mclive.eu/${ip}/${ip}/25565/banner.png`)
        .setFooter('Cliente da Witch Host: Não')

      return  message.channel.send(embed)
        }).catch(error => { 
        message.quote('O servidor se encontra offline!')
        })
    } else {
        if(lan.lang === 'en') {
            axios.get(`https://api.mcsrvstat.us/2/${ip}`).then(response => {
                if(response.data.ip === '147.135.86.107') {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Minecraft`, `**IP:** ${response.data.ip}:${response.data.port}\n**Players** ${response.data.players.online}/${response.data.players.max} \n**Version:** ${response.data.version} \n**Software**: ${response.data.software} \n**MOTD:** ${response.data.motd.clean[0]}`)
                    .setImage(`http://status.mclive.eu/${ip}/${ip}/25565/banner.png`)
                .setFooter('Witch Host Client: Yes')
    
              return  message.channel.send(embed)
                }
                const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Minecraft`, `**IP:** ${response.data.ip}:${response.data.port}\n**Players** ${response.data.players.online}/${response.data.players.max} \n**Version:** ${response.data.version} \n**Software**: ${response.data.software} \n**MOTD:** ${response.data.motd.clean[0]}`)
                .setImage(`http://status.mclive.eu/${ip}/${ip}/25565/banner.png`)
            .setFooter('Witch Host Client: No')
    
          return  message.channel.send(embed)
            }).catch(error => { 
            message.quote('The server is offline!')
            })
        }
    }
    }
}