const { Message } = require('discord.js')
require('colors')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema
mongoose.connect('', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false

}).catch(error => {
    console.log(`[DB] Nao foi possivel conectar na mongoose, fechando conexão! Erro: ${error.message}`.red)
})
console.log('[DB] Database conectada!'.green)

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
    channelwele: { type: String },
    channelwell: { type: String },
    enabled: { type: Boolean },
    msg1: { type: String },
    msg2: { type: String },
    role: { type: String },
    grouplog: {type: String},
    channellogs: {type: String},
    logs: {type: Array},
    xpc: { type: String }
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
let porn = new Schema({
    groupid: { type: String },
    channel: { type: String},
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
    produtos: { type: Array },
    cooldown: {type: Number}
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
let creating = new Schema({
    id: {type: String},
    converting: {type: Boolean},
})
let res = new Schema({
    pergunta: {type: String},
    perguntatolower: {type: String},
    respostas: {type: Array},
    especialistas: {type: Boolean},
    categoria: {type: String},
    autor: {type: String}
})
let emp = new Schema({
    name: {type: String},
    nametolower: {type: String},
    jornalistas: {type: Array, default: []},
    dono: {type: String},
    materias: {type: Array},
    espectadores: {type: Number, default: 0},
    espectadorestotal: {type: Number, default: 0},
    lang: {type: String},
})
let muts = new mongoose.model('muteds', mutes)
exports.muteds = muts
let xpa = new mongoose.model('xps', xp)
exports.xps = xpa
let koin = new mongoose.model('coins', koins)
exports.coins = koin
let cahc = new mongoose.model('idgr', canais)
exports.idgr = cahc
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
let con = new mongoose.model('con', creating)
exports.con = con
let ar = new mongoose.model('res', res)
exports.res = ar
let empa = new mongoose.model('empr', emp)
exports.empr = empa
let por = new mongoose.model('can',porn)
exports.can = por