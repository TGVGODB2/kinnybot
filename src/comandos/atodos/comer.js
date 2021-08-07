const db = require('../../../db')

module.exports = {
    config: {
        nome: 'comer',
        cooldown: 10,
        aliases: ['comida', 'fat']
    },
    run: async(client, message) => {
        let priv = await db.consu.findOne({consumidor: !message.author ? message.user.id:message.author.id})
        if(!priv) return message.reply('Compre uma colher antes!')
        if(!priv.produtos.includes("colher")) return message.reply('Compre uma colher antes!')
        message.reply('😲 \n \n \n \n 🍗 ').then(editar => {
            setTimeout(() => {
                editar.edit('⠀ \n😲 \n \n \n 🍗 ')
            }, 2000)
            setTimeout(() => {
                editar.edit('⠀ \n \n😲 \n \n 🍗 ')
            }, 4000)
            setTimeout(() => {
                editar.edit('⠀ \n \n \n😲 \n 🍗 ')
            }, 6000)
            setTimeout(() => {
                editar.edit('⠀ \n \n \n \n 😲')
            }, 7000)
            setTimeout(() => {
                editar.edit('😲    🍔')
            }, 9000)
            setTimeout(() => {
                editar.edit('⠀😲⠀  🍔')
            }, 12000)
            setTimeout(() => {
                editar.edit('⠀⠀⠀😲 🍔')
            }, 15000)
            setTimeout(() => {
                editar.edit('⠀⠀⠀😲')
            }, 17000)
            setTimeout(() => {
                editar.edit('EH TO BASTAAAANTE CHEIO E TONTO!')
            }, 18000)

        })
    }
}