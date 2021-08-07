const db = require('../../../db.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: "topmoney",
        cooldown: 10
    },
    run: async (client, message, args) => {
        const lan = await db.lgs.findOne({ guildID: message.guild.id })
        const users = (await db.coins.find()).sort((a, b) => (b.coinsc + b.coinsb) - (a.coinsc + a.coinsb)).filter(value => (value.coinsc + value.coinsb) > 0)
        if (!lan) {
            let top = users.map(async (value, index) => `🎉 ${index + 1}° \`${(await client.users.fetch(`${value.id}`))?.username || "Sem nick"}\` tem uma quantia de ${value.coinsc + value.coinsb} Koins`)
            for (usernames in users) {
                if(users.map(x => x.id).some(y => message.guild.members.cache.map(a => a.user.id).includes(y))) {
                    console.log(await client.users.fetch(usernames.id))
                }
                
            }
            top = await Promise.all(top)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Estatisticas`)
                .addField('Tops Koins', `${top.slice(0, 10).join('\n')}`)
            message.reply({embeds: [embed]})
        } else {
            if (lan.lang === 'en') {
                let top = users.map(async (value, index) => `🎉 ${index + 1}° \`${(await client.users.fetch(`${value.id}`))?.username || "Without Nick"}\`have an amount of ${value.coinsc + value.coinsb} Koins`)
                top = await Promise.all(top)
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Statistics`)
                    .addField('Koins tops', `${top.slice(0, 10).join('\n')}`)
                message.reply({embeds: [embed]})
            }
        }
    }
}