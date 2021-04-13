const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'roletarussa',
        cooldown: 10
    },
    run: async(client, message, args) => {
      let membro = message.mentions?.users.first() || client.users.cache.find(x => args[0]?.includes(x.id))
       if(!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADD_REACTIONS')) message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Adicionar reações / Gerenciar mensagems! \``)
                  if(!message.guild.me.hasPermission('ADD_REACTIONS') || !message.channel.permissionsFor(client.user.id).has("ADD_REACTIONS")) return message.quote('Eu não tenho permissão \`Adicionar reações!\`')
        if(!membro) return message.reply(`${client.user.username} - Erro \nMencione um membro`)
        if(membro.id === message.author.id) return message.reply(`${client.user.username} - Erro \nVocê não pode jogar você mesmo!`)
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Diversão`, `Eae ${membro}! O ${message.author} chamou para uma roleta russa! Você aceita?`)
        message.quote(embed).then(reagi => {
            reagi.react('✅')
            reagi.react('❌')
            const filter = (reaction, user) => {
                return reaction.emoji.name === '✅' && user.id === membro.id;
            };

            const collector = reagi.createReactionCollector(filter);

            collector.on('collect', (reaction, user) => {
                reagi.reactions.removeAll()
                const embed2 = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Diversão`, `O ${message.author} está girando o tambor...`)
                reagi.edit(embed2).then(reac => {
                    setTimeout(() => {
                        const prov = [
                            "Ele aceitou o desafio, e ele não teve sorte e morreu :(",
                            "Ele aceitou o desafio, e ele teve bastante sorte e não morreu! :)"
                        ]
                        const random = prov[Math.floor(Math.random() * prov.length)];
                        const embed3 = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `${random}`)
                        reac.edit(embed3)
                    }, 4000)
                })
            });
            const filter2 = (reaction, user) => {
                return reaction.emoji.name === '❌' && user.id === membro.id;
            };

            const collector2 = reagi.createReactionCollector(filter2, {time: 15000});

            collector2.on('collect', (reaction, user) => {
                reagi.delete()
                message.channel.send(`${client.user.username} - Diversão \n Vish, o cara arregou (Muito cagão)`)
            })
        })
    }
}