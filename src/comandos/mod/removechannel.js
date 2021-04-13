const db = require("../../../db");
module.exports = {
    config: {
        nome: 'removechannel',
        cooldown: 10
    },
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você não essa permissao \`Administrador\``)
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar canais\``)
        let achar = await db.idgr.findOne({groupwelcome: message.guild.id})
        if(!achar) {
message.channel.send('Você não tem 1 canal disponivel!')
        } else {
            message.channel.send('Canal removido!')
            let canal = message.guild.channels.cache.get(achar.channelwelcome)
            canal.edit({ name: `canal-novo`})
            await db.idgr.findOneAndRemove({
                groupwelcome: message.guild.id
            })
        }
    }
}