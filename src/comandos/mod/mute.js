const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'mute',
        aliases: ['mutar'],
        cooldown: 10
    },
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`Mutar membros!\``)
if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar Cargos\``)
        moment.locale('pt-br')
        let member = message.mentions.members.first()
        if (!member) {
            message.reply(`${client.user.username} - Erro \n Mencione um membro`)
        }
                let mot = args.slice(1).join(" ") || "Sem motivo"

                let grupo = message.guild.roles.cache.find(x => x.name === 'kinnymute')
        if (!grupo) {
            try {
                grupo = await message.guild.roles.create({
                    data: {
                        name: "kinnymute",
                        color: "#ff0000",
                        permissions:['SEND_MESSAGES', 'ADD_REACTIONS']
                    },
                    reason: 'Cargo necessário para silenciar usuários.'

                })
            } catch(e){
                console.log(e.stack);
                message.reply(`${client.user.username} - Erro Interno \n Ocorreu um erro que apenas o <@395995293436477442> Saiba do erro! `)
            }
        }
        let memberm = await db.muteds.findOne({guildId: message.guild.id})
        if(memberm) {
         if(memberm.memberid === message.author.id) return message.reply(`${client.user.username} - Erro \n Essa pessoa já esta mute!`)
         return;
        }
            member.roles.add(grupo)
        message.reply(`${client.user.username} - Sucesso \n Essa pessoa foi mute com sucesso!`)
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setThumbnail(message.author.displayAvatarURL({dynamic: true, format: 'png'}))
            .addField(`${client.user.username} - Você foi Mutado!`, 'Olá! Um adminstrador de um servidor me obrigou a te mutar no servidor dele, eu não posso fazer nada. Mais posso te dar algumas informação \n \n')
            .addField('Grupo que você foi mutado', `${message.guild.name}`)
            .addField('Autor do mute', `${message.author}`)
            .addField('Motivo', `${mot} \n \n`)
            .setFooter(`Seu punimento foi aplicado ${moment(message.createdAt).calendar()}`)
        member.send(embed)
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(grupo, {
    SEND_MESSAGES: false
})
                });
       await db.muteds.create({
            guildId: message.guild.id,
            memberid: member.id,
            roleid: grupo.id
        })
        }
}