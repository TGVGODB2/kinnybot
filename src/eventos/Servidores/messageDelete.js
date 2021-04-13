const db = require('../../../db.js')
const { MessageEmbed, WebhookClient } = require('discord.js')
module.exports = async(client, message) => {
    const mencao = message.mentions.members.first()
    if (mencao) {
        if (message.content.includes(`<@!${mencao.id}>`) || message.content.includes(`<@${mencao.id}>`)) {
            if(mencao.user.bot) return;
            let saifora = await db.webs.findOne({ id: message.author.id })
            if (!saifora) {
                    if(!message.channel.permissionsFor(client.user.id).has("MANAGE_WEBHOOKS")) return;
                    await db.webs.create({ id: message.author.id, channelid: message.channel.id })
                saifora = await db.webs.findOne({ id: message.author.id })
                message.guild.channels.cache.get(message.channel.id).createWebhook(message.author.username, {
                    avatar: message.author.displayAvatarURL({ format: 'png'}),
                }).then(async webcreated => {
                    await db.webs.findOneAndUpdate({ id: message.author.id}, { token: webcreated.token, idweb: webcreated.id, guildid: message.guild.id})

                    saifora = await db.webs.findOne({ id: message.author.id })

                    const webhookClient = new WebhookClient(saifora.idweb, saifora.token);
                    webhookClient.send(message?.content.replace(`<@!${mencao.id}>`, mencao.user.username).replace(`<@${mencao.id}>`, mencao.user.username) || mencao.user.username, {
                        username: message.author.username,
                        avatarURL: message.author.displayAvatarURL({ format: 'png'}),
                    }).then(async () => await webhookClient.delete())
                    
                })
            } else {
                await db.webs.findOneAndUpdate({ id: message.author.id, channelid: message.channel.id })
                saifora = await db.webs.findOne({ id: message.author.id })
                message.guild.channels.cache.get(message.channel.id).createWebhook(message.author.username, {
                    avatar: message.author.displayAvatarURL({ format: 'png'}),
                }).then(async webcreated => {
                    await db.webs.findOneAndUpdate({ id: message.author.id}, { token: webcreated.token, idweb: webcreated.id,  })

                    saifora = await db.webs.findOne({ id: message.author.id })

                    const webhookClient = new WebhookClient(saifora.idweb, saifora.token);
                    webhookClient.send(message?.content.replace(`<@!${mencao.id}>`, mencao.user.username).replace(`<@${mencao.id}>`, mencao.user.username) || mencao.user.username, {
                        username: message.author.username,
                        avatarURL: message.author.displayAvatarURL({ format: 'png'}),
                    }).then(async () => await webhookClient.delete())
                })
                
            }
        }
    }
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