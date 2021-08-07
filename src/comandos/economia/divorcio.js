const { MessageEmbed } = require('discord.js')
const db = require('../../../db')

module.exports = {
    config: {
        nome: 'divorcio',
        cooldown: 10
    },
    run: async(client, message, args) => {
        if(message.isCommand()) return message.reply('Esse comando não funciona com slash commands!')
        let noiva =  message.mentions?.users.first() || client.users.cache.find(x => args[0]?.includes(x.id))
        if(!noiva) return message.reply('Mencione o noivo')
        let casado1 = await db.coins.findOne({id: !message.author ? message.user.id:message.author.id})
        let casado2 = await db.coins.findOne({id: noiva.id})
        const lan = await db.lgs.findOne({guildID: !message.author ? message.user.id:message.author.id})
        if(!lan) {
        if(noiva.id === !message.author ? message.user.id:message.author.id) return message.reply('Você não consegue se divorciar com você mesmo!')
        if(!noiva) return message.reply('Mencione a noiva')
        if(!casado1.casado2) return message.reply('Você não é casado')
        if(casado1.casado2 !== casado2.casado1) return message.reply('Você não pode se divorciar! Apenas a noiva')

        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Diversão`, `${noiva} Divorciou do <@${casado2.casado2}>!`)
        await db.coins.findOneAndUpdate({ id: !message.author ? message.user.id:message.author.id }, { casado1: "Ninguem", casado2: "Ninguem"});
        await db.coins.findOneAndUpdate({ id: noiva.id}, { casado1: "Ninguem", casado2: "Ninguem"});
        message.reply({embeds: [embed]}) 
        } else {
            if(lan.lang === 'en') {
                if(noiva.id === !message.author ? message.user.id:message.author.id) return message.reply('You can\'t get divorced with yourself!')
                if(!noiva) return message.reply('Mention the bride')
                if(!casado1.casado2) return message.reply('You is not married')
                if(casado1.casado2 !== casado2.casado1) return message.reply('You can\'t get divorced! Just the bride')
        
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `${noiva} Divorced from <@${casado2.casado2}>!`)
                await db.coins.findOneAndUpdate({ id: !message.author ? message.user.id:message.author.id }, { casado1: "Ninguem", casado2: "Ninguem"});
                await db.coins.findOneAndUpdate({ id: noiva.id}, { casado1: "Ninguem", casado2: "Ninguem"});
                message.reply({embeds: [embed]}) 
            }
        }


    }
}