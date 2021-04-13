const { MessageEmbed } = require('discord.js')
const moment = require('moment')
module.exports = {
    config: {
        nome: 'ban',
        aliases: ['banir'],
        cooldown: 10
    },
    run: async (client, message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`Banir membros!\``)
       if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Banir membros\``)
        moment.locale('pt-br')
        let member = message.mentions.members.first()
        if (!member) {
            message.reply(`${client.user.username} - Erro \n Mencione um membro`)
        } else {
            if (member.id !== message.author.id) {
            let mot = args.slice(1).join(" ") || "Sem motivo"
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setThumbnail(message.author.displayAvatarURL({dynamic: true, format: 'png'}))
                .addField(`${client.user.username} - Você foi banido!`, 'Olá! Um adminstrador de um servidor me obrigou a te banir do servidor dele, eu não posso fazer nada. Mais posso te dar algumas informação \n \n')
                .addField('Grupo que você foi banido', `${message.guild.name}`)
                .addField('Autor do ban', `${message.author}`)
                .addField('Motivo', `${mot} \n \n`)
                .setFooter(`Seu punimento foi aplicado ${moment(message.createdAt).calendar()}`)
                if(member.roles.highest.rawPosition >= message.guild.me.roles.highest.rawPosition) {
                    message.reply(`${client.user.username} - Erro fatal \n Essa pessoa tem um cargo maior que o meu!`)
                } else {
                    member.send(embed)
                    member.ban({reason: mot})
                    message.reply(`${client.user.username} - Sucesso \n Essa pessoa foi banida com sucesso!`)

                }
        } else {
                message.reply(`${client.user.username} - Erro \n Você não pode banir a si mesmo!`)
            }
    }
}
}