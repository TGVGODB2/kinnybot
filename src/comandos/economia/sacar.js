const db = require("../../../db");
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'sac',
        aliases: ['sacar', 'saque'],
        cooldown: 10
    },
    run: async (client, message, args) => {
        let proc = await db.coins.findOne({id: message.author.id})
        if (!proc) return message.channel.send(`${client.user.username} - Diversão \n Você não tem dinheiro :(. Jogue no daily e ganhe um dinheirinho!`)
        let quantia = Number(args[0])
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        if(!lan) {
        if (!quantia) return message.channel.send(`${client.user.username} - Erro \n Digite 1 quantia.`)
        if (isNaN(quantia)) return message.channel.send(`${client.user.username} - Erro \n Não é um numero.`)
        if(quantia < 0) return message.channel.send(`${client.user.username} - Erro \n Você não pode depositar esse valor pois esse valor é uma divida!`)
        if (quantia <= proc.coinsb) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `😅 Você sacou uma quantia de ${quantia} koins`)
            let dimi = proc.coinsb - quantia
            let soma = proc.coinsc + quantia
            proc.coinsb = dimi
            proc.coinsc = soma
            proc.save()
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Você não tem no banco essa quantia!`)

            message.channel.send(embed)
           }
        } else {
            if(lan.lang === 'en') {
                if (!quantia) return message.channel.send(`${client.user.username} - Erro \n Enter 1 amount.`)
                if (isNaN(quantia)) return message.channel.send(`${client.user.username} - Erro \n It is not a number.`)
                if(quantia < 0) return message.channel.send(`${client.user.username} - Erro \n You cannot deposit this amount as that amount is a debt!`)
                if (quantia <= proc.coinsb) {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fun`, `😅 You have withdrawn an amount of ${quantia} koins`)
                    let dimi = proc.coinsb - quantia
                    let soma = proc.coinsc + quantia
                    proc.coinsb = dimi
                    proc.coinsc = soma
                    proc.save()
                    message.channel.send(embed)
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fun`, `You don't have that amount in the bank!`)
        
                    message.channel.send(embed)
                   }
            }
        }
    }
}