const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms')
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'fortestatisticas',
        cooldown: 10,
        options: [{
            name: 'nick',
            type: 'STRING',
            description: 'Nick do jogador!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        let nick = args?.join(' ') || message.options.getString('nick')
        if (!nick) return message.reply('Digite o nick do jogador!')
        axios.get(`https://fortnite-api.com/v1/stats/br/v2?name=${nick}&image=all`).then(async response => {

            let estatis = response.data.data.stats.all.overall
            const lan = await db.lgs.findOne({ guildID: message.guild.id })
            let jogadas = parseMilliseconds(estatis.minutesPlayed);
            if (!lan) {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fortnite`, `**Pontuação:** ${estatis.score} \n **Vitorias:** ${estatis.wins} \n **Mortes:** ${estatis.deaths} \n **Tempo jogado:** ${jogadas.days}D ${jogadas.hours}H ${jogadas.minutes}M ${jogadas.seconds}S`)
                    .setImage(response.data.data.image)
                message.reply({ embeds: [embed] })
            } else {
                if (lan.lang === 'en') {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fortnite`, `**Score:** ${estatis.score} \n **Wins:** ${estatis.wins} \n **Deaths:** ${estatis.deaths} \n **Minutes Playeds:** ${jogadas.days}D ${jogadas.hours}H ${jogadas.minutes}M ${jogadas.seconds}S`)
                        .setImage(response.data.data.image)
                    message.reply({ embeds: [embed] })
                }
            }
        }).catch(error => {
            message.reply('Não foi possivel achar!')
        })

    }
}