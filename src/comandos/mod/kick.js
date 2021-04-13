const { MessageEmbed } = require('discord.js')
const moment = require('moment')
module.exports = {
    config: {
        nome: 'kick',
        aliases: ['kickar'],
        cooldown: 10
    },
    run: async (client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`Expulsar membros!\``)
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Expulsar membros\``)
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
                    .addField(`${client.user.username} - Você foi kickado!`, 'Olá! Um adminstrador de um servidor me obrigou a te kickar do servidor dele, eu não posso fazer nada. Mais posso te dar algumas informação \n \n')
                    .addField('Grupo que você foi kick', `${message.guild.name}`)
                    .addField('Autor do kick', `${message.author}`)
                    .addField('Motivo', `${mot} \n \n`)
                    .setFooter(`Seu kick foi aplicado ${moment(message.createdAt).calendar()}`)
                if(member.roles.highest.rawPosition >= message.guild.me.roles.highest.rawPosition) {
                    message.reply(`${client.user.username} - Erro fatal \n Essa pessoa tem um cargo maior que o meu!`)
                } else {
                    member.send(embed)
                    member.kick({reason: mot})
                    message.reply(`${client.user.username} - Sucesso \n Essa pessoa foi kickado com sucesso!`)

                    member.send(embed)
                }
            } else {
                message.reply(`${client.user.username} - Erro \n Você não pode kickar a si mesmo!`)
            }
            }
        }
}