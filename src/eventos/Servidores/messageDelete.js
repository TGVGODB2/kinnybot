const db = require('../../../db.js')
const { MessageEmbed, WebhookClient } = require('discord.js')
module.exports = async(client, message) => {
        let guild = await db.idgr.findOne({grouplog: message.guild.id})
    if(!guild) return;
    if(!guild.logs.includes('deletes')) return;
    if(message.author.id === client.user.id) return;
    if(message.author.bot) return;
    let canal = client.channels.cache.get(guild.channellogs)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Logs`)
                .setDescription(`**Uma mensagem deletada!** \nUsuario: ${message.author.username} \n \nMensagem deletada: ${message.content}`)
            canal.send(embed)
}
