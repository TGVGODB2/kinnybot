const db = require('../../../db')

module.exports = {
    config: {
        nome: 'setlogs',
        cooldown: 10
    },
    run: async(client, message) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você não essa permissao \`Administrador\``)
        if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar emojis\``)
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar Mensagens\``)
        const canal = message.mentions.channels.first()
        if(!canal) return message.quote(`Mencione o canal`)
        if(!message.guild.channels.cache.get(canal.id)) return message.reply('Esse canal nao existe!')
        let addchannel = await db.idgr.findOne({grouplog: message.guild.id})
        if(!addchannel) {
            await db.idgr.create({grouplog: message.guild.id})
            message.quote('Canal criado com sucesso! Agora escolha o que vai querer nas logs \n1️⃣ Mensagens deletadas \n2️⃣ Mensagens editadas \n3️⃣ Alteração no nome da guild\n4️⃣ Verificar quem saiu da call ou entrou').then(async reagir => {
                reagir.react('1️⃣')
                reagir.react('2️⃣')
                reagir.react('3️⃣')
                reagir.react('4️⃣')
                reagir.react('✅')
                reagir.react('❌')
                await db.idgr.findOneAndUpdate({grouplog: message.guild.id}, {channellogs: canal.id})
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '1️⃣' && user.id === message.author.id;
                };

                const collector = reagir.createReactionCollector(filter, { time: 18000 });

                collector.on('collect', async(reaction, user) => {
                    await db.idgr.findOneAndUpdate({grouplog: message.guild.id}, {$push: {logs: 'deletes'}})
                    await reagir.reactions.cache.get('1️⃣').remove()
                    })
                const filter2 = (reaction, user) => {
                    return reaction.emoji.name === '2️⃣' && user.id === message.author.id;
                };

                const collector2 = reagir.createReactionCollector(filter2, { time: 18000 });

                collector2.on('collect', async(reaction, user) => {
                    await db.idgr.findOneAndUpdate({grouplog: message.guild.id}, {$push: {logs: 'edit'}})
                    await reagir.reactions.cache.get('2️⃣').remove()
                })
                const filter3 = (reaction, user) => {
                    return reaction.emoji.name === '3️⃣' && user.id === message.author.id;
                };

                const collector3 = reagir.createReactionCollector(filter3, { time: 18000 });

                collector3.on('collect', async(reaction, user) => {
                    await db.idgr.findOneAndUpdate({grouplog: message.guild.id}, {$push: {logs: 'guild'}})
                    await reagir.reactions.cache.get('3️⃣').remove()
                })
                const filter4 = (reaction, user) => {
                    return reaction.emoji.name === '✅' && user.id === message.author.id;
                };

                const collector4 = reagir.createReactionCollector(filter4, { time: 18000 });

                collector4.on('collect', async(reaction, user) => {
                   await reagir.delete()
                    message.quote('Logs setada com sucesso!')
                })
                const filter5 = (reaction, user) => {
                    return reaction.emoji.name === '❌' && user.id === message.author.id;
                };

                const collector5 = reagir.createReactionCollector(filter5, { time: 18000 });

                collector5.on('collect', async(reaction, user) => {
                    await db.idgr.findOneAndRemove({grouplog: message.guild.id})
                    await reagir.delete()
                    message.quote('Sessão de logs encerrada')
                })
                const filter6 = (reaction, user) => {
                    return reaction.emoji.name === '4️⃣' && user.id === message.author.id;
                };

                const collector6 = reagir.createReactionCollector(filter6, { time: 18000 });

                collector6.on('collect', async(reaction, user) => {
                 await reagir.reactions.cache.get('4️⃣').remove()
                   await db.idgr.findOneAndUpdate({grouplog: message.guild.id}, {$push: {logs: 'voice'}})
                })
                });
        } else {
            await db.idgr.findOneAndRemove({grouplog: message.guild.id})
            message.quote('Deletamos suas configurações para fazer uma nova configuração!')
        }
    }
}