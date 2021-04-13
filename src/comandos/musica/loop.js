module.exports = {
    config: {
        nome: 'loop',
        cooldown: 10
    },
    run: async(client, message) => {
        const player = client.manager.players.get(message.guild.id)
        if(!message.member.voice.channel) return message.reply('Você não está em um canal de musica');
        if(!message.guild.me.voice.channel) return message.reply('Eu nao estou em um canal de musica!');
        if(!player) return message.reply('Nao estou tocando nada de momento');
        if(player.queue.current.requester.id !== message.author.id) return message.reply('Apenas o DJ pode adicionar loop na musica!')
        player.setTrackRepeat(true)
        await message.react('816376893161996348')

    }
}