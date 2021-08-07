const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const db = require('../../../db.js')
const lang = require('../../../langs.json')
module.exports = {
    config: {
        nome: 'mineservers',
        aliases: ['mcserver', 'mcservers'],
        cooldown: 10,
        options: [{
            name: 'ip',
            type: 'STRING',
            description: 'IP do servidor!',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        let ip = args?.join(' ') || message.options.getString('ip')
        if(!ip) return message.reply('Digite o ip!')
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        axios.get(`https://api.mcsrvstat.us/2/${ip}`).then(response => {
            console.log(response.data.mods.names.length)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Minecraft`, `${lan && lan.lang == 'en' ? `**IP:** ${response.data.ip}:${response.data.port}\n**Players** ${response.data.players.online}/${response.data.players.max} \n**Version:** ${response.data.version} \n**JAR**: ${response.data.software} \n**MOTD:** ${response.data.motd.clean.join('\n')}`:`**IP:** ${response.data.ip}:${response.data.port}\n**Jogadores** ${response.data.players.online}/${response.data.players.max} \n**Versão:** ${response.data.version} \n**JAR**: ${response.data.software} \n**MOTD:** ${response.data.motd.clean.join('\n')}`} \nMods: \`${!response.data.mods ? "Sem mods":`${response.data.mods.names.length > 60 ? `${response.data.mods.names.slice(0, 20).join(', ')} e outros ${response.data.mods.names.length - 20} mods`:response.data.mods.names.join(', ')}`}\``)
                .setImage(`http://status.mclive.eu/${ip}/${ip}/25565/banner.png`)
                message.reply({embeds: [embed]})
        }).catch(e => {
            console.log(e)
            message.reply(lan && lan.lang === 'en' ? 'The server is offline':'O servidor se encontra offline')
        })
    }
}