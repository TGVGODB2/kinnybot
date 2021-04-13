const db = require("../../../db");
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'dep',
        aliases: ['depositar', 'deposito'],
        cooldown: 10
    },
    run: async (client, message, args) => {
        let proc = await db.coins.findOne({id: message.author.id})
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        if(!lan) {
        if (!proc) return message.channel.send(`${client.user.username} - Diversão \n Você não tem dinheiro :(. Jogue no daily e ganhe um dinheirinho!`)
        let quantia = Number(args[0])
        if (!quantia) return message.channel.send(`${client.user.username} - Erro \n Digite 1 quantia.`)
        if (isNaN(quantia)) return message.channel.send(`${client.user.username} - Erro \n Não é um numero.`)
        if (quantia <= proc.coinsc) {
            if(proc.coinsc < 0) return message.channel.send(`${client.user.username} - Erro \n Você não pode depositar esse valor pois esse valor é uma divida!`)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `😅 Você depositou uma quantia de ${quantia}`)
            let soma = Number(proc.coinsb) + quantia
            let dimi = Number(proc.coinsc) - quantia
            proc.coinsc = dimi
            proc.coinsb = soma
            proc.save()
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Você não tem na carteira essa quantia!`)

            message.channel.send(embed)
        }
    } else {
        if(lan.lang === 'en') {
            if (!proc) return message.channel.send(`${client.user.username} - Fun \nYou have no money :(. Play daily and earn a buck!`)
            let quantia = Number(args[0])
            if (!quantia) return message.channel.send(`${client.user.username} - Error \nEnter 1 amount.`)
            if (isNaN(quantia)) return message.channel.send(`${client.user.username} - Error \n It is not a number.`)
            if (quantia <= proc.coinsc) {
                if(proc.coinsc < 0) return message.channel.send(`${client.user.username} - Error \n You cannot deposit this amount as that amount is a debt!`)
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `😅 You deposited an amount of ${quantia}`)
                let soma = Number(proc.coinsb) + quantia
                let dimi = Number(proc.coinsc) - quantia
                proc.coinsc = dimi
                proc.coinsb = soma
                proc.save()
                message.channel.send(embed)
            } else {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `You don't have that amount in your wallet!`)
    
                message.channel.send(embed)
            }
        }
    }
}
}