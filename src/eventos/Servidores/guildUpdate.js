const db = require('../../../db')
const { MessageEmbed } = require('discord.js')

module.exports = async(client, newGuild, oldGuild) => {
    let guild = await db.idgr.findOne({grouplog: newGuild.id})
    if(!guild) return;
    if(!guild.logs.includes('guild')) return;
    let canal = client.channels.cache.get(guild.channellogs)
    const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Logs`)
        .setDescription(`**Nome do grupo alterado** \nNome do grupo antigo: ${newGuild.name}\n \nNome do grupo novo: ${oldGuild.name}`)
    canal.send(embed)
}