const db = require('../../../db.js')
const path = require('path');
const Canvas = require('canvas')
const Discord = require('discord.js')
module.exports = async(client, member) => {
    let achar = await db.idgr.findOne({group: member.guild.id})
    if(achar) {
        let guild = client.guilds.cache.get(achar.group)
        let canal = guild.channels.cache.get(achar.channel)
        canal.edit({name: `${guild.memberCount}`})
    }
    let achar2 = await db.idgr.findOne({groupwelcome: member.guild.id})
    if(achar2) {
        let guild = client.guilds.cache.get(achar2.groupwelcome)
        let canala = client.channels.cache.get(achar2.channelwelcome)
        const canvas = Canvas.createCanvas(1280, 720);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(String(path.resolve(__dirname, '..', '..', 'Canvas', 'saida.png')));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.arc(646, 322, 170, 0, Math.PI * 2, true);
        ctx.lineWidth = 15;
        ctx.stroke();
        ctx.closePath();
        ctx.clip()
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 430, 120, 420, 420);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'saida.png');
        if(achar2.msg2) {
            canala.send(`${achar2.msg2.replace('{user}', `${member}`).replace('{grupo}', `${guild.name}`)}`, attachment);
        } else {
            canala.send(` ${member} Saiu, to triste agora 😢`, attachment);
        }
    } else return;
}