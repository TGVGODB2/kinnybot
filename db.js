const { Message } = require('discord.js')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb+srv://user:password@Cluster0.b9jeb.mongodb.net/Cluster0\n\n?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false

}).catch(error => {
    console.log('Nao foi possivel conectar na mongoose, fechando conexão! Erro: ' + error)
})
console.log('Database conectada!')

let prefix = new Schema({
    prefix: { type: String},
    id: { type: String},
})
let prefix2 = new mongoose.model('prefixs', prefix)
exports.prefixs = prefix2
let mutes = new Schema({
    roleid: { type: String},
    memberid: { type: String},
    guildId: { type: String},
})
let inferno = new Schema({
    owner: { type: String },
    vag: { type: String }
})
let xp = new Schema({
    xp: { type: Number },
    userID: { type: String },
    guildID: { type: String },
    level: { type: Number },
})
let canais = new Schema({
    group: { type: String },
    groupwelcome: { type: String },
    channel: { type: String },
    channelwelcome: { type: String },
    msg1: { type: String },
    msg2: { type: String },
    role: { type: String },
    grouplog: {type: String},
    channellogs: {type: String},
    logs: {type: Array}
})
let xpch = new Schema({
    grupo: { type: String },
    chanl: { type: String },
})
let reCaptch = new Schema({
    groupid: { type: String },
    capactivy: { type: String },
    code: { type: String },
    member: { type: String },
    role: { type: String },
})
let punir = new Schema({
    punid: { type: String },
    motivo: { type: String },
})
let premium = new Schema({
    groupid: { type: String },
    memberid: { type: String},
})
let koins = new Schema({
    id: { type: String },
    coinsc: { type: Number },
    coinsb: { type: Number },
    dailyCooldown: { type: Number },
    workCooldown: { type: Number },
    cassdown: { type: Number },
    multidown: { type: Number },
    apodown: { type: Number },
    robdown: { type: Number },
    casado1: { type: String },
    casado2: { type: String },
})
let loja = new Schema({
    consumidor: { type: String },
    produtos: { type: Array }
})
let rep = new Schema({
    id: { type: String },
    reps: { type: Number },
    membro: { type: String},
    cooldown: {type: Number}
})
let repcooldown = new Schema({
    membro: {type: String},
    cooldown: {type: Number}
})
let sorteio = new Schema({
    guildID: {type: String},
    part: {type: Array},
    end: {type: Boolean},
    channel: {type: String},
    title: {type: String},
    winners: {type: Number},
    messageID: {type: String}
})
let langs = new Schema({
    guildID: {type: String},
    lang: {type: String}
})
let setcommand = new Schema({
    id: {type: String},
    command: {type: String},
    reply: {type: String}
})
let webhook = new Schema({
    id: {type: String},
    idweb: {type: String},
    token: {type: String},
    channelid: {type: String},
    guildid: {type: String},
})
let va = new mongoose.model('infer', inferno)
exports.infer = va
let muts = new mongoose.model('muteds', mutes)
exports.muteds = muts
let xpa = new mongoose.model('xps', xp)
exports.xps = xpa
let koin = new mongoose.model('coins', koins)
exports.coins = koin
let cahc = new mongoose.model('idgr', canais)
exports.idgr = cahc
let xpch2  = new mongoose.model('chan', xpch)
exports.chan = xpch2
let pram  = new mongoose.model('premi', premium)
exports.premi = pram
let cap  = new mongoose.model('cap', reCaptch)
exports.cap = cap
let mole  = new mongoose.model('ban', punir)
exports.ban = mole
let cons  = new mongoose.model('consu', loja)
exports.consu = cons
let repa  = new mongoose.model('reps', rep)
exports.reps = repa
let repc  = new mongoose.model('repsc', repcooldown)
exports.repsc = repc
let gi  = new mongoose.model('give', sorteio)
exports.give = gi
let lang  = new mongoose.model('lgs', langs)
exports.lgs = lang
let set = new mongoose.model('sets', setcommand)
exports.sets = set
let web = new mongoose.model('webs', webhook)
exports.webs = web