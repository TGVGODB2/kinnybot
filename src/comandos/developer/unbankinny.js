const db = require("../../../db");
module.exports = {
    config: {
        nome: 'unbankinny',
        cooldown: 3
    },
    run: async(client, message, args) => {
        let gp = message.mentions.members.first(1)[0]
        if(!message.author ? message.user.id:message.author.id !== '425775842371829760') {
            message.reply('Apenas meu desenvolvedor pode executar esse comando!')
        } else {
            let procm =  await db.ban.findOne({punid: gp})
            if(!procm) {
                await db.ban.remove({
                    punid: gp.id,
                })
                message.reply('Pronto! Essa pessoa foi desbanida!')
            } else {
                message.reply('Essa pessoa não está banida')
            }
        }
    }
}