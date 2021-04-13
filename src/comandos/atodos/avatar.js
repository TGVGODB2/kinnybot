const { MessageEmbed } = require('discord.js')
module.exports =  {
    config: {
        nome: 'avatar',
        cooldown: 10,
    },
    run: async(client, message, args) => {
        let avata = message.mentions?.users.first() || client.users.cache.find(x => args[0]?.includes(x.id)) || message.author
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Diversão`)
            .setDescription(`<:imagem:800011671229431848> Avatar de ${avata} [Clique aqui para baixar!](${avata.avatarURL({dynamic: true, size: 4096, format: 'png'})})`)
            .setImage(avata.displayAvatarURL({dynamic: true, size: 4096, format: 'png'}))
        message.quote(embed).then(reagir => {
            reagir.react('👍')
            reagir.react('👎')
            reagir.react('😎')
            reagir.react('😍')
            reagir.react('😢')
            reagir.react('😡')

        })
    }
}