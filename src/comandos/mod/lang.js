const db = require('../../../db')

module.exports = {
    config: {
        nome: 'lang',
    },
    run: async(client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`administrador\``)
        let lang = await db.lgs.findOne({guildID: message.guild.id})
        let list = ['en']
        let lang2 = args.join(" ").toLowerCase()
        if(!lang2) return message.quote(`Linguas disponiveis: ${list.join(", ")}`)
        if(!list.includes(lang2)) return message.quote(`Linguas disponiveis: ${list.join(", ")}`)

        if(!lang) {
            await db.lgs.create({guildID: message.guild.id, lang: lang2})
            message.quote('Lingua configurado com sucesso! Caso queira que volte para o portugues e so dar o comando denovo!')
        } else {
            await db.lgs.findOneAndRemove({guildID: message.guild.id})
            message.quote('Lingua resetado com sucesso!')
        }
        
    }
}