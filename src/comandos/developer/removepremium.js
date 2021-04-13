const db = require("../../../db");
module.exports = {
    config: {
        nome: 'removepremium',
        cooldown: 3
    },
    run: async(client, message, args) => {
        let gp = message.mentions.users.first()
        if(message.author.id !== '395995293436477442') {
            message.reply('Apenas meu desenvolvedor pode executar esse comando!')
        } else {
            let procm =  await db.premi.findOne({groupid: gp.id})
            if(procm) {
                await db.premi.remove({
                    groupid: gp.id,
                })
                message.channel.send('Pronto! Esse membro não é premium mais')
            } else {
                message.channel.send('Esse membro não é premium')
            }
        }
    }
}