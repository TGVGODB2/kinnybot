const { MessageEmbed } = require('discord.js')
module.exports =  {
    config: {
        nome: 'avatar',
        cooldown: 10,
        options: [{
            name: 'user',
            type: 'STRING',
            description: 'User da pessoa',
            required: false,
        }],
    },
    run: async(client, message, args) => {
        let avata = message.mentions?.users.first() || client.users.cache.get(!args[0] ? message.options.getString('user').replace(/[<@!>]/g, ''):args[0]) || client.users.fetch(!args[0] ? message.options.getString('user').replace(/[<@!>]/g, ''):args[0]);

        if(avata instanceof Promise) {
            await avata.then(u => avata = u).catch(err => avata = !message.author ? message.user:message.author);
        }
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Diversão`)
            .setDescription(`<:imagem:800011671229431848> Avatar de ${avata} [Clique aqui para baixar!](${avata.avatarURL({dynamic: true, size: 4096, format: 'png'})})`)
            .setImage(avata.displayAvatarURL({dynamic: true, size: 4096, format: 'png'}))
        if(message.isCommand()) {
            message.reply({embeds: [embed]})
        } else {
            message.reply({embeds: [embed]}).then(reagir => {
                reagir.react('👍')
                reagir.react('👎')
                reagir.react('😎')
                reagir.react('😍')
                reagir.react('😢')
                reagir.react('😡')
    
            })
        }
    }
}