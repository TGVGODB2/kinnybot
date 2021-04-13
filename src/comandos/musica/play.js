const { MessageEmbed } = require('discord.js');
const parseMilliseconds = require('parse-ms');

module.exports = {
    config: {
        nome: 'play',
        aliases: ['tocar'],
        cooldown: 10
    },
    run: async(client, message, args) => {
        let player1 = client.manager.players.get(message.guild.id);
        const { channel } = message.member.voice;

        if(!channel) return message.reply(`Para executar esse comando você precisa está em um canal de voz.`);
        if(!args.length) return message.reply(`Coloque o link ou o nome da musica que deseja tocar.`)

        if(!player1) {
            const player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            });
            if(!channel.joinable) return message.reply("Sem permissão para entrar no canal de voz que você está.")
            player.connect();
        }

        const player = client.manager.players.get(message.guild.id)
        const req = args.join(" ");
        let res;

        try {
            res = await player.search(req, message.author);
            if(res.loadType === "LOAD_FAILED") {
                if(!player.queue.current) player.destroy();
                throw new Error(res.exception.message);
            }
        } catch (err) {
            return message.reply(`Ocorreu um erro, entre em contato com nosso desenvolvedor para arrumar. Error(${err.message})`)
        }
        if(res.loadType === "NO_MATCHES") {
            if(!player.queue.current) player.destroy();
            return message.reply(`Não encontrei a musica ${req}`);
        } else if(res.loadType === "SEARCH_RESULT") {
            const track = res.tracks[0];
            await player.queue.add(track);
            if(!player.playing) {
                return player.play()
            }
                          let embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Musica`)
                .addField("Uma nova musica foi adicionada na lista!", `<:rede:800011671145545738> Nome: ${res.tracks[0].title} \n<:winner:801206555478982657> Criador: ${res.tracks[0].author} \n<:ausente:799747794545279057> Tempo: ${parseMilliseconds(res.tracks[0].duration).hours}:${parseMilliseconds(res.tracks[0].duration).minutes}:${parseMilliseconds(res.tracks[0].duration).seconds}`)
                 return message.channel.send(embed); 
            if(!player.playing && !player.paused && !player.queue.length) player.play()
        } else if(res.loadType === "PLAYLIST_LOADED") {
            await player.queue.add(res.tracks);

            if (!player.playing && !player.paused) await 
            player.play();
        } else if(res.loadType === "TRACK_LOADED") {
             if (player.playing) {
              let embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Musica`)
                .addField("Uma nova musica foi adicionada na lista!", `<:rede:800011671145545738> Nome: ${res.tracks[0].title} \n<:winner:801206555478982657> Criador: ${res.tracks[0].author} \n<:ausente:799747794545279057> Tempo: ${parseMilliseconds(res.tracks[0].duration).hours}:${parseMilliseconds(res.tracks[0].duration).minutes}:${parseMilliseconds(res.tracks[0].duration).seconds}`)
                await player.queue.add(res.tracks[0]);
           return message.channel.send(embed); 
            }
            await player.queue.add(res.tracks[0]);
           return await player.play()
        }
    }
}