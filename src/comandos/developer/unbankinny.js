const db = require("../../../db");
module.exports = {
    config: {
        nome: 'unbankinny',
        cooldown: 3
    },
    run: async(client, message, args) => {
        let gp = message.mentions.members.first(1)[0]
        if(message.author.id !== '395995293436477442') {
            message.reply('Apenas meu desenvolvedor pode executar esse comando!')
        } else {
            let procm =  await db.ban.findOne({punid: gp})
            if(!procm) {
                await db.ban.remove({
                    punid: gp.id,
                })
                message.channel.send('Pronto! Essa pessoa foi desbanida!')
            } else {
                message.channel.send('Essa pessoa não está banida')
            }
        }
    }
}