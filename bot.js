const Discord = require('discord.js')
const { Manager } = require("erela.js");
const parseMilliseconds = require('parse-ms');
const Spotify  = require("erela.js-spotify");
const db = require('./db.js')
const {clientID, clientSecret} = require('./spot.json')
const { Client, Collection, Constants, APIMessage, Message } = require('discord.js')
const { token, tokenAPI } = require("./config.json")
const { ShardingManager } = require('discord.js');
const DBL = require('top.gg');
const dbl = new DBL(tokenAPI, { webhookPort: 3001, webhookAuth: '' });
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`
const client = new Client({
    shardId: process.argv[1],
    shardCount: process.argv[2],
    fetchAllMembers: true
});
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', async vote => {
   const find = await db.coins.findOne({id: vote.user})
   if(!find) {
        client.users.cache.get(vote.user).send('Detectamos que você fez 1 voto na top.gg! Serio obrigado mesmo.')
       return client.channels.cache.get('').send(`O membro ${client.users.cache.get(vote.user).username} votou na top.gg, porem não pode receber 5K pois essa pessoa não tem conta! Quer essa quantia tambem? Então vote na top.gg! https://top.gg/bot/750384014388494376 !`)
   }
   await db.coins.findOneAndUpdate({id: vote.user}, {coinsc: find.coinsc + 5000})
   client.users.cache.get(vote.user).send('Detectamos que você fez 1 voto na top.gg! Serio obrigado mesmo. E você acaba de receber 5K de koins!').catch(error => {
       console.log('Um erro ocorreu ao anunciar para o ' + client.users.cache.get(vote.user).username)
   })
   client.channels.cache.get('').send(`O membro ${client.users.cache.get(vote.user).username} votou na top.gg e recebe 5K de koins! Quer essa quantia tambem? Então vote na top.gg! https://top.gg/bot/750384014388494376 !`)
});
['commands', 'aliases'].forEach(f => client[f] = new Collection());
['comandos', 'eventos'].forEach(f => require(`./src/handlers/${f}`)(client));

Message.prototype.quote = async function (content, options) {
    const message_reference = {
        message_id: (
            !!content && !options
                ? typeof content === 'object' && content.messageID
                : options && options.messageID
        ) || this.id,
        message_channel: this.channel.id
    }

    const allowed_mentions = {
        parse: ['users', 'roles', 'everyone'],
        replied_user: typeof content === 'object' ? content && +content.mention : options && +options.mention
    }

    const { data: parsed, files } = await APIMessage
        .create(this, content, options)
        .resolveData()
        .resolveFiles()

    return this.client.api.channels[this.channel.id].messages.post({
        data: { ...parsed, message_reference, allowed_mentions },
        files
    })
        .then(d => this.client.actions.MessageCreate.handle(d).message)
}
client.manager = new Manager({
    nodes: [
        {
            host: '',
            port: ,
            password: '',
            retryDelay: 5000,
            identifier: ''
        },
    ],
    plugins: [ new Spotify({clientID, clientSecret})],
    autoPlay: true,
    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if(guild) guild.shard.send(payload);
    }
})
    .on("nodeConnect", node => console.log(`[LAVALINK] - ${node.options.identifier} conectado`))
     .on("nodeReconnect", node => console.log(`[LAVALINK] - Servidor caiu! Tentando se reconectar!`))
    .on("nodeError", (node, err) => console.log(`[LAVALINNK] - ${node.options.identifier} encontrou um error: ${err.message}.`))
    .on("trackStart", async(player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        let embed = new Discord.MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Musica`)
            .addField("Uma nova musica irá tocar!", `<:rede:800011671145545738> Nome: ${track.title} \n<:winner:801206555478982657> Criador: ${track.author} \n<:ausente:799747794545279057> Tempo: ${parseMilliseconds(track.duration).hours}:${parseMilliseconds(track.duration).minutes}:${parseMilliseconds(track.duration).seconds}`)
       const res = await client.manager.players.get(player.guild).search(track.uri, player)
        if(player.trackRepeat) return;
        channel.send(embed).then(msg => player.set("message", msg));
    })
    .on("queueEnd",async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        let embed = new Discord.MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Musica`)
            .addField("Uma musica acabou!!", `<:rede:800011671145545738> Nome: ${track.title} \n<:winner:801206555478982657> Criador: ${track.author} \n<:ausente:799747794545279057> Tempo: ${parseMilliseconds(track.duration).hours}:${parseMilliseconds(track.duration).minutes}:${parseMilliseconds(track.duration).seconds}`)
        player.destroy()
        const res = await client.manager.players.get(player.guild).search(track.uri, player)
        console.log(res.loadType)
        if(res.loadType === "PLAYLIST_LOADED") return;
        if(player.trackRepeat) return;
        channel.send(embed).then(msg => player.set("message", msg));
    })
    .on("queueStart", (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        let embed = new Discord.MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Musica`)
            .addField("Uma fila de musicas irá tocar!", `<:rede:800011671145545738> Nome: ${track.title} \n<:winner:801206555478982657> Criador: ${track.author} \n<:ausente:799747794545279057> Tempo: ${parseMilliseconds(track.duration).hours}:${parseMilliseconds(track.duration).minutes}:${parseMilliseconds(track.duration).seconds}`)
        channel.send(embed).then(msg => player.set("message", msg));
    })
client.login(token)