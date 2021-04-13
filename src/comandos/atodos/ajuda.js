const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'ajuda',
        cooldown: 10,
        aliases: ['help']
    },
    run: async(client, message) => {
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        const comandos = fs.readdirSync('./src/comandos/atodos').filter(file => file.endsWith('.js'))
        const array = []
        for(let file of comandos) {
            array.push(file.split('.')[0])
        }
        let mod = `${client.commands.filter(cmd => cmd.config.categoria == 'mod').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let eco = `${client.commands.filter(cmd => cmd.config.categoria == 'economia').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let geral = `${client.commands.filter(cmd => cmd.config.categoria == 'atodos').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let jogo = `${client.commands.filter(cmd => cmd.config.categoria == 'jogos').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let musica = `${client.commands.filter(cmd => cmd.config.categoria == 'musica').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let rep = `${client.commands.filter(cmd => cmd.config.categoria == 'reputacao').map(cmd => cmd.config.nome).join(' | ')} \n \n`
    if(!lan) {
        const embed = new MessageEmbed()
    .setColor('#9900f8')
    .setTitle(`${client.user.username} - Comandos`)
    .addField('<:banido:801198221454999582> Moderação', `\`${mod}\``)
    .addField('<:compra:801206555495891008> Economia', `\`${eco}\``)
    .addField('<:terra:801206555755675728> Gerais', `\`${geral}\``)
    .addField('<:morto:801544422462324758> Jogos', `\`${jogo}\``)
    .addField('🎵 Musica', `\`${musica}\``)
    .addField('<:reputation:817746775981031454> Reputação', `\`${rep}\``)
       return message.quote(embed)
    } else {
        if(lan.lang === 'en') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Comandos`)
            .addField('<:banido:801198221454999582> Moderation', `\`${mod}\``)
            .addField('<:compra:801206555495891008> Economy', `\`${eco}\``)
            .addField('<:terra:801206555755675728> General', `\`${geral}\``)
            .addField('<:morto:801544422462324758> Games', `\`${jogo}\``)
            .addField('🎵 Music', `\`${musica}\``)
            .addField('<:reputation:817746775981031454> Reputation', `\`${rep}\``)


            message.quote(embed)
        }
    }

    }
}