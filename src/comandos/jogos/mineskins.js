const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'mineskin',
        cooldown: 10
    },
    run: async(client, message, args) => {
        let ip = args.join(' ')
        if (!ip) return message.reply('Digite o seu nick!!')
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Minecraft`, `Skin de ${ip}! [Clique aqui para baixar a skin!](https://mc-heads.net/skin/${ip})`)
            .setImage(`https://mc-heads.net/player/${ip}`)

        message.channel.send(embed)
    }
}