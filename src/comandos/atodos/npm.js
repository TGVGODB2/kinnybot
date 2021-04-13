const searchNpmRegistry = require('search-npm-registry');
const { MessageEmbed }=  require('discord.js')
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'npm'
    },
    run: async(client, message, args) => {
    (async () => {
        let pesquisa = args.join(' ')
        if(!pesquisa) return message.reply('Bola de cristal: undefined')
        let lan = await db.lgs.findOne({guildID: message.guild.id})
        const results = await searchNpmRegistry()
            .text(`${pesquisa}`)
            .size(5)
            .search();
            if(!lan) {
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Infos`)
            .addField('Nome', `${results[0].name}`)
            .addField('Versão', `${results[0].version}`)
            .addField('Descrição', `${results[0].description}`)
            .addField('Link', `${results[0].links.npm}`)

        message.quote(embed)
            } else {
                if(lan.lang === 'en') {
                    const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Infos`)
                    .addField('Name', `${results[0].name}`)
                    .addField('Version', `${results[0].version}`)
                    .addField('Description', `${results[0].description}`)
                    .addField('Link', `${results[0].links.npm}`)
        
                message.quote(embed)
                }
            }
    })().catch(error => {
        message.quote('Não foi possivel achar essa package!')
    })
    }
}