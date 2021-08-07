const db = require("../../../db");
module.exports = {
    config: {
        nome: 'setcanaldexp',
        cooldown: 10
    },
    run: async(client, message, args) => {
        if(message.isCommand) return message.channel.send('Esse comando não funciona com slash commands!')
       if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você não essa permissao \`Administrador\``)
            let achar = await db.idgr.findOne({group: message.guild.id})
            if(achar) {
                let id = message.mentions.channels.first()
                if(!id) return message.reply(`${client.user.username} - Erro \n Mencione um canal`)
                message.reply('Canal setado com sucesso!')
                await db.idgr.findOneAndUpdate({group: message.guild.id}, {xpc: id.id})
            } else {
                let id = message.mentions.channels.first()
                if(!id) return message.reply(`${client.user.username} - Erro \n Mencione um canal`)
                await db.idgr.create({group: message.guild.id, xpc: id.id})
                message.reply('Canal setado com sucesso!')
            }
    }
}