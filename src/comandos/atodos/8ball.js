const { MessageEmbed } = require('discord.js')
const db = require('../../../db')
module.exports = {
    config: {
        nome: '8ball'
    },
    run: async(client, message, args) => {
        let pergunta =  args.join(' ')
        if(!pergunta) return message.reply('Digite sua pergunta')
        let frases = [
            "Provavelmente",
            "Talvez",
            "Sim",
            "Nao",
            "Nao sei de nada",
            "Tenho certeza",
        ]
        const ale = frases[Math.floor(Math.random() * frases.length)]

        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - 8Ball`,`**Pergunta:** ${pergunta} \n \n **Resposta:** ${ale}`)

        message.quote(embed)

    }
}