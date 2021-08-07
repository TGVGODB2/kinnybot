const db = require('../../../db.js')
const {MessageEmbed} = require('discord.js')
module.exports = {
    config: {
        nome: 'xp',
        cooldown: 10,
        options: [{
            name: 'user',
            type: 'STRING',
            description: 'User da pessoa',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        const lan = await db.lgs.findOne({guildID: !message.author ? message.user.id:message.author.id})
        let members = message.mentions?.users.first() || client.users.fetch(!args[0] ? message.options.getString('user').replace(/[<@!>]/g, ''):args[0])
       let xp = await db.xps.findOne({userID: members.id})
        if(xp) {
            const valorAtual = xp.xp - (xp.level-1) * 8000, valorTotal = xp.level * 8000;

            const percentagem = Math.floor((valorAtual/valorTotal) * 100)

            const response = '<:progressbar1:803734712731828264>'.repeat(parseInt(percentagem/10)) + '<:progressbar2:803734712643223563>'.repeat(parseInt(10 - percentagem/10))
            if(!lan) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Estatisticas`)
                .addField('Eu encontrei no meu banco de dados isso aqui', `✨ Nivel: ${xp.level} \n✨ XP: ${xp.xp} \n✨ Progresso: ${response}`)

            message.reply({embeds: [embed]})
            } else {
                if(lan.lang === 'en') {
                    const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Statics`)
                    .addField('I found this in my database', `✨ Level: ${xp.level} \n✨ XP: ${xp.xp} \n✨ Progress: ${response}`)
    
                message.reply({embeds: [embed]})
                }
            }
        }
    }
}