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
        message.reply('š² \n \n \n \n š ').then(editar => {
            setTimeout(() => {
                editar.edit('ā  \nš² \n \n \n š ')
            }, 2000)
            setTimeout(() => {
                editar.edit('ā  \n \nš² \n \n š ')
            }, 4000)
            setTimeout(() => {
                editar.edit('ā  \n \n \nš² \n š ')
            }, 6000)
            setTimeout(() => {
                editar.edit('ā  \n \n \n \n š²')
            }, 7000)
            setTimeout(() => {
                editar.edit('š²    š')
            }, 9000)
            setTimeout(() => {
                editar.edit('ā š²ā   š')
            }, 12000)
            setTimeout(() => {
                editar.edit('ā ā ā š² š')
            }, 15000)
            setTimeout(() => {
                editar.edit('ā ā ā š²')
            }, 17000)
            setTimeout(() => {
                editar.edit('EH TO BASTAAAANTE CHEIO E TONTO!')
            }, 18000)

        })
    }
}