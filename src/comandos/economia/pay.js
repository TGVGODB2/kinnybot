const { MessageEmbed } = require('discord.js')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'pay',
        cooldown: 10
    },
    run: async(client, message, args) => {
        if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar Emojis\``)
        const mencao = message.mentions.members.first()
        if(!mencao) return message.reply(`${client.user.username} - Erro \n Mencione uma pessoa`)
                  if(!message.guild.me.hasPermission('ADD_REACTIONS') || !message.channel.permissionsFor(client.user.id).has("ADD_REACTIONS")) return message.quote('Eu não tenho permissão \`Adicionar reações!\`')
        if(mencao.id === message.author.id) return message.reply(`${client.user.username} - Erro \n Você não pode pagar a si mesmo!`)
        const autor1 = await db.coins.findOne({id: mencao.id})
        const autor2 = await db.coins.findOne({id: message.author.id})
        if(!autor1 || !autor2) return message.reply('Umas das pessoas não tem conta!')
        const quantia = Number(args[0])
        if (!quantia) return message.channel.send(`${client.user.username} - Erro \nDigite 1 quantia.`)
        if (isNaN(quantia)) return message.channel.send(`${client.user.username} - Erro \nNão é um numero.`)
        if (autor2.coinsc <= 0) return message.channel.send(`${client.user.username} - Erro \nVocê não tem dinheiro!.`)
        if (quantia > autor2.coinsc) return message.channel.send(`${client.user.username} - Erro \nVocê não tem essa quantia!.`)
        let somar = Number(autor1.coinsc) + quantia
        let diminuir =  Number(autor2.coinsc) - quantia
            if(autor2) {
        if(autor1) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Deseja quer dar ${quantia} para <@${autor1.id}>`)
            message.channel.send(embed).then(reag => {
                reag.react('✅')
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '✅' && user.id === message.author.id;
                };

                const collector = reag.createReactionCollector(filter, {time: 15000});

                collector.on('collect', async (reaction, user) => {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Diversão`, `Você deu ${quantia} para <@${autor1.id}>`)
                      autor1.coinsc = somar
                      autor2.coinsc = diminuir
                     autor1.save()
                     autor2.save()
                    message.channel.send(embed)
                })
            })
        } else {
            message.reply('Ele não tem 1 conta')
        }
    } else {
            message.reply('Você não tem 1 conta')
        }
    }
}