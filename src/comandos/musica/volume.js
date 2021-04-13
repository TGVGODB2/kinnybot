const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'volume',
        aliases: ['vol'],
        cooldown: 10
    },
    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id)
        const { channel } = message.member.voice;
        if(channel.id !== player.voiceChannel) return message.reply(`Eu estou conectada em um canal de voz diferente do seu.`);
        if(!message.member.voice.channel) return message.reply('Você não está em um canal de musica');
        if(!message.guild.me.voice.channel) return message.reply('Eu nao estou em um canal de musica!');
        let volume = args.join(' ')
        if(!volume) return message.reply('Digite o volume!')
        if(isNaN(volume)) return message.reply('Isso não é um numero!')
       if(volume > 100) return message.reply(`Atenção! Você so pode no maximo 100!, caso bote ${volume} você perderá audição então para sua segurança nos limitamos o volume!`)
        if(player.volume === volume) return message.reply('Ja está nesse volume')
        if (!player) return message.reply('nao estou tocando nada de momento');

        player.setVolume(volume)
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Musica`)
            .setDescription(`🔊 O volume foi alterado para ${volume}`)
        message.quote(embed)
    }
}