module.exports = {
    config: {
        nome: 'pausar',
        aliases: ['pause'],
        cooldown: 10
    },
    run: async(client, message) => {
        const player = client.manager.players.get(message.guild.id)
        const { channel } = message.member.voice;
        if(channel.id !== player.voiceChannel) return message.reply(`Eu estou conectada em um canal de voz diferente do seu.`);
        if (!player) return message.reply('Nao estou tocando nada de momento');
        if(!message.member.voice.channel) return message.reply('Você não está em um canal de musica');
        if(!message.guild.me.voice.channel) return message.reply('Eu nao estou em um canal de musica!');
        if(player.queue.current.requester.id !== message.author.id) return message.reply('Apenas o DJ pode pausar a musica!')
        if(player.paused) return message.reply('Essa musica ja esta pausada!')
        player.pause(true)
        await message.react('816662164567752724')
    }
}