const db = require('../../../db.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: "topmoney",
        cooldown: 10
    },
    run: async(client, message) => {
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        const users = (await db.coins.find()).sort((a, b) => (b.coinsc + b.coinsb) - (a.coinsc + a.coinsb)).filter(value => (value.coinsc + value.coinsb) > 0)
        if(!lan) {
        const top = users.map((value, index) => `🎉 ${index + 1}° \`${client.users.cache.get(`${value.id}`)?.username || "Sem nick"}\` tem uma quantia de ${value.coinsc + value.coinsb} Koins`)
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Estatisticas`)
            .addField('Tops Koins', `${top.slice(0, 10).join('\n')}`)
        message.channel.send(embed)
        } else {
            if(lan.lang === 'en') {
                const top = users.map((value, index) => `🎉 ${index + 1}° \`${client.users.cache.get(`${value.id}`)?.username || "Without Nick"}\`have an amount of ${value.coinsc + value.coinsb} Koins`)
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Statistics`)
                    .addField('Koins tops', `${top.slice(0, 10).join('\n')}`)
                message.channel.send(embed)
            }
        }
    }
}