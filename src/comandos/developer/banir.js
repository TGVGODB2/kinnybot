const db = require("../../../db");
module.exports = {
    config: {
        nome: 'bankinny',
        cooldown: 3
    },
    run: async(client, message, args) => {
        let motivo1 = args.slice(1).join(" ")
        let gp = message.mentions.members.first(1)[0]
        if(message.author.id !== '395995293436477442') {
            message.reply('Apenas meu desenvolvedor pode executar esse comando!')
        } else {
            let procm =  await db.ban.findOne({punid: gp})
            if(!procm) {
                await db.ban.create({
                    punid: gp.id,
                    motivo: motivo1
                })
                message.channel.send('Pronto! Essa pessoa está banida e não pode mais usar meus comandos!')
            } else {
                message.channel.send('Essa pessoa já esta banida')
            }
        }
    }
}