const db = require("../../../db");
module.exports = {
    config: {
        nome: 'setcanaldebemvindo',
        cooldown: 10
    },
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você não essa permissao \`Administrador\``)
        if(!message.guild.me.hasPermission('MANAGE_EMOJIS') || !message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar emojis\``)
   if(!message.guild.me.hasPermission('ADD_REACTIONS') || !message.channel.permissionsFor(client.user.id).has("ADD_REACTIONS")) return message.quote('Eu não tenho permissão \`Adicionar reações!\`')
        let achar = await db.idgr.findOne({groupwelcome: message.guild.id})
        let canal = message.mentions.channels.first()
        if (!canal) return message.reply(`${client.user.username} - Erro \n Mencione um canal`)
        if (achar) {
            message.quote('Você quer\nRemover o canal: <:seguranca:801198221379764244> \nAtualizar o canal: <a:carregando2:800025559002251315>').then(reagir => {
                reagir.react('801198221379764244')
                reagir.react('800025559002251315')

                const filter = (reaction, user) => {
                    return reaction.emoji.id === '801198221379764244' && user.id === message.author.id;
                };
                
                const collector = reagir.createReactionCollector(filter);
                
                collector.on('collect', async (reaction, user) => {
                    await db.idgr.findOneAndRemove({groupwelcome: message.guild.id})
                    reagir.reactions.removeAll()
                    message.channel.send('Canal removido com sucesso!')
                });
                const filter2 = (reaction, user) => {
                    return reaction.emoji.id === '800025559002251315' && user.id === message.author.id;
                };
                
                const collector2 = reagir.createReactionCollector(filter2);
                
                collector2.on('collect', async (reaction, user) => {
                    await db.idgr.findOneAndUpdate({groupwelcome: message.guild.id}, {channelwelcome: canal.id})
                    reagir.reactions.removeAll()
                    message.channel.send('Canal atualizado com sucesso!')
                });
            })
        } else {
            message.channel.send('Quer continuar?').then(async confirmar => {
                confirmar.react('✅')
                confirmar.react('❌')
                const filter2 = (reaction, user) => {
                    return reaction.emoji.name === '❌' && user.id === message.author.id;
                };

                const collector2 = confirmar.createReactionCollector(filter2, { time: 15000 });

                collector2.on('collect', async(reaction, user) => {
                    client.reactions.removeAll()
                    message.channel.send('Cancelado!')
                })
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '✅' && user.id === message.author.id;
                };

                const collector = confirmar.createReactionCollector(filter, { time: 15000 });

                collector.on('collect', async(reaction, user) => {
                await db.idgr.create({
                    groupwelcome: message.guild.id,
                    channelwelcome: canal.id
                })
                message.channel.send('Canal setado com sucesso!')
                    var autorole = message.channel.createMessageCollector(a => a.author.id == message.author.id, {
                    time: 60000 * 5,
                    max: 1
                })
                message.channel.send('Digite id da role (Auto-role) Caso não queira role digite "Pular"')
                autorole.on('collect', async role => {
                    let idro = role.content
                    if (idro.toLowerCase() === 'pular') {
                        message.reply('Não será setada a role!')
                    } else {
                        await db.idgr.updateOne({groupwelcome: message.guild.id}, {role: idro})
                        message.channel.send('Role setada com sucesso!')
                    }
                    var ip1 = message.channel.createMessageCollector(a => a.author.id == message.author.id, {
                        time: 60000 * 5,
                        max: 1
                    })
                    message.channel.send('Digite uma mensagem de entrada (Caso não queira digite cancelar), Placeholders: {user}, {grupo}')
                    ip1.on('collect', async ip => {
                        let entrada = ip.content
                        if (entrada.toLowerCase() === 'cancelar') return message.reply('Não será escrita a mensagem!')
                        await db.idgr.findOneAndUpdate({groupwelcome: message.guild.id}, {msg1: entrada})
                        message.channel.send('Mensagem de entrada setada!')
                        var ip2 = message.channel.createMessageCollector(a => a.author.id == message.author.id, {
                            time: 60000 * 5,
                            max: 1
                        })
                        message.channel.send('Digite uma mensagem de saida (Caso não queira digite cancelar), Placeholders: {user}, {grupo}')
                        ip2.on('collect', async ip2 => {
                            let saida = ip2.content
                            if (saida === 'cancelar') return message.reply('Não será escrita a mensagem!')
                            await db.idgr.findOneAndUpdate({groupwelcome: message.guild.id}, {msg1: entrada, msg2: saida})
                            message.channel.send('Mensagem de saida setada!')

                        })
                    })
                })
            })
            });
        }
    }
}