const Discord = require('discord.js')
const { Manager } = require("erela.js");
const parseMilliseconds = require('parse-ms');
const Spotify  = require("erela.js-spotify");
const db = require('./db.js')
const colors = require('colors');
const {clientID, clientSecret} = require('./spot.json')
const { Client, Collection, Message, APIMessage, Intents } = require('discord.js')
const { tokenc, tokenAPI, token } = require("./config.json")
const DBL = require('top.gg');
const dbl = new DBL(tokenAPI, { webhookPort: 80, webhookAuth: '' });
const client = new Client({
    shardId: process.argv[1],
    shardCount: process.argv[2],
    fetchAllMembers: true,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS]
});
dbl.webhook.on('ready', hook => {
  console.log(`[WEBHOOK TOP.GG] Web hook logado! no ip ${hook.hostname} e na porta ${hook.port}`.green);
});
dbl.webhook.on('vote', async vote => {
   const find = await db.coins.findOne({id: vote.user})
   !find ? await db.coins.create({id: vote.user, coinsc: 5000}):await db.coins.findOneAndUpdate({id: vote.user}, {coinsc: find.coinsc + 5000})
   client.users.cache.get(vote.user).send('Detectamos que você fez 1 voto na top.gg! Serio obrigado mesmo. E você acaba de receber 5K de koins!').catch(error => {
       console.log('Um erro ocorreu ao anunciar para o ' + client.users.cache.get(vote.user).username)
   })
   client.channels.cache.get('821013595822620673').send(`O membro ${client.users.cache.get(vote.user).username} votou na top.gg e recebe 5K de koins! Quer essa quantia tambem? Então vote na top.gg! https://top.gg/bot/750384014388494376 !`)
});
['commands', 'aliases'].forEach(f => client[f] = new Collection());
['comandos', 'eventos'].forEach(f => require(`./src/handlers/${f}`)(client));

client.manager = new Manager({
    nodes: [
        {
            host: '',
            port: ,
            retryAmount: 30,
            retryDelay: 3000,
            secure: false,
            password: '',
            identifier: 'kinnymusic'
        },
    ],
    plugins: [ new Spotify({clientID, clientSecret})],
    autoPlay: true,
    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if(guild) guild.shard.send(payload);
    }
})
    .on("nodeConnect", node => {
        console.log(`[LAVALINK] - ${node.options.identifier} conectado`.green)
        const sendPing = () => {
            node.send({
                op: 'ping'
            })
        };
    
        sendPing();
        setInterval(() => {
            sendPing();
        }, 45000);
    })
     .on("nodeReconnect", node => console.log(`[LAVALINK] - Servidor caiu! Tentando se reconectar!`.yellow))
    .on("nodeError", (node, err) => {
        if (err.message.includes('pong')) return; 
        console.log(`[LAVALINNK] - ${node.options.identifier} encontrou um error: ${err.message}.`.red)
    })
    .on("trackStart", async(player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        let embed = new Discord.MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Musica`)
            .addField("Uma nova musica irá tocar!", `<:rede:800011671145545738> Nome: ${track.title} \n<:winner:801206555478982657> Criador: ${track.author} \n<:ausente:799747794545279057> Tempo: ${parseMilliseconds(track.duration).hours <= 9 ? `0${parseMilliseconds(track.duration).hours}`:parseMilliseconds(track.duration).hours}:${parseMilliseconds(track.duration).minutes <= 9 ? `0${parseMilliseconds(track.duration).minutes}`:parseMilliseconds(track.duration).minutes}:${parseMilliseconds(track.duration).seconds <= 9 ? `0${parseMilliseconds(track.duration).seconds}`:parseMilliseconds(track.duration).seconds}`)
       const res = await client.manager.players.get(player.guild).search(track.uri, player)
        if(player.trackRepeat) return;
        channel.send({embeds: [embed]}).then(msg => player.set("message", msg));
    })
    .on("queueEnd",async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        let embed = new Discord.MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Musica`)
            .addField("Uma musica acabou!!", `<:rede:800011671145545738> Nome: ${track.title} \n<:winner:801206555478982657> Criador: ${track.author} \n<:ausente:799747794545279057> Tempo: ${parseMilliseconds(track.duration).hours <= 9 ? `0${parseMilliseconds(track.duration).hours}`:parseMilliseconds(track.duration).hours}:${parseMilliseconds(track.duration).minutes <= 9 ? `0${parseMilliseconds(track.duration).minutes}`:parseMilliseconds(track.duration).minutes}:${parseMilliseconds(track.duration).seconds <= 9 ? `0${parseMilliseconds(track.duration).seconds}`:parseMilliseconds(track.duration).seconds}`)
        channel.send({embeds: [embed]}).then(msg => player.set("message", msg));
        const res = client.manager.players.get(player.guild).search(track.uri, player)
        if(res.loadType === "PLAYLIST_LOADED") return;
        if(player.trackRepeat) return;
    player.destroy()
    })
    .on("queueStart", (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        let embed = new Discord.MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Musica`)
            .addField("Uma fila de musicas irá tocar!", `<:rede:800011671145545738> Nome: ${track.title} \n<:winner:801206555478982657> Criador: ${track.author} \n<:ausente:799747794545279057> Tempo: ${parseMilliseconds(track.duration).hours <= 9 ? `0${parseMilliseconds(track.duration).hours}`:parseMilliseconds(track.duration).hours}:${parseMilliseconds(track.duration).minutes <= 9 ? `0${parseMilliseconds(track.duration).minutes}`:parseMilliseconds(track.duration).minutes}:${parseMilliseconds(track.duration).seconds <= 9 ? `0${parseMilliseconds(track.duration).seconds}`:parseMilliseconds(track.duration).seconds}`)
        channel.send({embeds: [embed]}).then(msg => player.set("message", msg));
    })
client.login(token)