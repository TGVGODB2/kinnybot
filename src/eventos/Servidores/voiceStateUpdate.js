const { MessageEmbed } = require('discord.js');
const db = require('../../../db')

module.exports = async(client, oldState, newState) => {
    const player = client.manager.players.get(newState.guild.id)
    if(player) {
       if(!newState.channel && oldState.channel) {
     if(oldState.id === client.user.id) {
         return player.destroy()
     }
   }
 if(oldState.guild.me.voice.channel.members.filter(m => !m.user.bot).size === 0) {
    player.destroy()
 }
}
   let log = await db.idgr.findOne({grouplog: oldState.guild.id})
   if(!log) return;
   if(log.logs.includes('voice')) { 
   let canal = client.channels.cache.get(log.channellogs) 
   if(!oldState.channel && newState.channel) {
      if(newState.id === client.user.id) return;
      const embed = new MessageEmbed()
      .setColor('#9900f8')
      .setTitle(`${client.user.username} - Logs`)
      .setDescription(`**Uma pessoa entrou em 1 canal de voz!**\nNome: ${client.users.cache.get(newState.id).username}\n \nCanal: ${newState.channel.name}`)
  canal.send(embed)
   } else {
      const embed = new MessageEmbed()
      .setColor('#9900f8')
      .setTitle(`${client.user.username} - Logs`)
      .setDescription(`**Uma pessoa saiu em 1 canal de voz!**\nNome: ${client.users.cache.get(oldState.id).username}\n \nCanal: ${oldState.channel.name}`)
  canal.send(embed)
   }
} else return;  
}