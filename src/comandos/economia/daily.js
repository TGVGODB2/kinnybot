const db = require('../../../db.js')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms');
module.exports = {
    config: {
        nome: 'daily',
        cooldown: 10
    },
    run: async(client, message) => {
        const grana = Math.floor(Math.random() * 500);
        let achar = await db.coins.findOne({id: message.author.id})
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        const timeout = 8.64e+7
        if(!lan) {
        if (!achar) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Você jogou no daily e ganhou ${grana} Koins!`)
            await db.coins.create({
                id: message.author.id,
                coinsc: grana,
                coinsb: 0,
                dailyCooldown: Date.now()
            })
            message.channel.send(embed)
        } else {
            if (achar.dailyCooldown + timeout > Date.now()) {
                let infh = parseMilliseconds(timeout - (Date.now() - achar.dailyCooldown));
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Diversão`, `Você ja usou o daily! Tente novamente daqui **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
                message.channel.send(embed)
            } else {
                await db.coins.updateOne({id: message.author.id}, {dailyCooldown: Date.now()})
                let soma = Number(achar.coinsc + grana)
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Diversão`, `🎉 Você jogou no daily e ganhou ${grana} Koins e agora você tem ${soma} de Koins!`)
                achar.coinsc = soma
                achar.save()
                message.channel.send(embed)
            }
        }
    } else {
        if(lan.lang === 'en') {
            if (!achar) {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `You played daily and won ${grana} Koins!`)
                await db.coins.create({
                    id: message.author.id,
                    coinsc: grana,
                    coinsb: 0,
                    dailyCooldown: Date.now()
                })
                message.channel.send(embed)
            } else {
                if (achar.dailyCooldown + timeout > Date.now()) {
                    let infh = parseMilliseconds(timeout - (Date.now() - achar.dailyCooldown));
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fun`, `You already used daily! Try again from here **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
                    message.channel.send(embed)
                } else {
                    await db.coins.updateOne({id: message.author.id}, {dailyCooldown: Date.now()})
                    let soma = Number(achar.coinsc + grana)
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fun`, `🎉 You played daily and won ${grana} Koins and now you have ${soma} koins!`)
                    achar.coinsc = soma
                    achar.save()
                    message.channel.send(embed)
                }
            }
        }
    }
}

}