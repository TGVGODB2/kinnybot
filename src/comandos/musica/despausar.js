module.exports = {
    config: {
        nome: 'despausar',
        aliases: ['unpause', 'despause'],
        cooldown: 10
    },
    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id)
        if (!player) return message.reply('Nao estou tocando nada de momento');
        if(!message.member.voice.channel) return message.reply('Você não está em um canal de musica');
        if(!message.guild.me.voice.channel) return message.reply('Eu nao estou em um canal de musica!');
        if(!player.paused) return message.reply('Essa musica ja esta sendo tocada!')
        if(player.queue.current.requester.id !== message.author.id) return message.reply('Apenas o DJ pode despausar a musica!')
        player.pause(false)
        await message.react('816662164668153856')
    }
}