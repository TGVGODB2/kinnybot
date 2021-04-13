module.exports = {
    config: {
        nome: 'stop',
        aliases: ['parar'],
        cooldown: 10
    },
    run: async(client, message, args) => {
        let Canalvoz = message.member.voice.channel
        let canalvoz2 = message.guild.me.voice.channel
        const { channel } = message.member.voice;
        if(!Canalvoz) return message.reply('Você não está em 1 canal de voz!')
        if(!canalvoz2) return message.reply('Eu não estou em 1 canal de voz!')
        const player = client.manager.players.get(message.guild.id);
        if(!player) return message.reply('Não estou tocando nada no momento!')
        if(channel.id !== player.voiceChannel) return message.reply(`Eu estou conectada em um canal de voz diferente do seu.`);
        if(player.queue.current.requester.id !== message.author.id) return message.reply('Apenas o DJ pode parar a musica!')
        await message.react('816662306670379028')
            return player.destroy()
    }
    }