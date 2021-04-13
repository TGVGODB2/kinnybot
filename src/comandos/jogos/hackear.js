const db = require('../../../db.js')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms');
module.exports = {
    config: {
        nome: "hackear",
        cooldown: 10,
        aliases: ['hack', 'hacking']
    },
    run: async(client, message) => {
    const pc = await db.consu.findOne({consumidor: message.author.id})
    const lan = await db.lgs.findOne({guildID: message.guild.id})
    if(!lan) {
        if(!pc) return message.reply('Você nao esta cadastrado na loja')
        const money = await db.coins.findOne({id: message.author.id})
        if(!money) return message.reply('Você nao esta cadastrado no banco!')
        if(!pc.produtos.includes('computador')) return message.reply('Você nao tem 1 computador')

        let objeto = ['datacenter da witch', 'foto do jack', 'nasa', 'area 51', 'celular do presidente']
        const timeout = 7.2e+6
                    if (pc.cooldown + timeout > Date.now()) {
                let infh = parseMilliseconds(timeout - (Date.now() - pc.cooldown));
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Diversão`, `Você ja hackeou! Tente novamente daqui **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
                message.channel.send(embed)
            } else {
        await db.consu.findOneAndUpdate({consumidor: message.author.id}, {cooldown: Date.now()})
         await db.consu.findOneAndUpdate({consumidor: message.author.id}, {$pull: {produtos: 'computador'}})
        const random = objeto[Math.floor(Math.random() * objeto.length)];
        const grana = Math.floor(Math.random() * 600);
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Diversão`)
            .setDescription(`Hackeando ${random}`)
            .setImage('https://media3.giphy.com/media/YQitE4YNQNahy/giphy-downsized-large.gif')
        message.channel.send(message.author, embed).then(editar => {
            
            setTimeout(async() => {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Diversão`)
                    .setDescription(`Você hackeou ${random} e ganhou ${grana} koins!`)
                await db.coins.findOneAndUpdate({id: message.author.id}, {coinsc: money.coinsc + grana})
                editar.edit(embed)
            }, 5000)
        })
    }
} else {
    if(lan.lang === 'en') {
        if(!pc) return message.reply('You are not registered in the store')
        const money = await db.coins.findOne({id: message.author.id})
        if(!money) return message.reply('You are not registered with the bank!')
        if(!pc.produtos.includes('computer')) return message.reply('You don\'t have a computer')

        let objeto = ['witch\'s datacenter', 'FBI', 'nasa', 'area 51', 'president\'s cell phone']
        const timeout = 7.2e+6
                    if (pc.cooldown + timeout > Date.now()) {
                let infh = parseMilliseconds(timeout - (Date.now() - pc.cooldown));
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `You already hacked! Try again from here **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
                message.channel.send(embed)
            } else {
        await db.consu.findOneAndUpdate({consumidor: message.author.id}, {cooldown: Date.now()})
         await db.consu.findOneAndUpdate({consumidor: message.author.id}, {$pull: {produtos: 'computer'}})
        const random = objeto[Math.floor(Math.random() * objeto.length)];
        const grana = Math.floor(Math.random() * 600);
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Fun`)
            .setDescription(`Hacking ${random}`)
            .setImage('https://media3.giphy.com/media/YQitE4YNQNahy/giphy-downsized-large.gif')
        message.channel.send(message.author, embed).then(editar => {
            
            setTimeout(async() => {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Fun`)
                    .setDescription(`You hacked ${random} and won ${grana} koins!`)
                await db.coins.findOneAndUpdate({id: message.author.id}, {coinsc: money.coinsc + grana})
                editar.edit(embed)
            }, 5000)
        })
    }
    }
}

    }
}