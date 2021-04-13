const db = require("../../../db");
module.exports = {
    config: {
        nome: 'setcanaldexp',
        cooldown: 10
    },
    run: async(client, message, args) => {
       if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você não essa permissao \`Administrador\``)
            let achar = await db.chan.findOne({grupo: message.guild.id})
            if(achar) {
                let id = message.mentions.channels.first()
                if(!id) return message.reply(`${client.user.username} - Erro \n Mencione um canal`)
                message.channel.send('Canal setado com sucesso!')
                await db.chan.updateOne({
                    grupo: message.guild.id,
                    chanl: id.id
                })
            } else {
                let id = message.mentions.channels.first()
                if(!id) return message.reply(`${client.user.username} - Erro \n Mencione um canal`)
                await db.chan.create({
                    grupo: message.guild.id,
                    chanl: id.id
                })
                message.channel.send('Canal setado com sucesso!')
            }
    }
}