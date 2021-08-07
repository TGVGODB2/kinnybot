const fs = require('fs')
const { MessageEmbed, MessageButton, MessageActionRow  } = require('discord.js')
const db = require('../../../db')
//const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
    config: {
        nome: 'ajuda',
        cooldown: 10,
        aliases: ['help']
    },
    run: async (client, message) => {
        const lan = await db.lgs.findOne({ guildID: !message.author ? message.user.id:!message.author ? message.user.id:message.author.id })
        const comandos = fs.readdirSync('./src/comandos/atodos').filter(file => file.endsWith('.js'))
        const array = []
        for (let file of comandos) {
            array.push(file.split('.')[0])
        }
        const buttons = [
            { id: 'mod', emoji: '801198221454999582', },
            { id: 'eco', emoji: '801206555495891008', },
            { id: 'geral', emoji: '801206555755675728', },
            { id: 'game', emoji: '801544422462324758', },
            { id: 'music', emoji: '🎵', },
            { id: 'rep', emoji: '817746775981031454', },
            { id: 'jor', emoji: '👨‍💻', },
            { id: 'close', emoji: '❌' }
        ]
        function separe(btns, maximo = 5) {
            const itens = btns.map(b => new MessageButton().setCustomId(b.id).setEmoji(b.emoji).setStyle(b.color || 'SECONDARY'))
            return itens.reduce((acumulador, item, indice) => {
                const grupo = Math.floor(indice / maximo);
                acumulador[grupo] = [...(acumulador[grupo] || []), item];
                return acumulador;
            }, []).map(r => new MessageActionRow().addComponents(r))
        }
        let mod = `${client.commands.filter(cmd => cmd.config.categoria == 'mod').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let eco = `${client.commands.filter(cmd => cmd.config.categoria == 'economia').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let geral = `${client.commands.filter(cmd => cmd.config.categoria == 'atodos').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let jogo = `${client.commands.filter(cmd => cmd.config.categoria == 'jogos').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let musica = `${client.commands.filter(cmd => cmd.config.categoria == 'musica').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        let rep = `${client.commands.filter(cmd => cmd.config.categoria == 'reputacao').map(cmd => cmd.config.nome).join(' | ')} \n \n`
        const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Comandos`)
        .setDescription(`> Reaja nos botões para cada comando (Possuo ${client.commands.size} comandos!)\n \n<:banido:801198221454999582> ${lan && lan.lang === 'en' ? "Moderation" : "Moderação"} \n<:compra:801206555495891008> ${lan && lan.lang === 'en' ? "Economy" : "Economia"} \n<:terra:801206555755675728> Geral\n<:morto:801544422462324758> ${lan && lan.lang === 'en' ? "Games" : "Jogos"} \n🎵 ${lan && lan.lang === 'en' ? "Music" : "Musica"}\n<:reputation:817746775981031454> ${lan && lan.lang === 'en' ? "Reputation" : "Reputação"}\n👨‍💻 ${lan && lan.lang === 'en' ? "Journalism" : "Jornalismo"}`)
       var m = message.reply({
            components: separe(buttons),
            embeds: [embed]
        })
        if(!m) {
            m = message.fetchReply()
        }
       const filter = (button) => button.user.id === !message.author ? message.user.id:message.author.id;
       console.log(m)
    const collector = m.createMessageComponentCollector({filter});
    collector.on('collect', async b => {
        await b.deferUpdate();
        const newButtons = buttons.map(btn => {
          return {
            id: btn.id,
            emoji: btn.emoji,
            color: ((btn.id === b.customId) ? 'PRIMARY' : 'SECONDARY')
          }
        })
        if (b.customId === 'mod') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
        .setTitle(`${client.user.username} - Comandos (${client.commands.filter(cmd => cmd.config.categoria == 'mod').map(x => x.config.nome).length})`)
        .setDescription(`\`${mod}\``)
        m.edit({
            components: separe(newButtons),
            embeds: [embed]
        })
        } else if(b.customId=== 'eco') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
        .setTitle(`${client.user.username} - Comandos (${client.commands.filter(cmd => cmd.config.categoria == 'economia').map(x => x.config.nome).length})`)
        .setDescription(`\`${eco}\``)
            m.edit({
                components: separe(newButtons),
                embeds: [embed]
            })
        } else if(b.customId === 'geral') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
        .setTitle(`${client.user.username} - Comandos (${client.commands.filter(cmd => cmd.config.categoria == 'atodos').map(x => x.config.nome).length})`)
        .setDescription(`\`${geral}\``)
            m.edit({
                components: separe(newButtons),
                embeds: [embed]
            })
        } else if(b.customId === 'game') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
        .setTitle(`${client.user.username} - Comandos (${client.commands.filter(cmd => cmd.config.categoria == 'jogos').map(x => x.config.nome).length})`)
        .setDescription(`\`${jogo}\``)
            m.edit({
                components: separe(newButtons),
                embeds: [embed]
            })
        } else if(b.customId === 'music') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
        .setTitle(`${client.user.username} - Comandos (${client.commands.filter(cmd => cmd.config.categoria == 'musica').map(x => x.config.nome).length})`)
        .setDescription(`\`${musica}\``)
            m.edit({
                components: separe(newButtons),
                embeds: [embed]
            })
        }
        else if(b.customId === 'rep') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
        .setTitle(`${client.user.username} - Comandos (${client.commands.filter(cmd => cmd.config.categoria == 'reputacao').map(x => x.config.nome).length})`)
        .setDescription(`\`${rep}\``)
            m.edit({
                components: separe(newButtons),
                embeds: [embed]
            })
            
        } else if(b.customId === 'close') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Comandos`)
            .setDescription(`> Reaja nos botões para cada comando (Possuo ${client.commands.size} comandos!)\n \n<:banido:801198221454999582> ${lan && lan.lang === 'en' ? "Moderation" : "Moderação"} \n<:compra:801206555495891008> ${lan && lan.lang === 'en' ? "Economy" : "Economia"} \n<:terra:801206555755675728> Geral\n<:morto:801544422462324758> ${lan && lan.lang === 'en' ? "Games" : "Jogos"} \n🎵 ${lan && lan.lang === 'en' ? "Music" : "Musica"}\n<:reputation:817746775981031454> ${lan && lan.lang === 'en' ? "Reputation" : "Reputação"}`)
            await m.edit({
                components: separe(buttons),
                embeds: [embed]
            })
        } else if(b.customId === 'jor') {
            const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Comandos`)
            .setDescription(`${client.user.username} - Comandos (${client.commands.filter(cmd => cmd.config.categoria == 'jornalismo').map(x => x.config.nome).length})`)
            .setDescription(`\`${client.commands.filter(cmd => cmd.config.categoria == 'jornalismo').map(cmd => cmd.config.nome).join(' | ')} \n \n\``)
            await m.edit({
                components: separe(newButtons),
                embeds: [embed]
            })
        }
    });
}
}