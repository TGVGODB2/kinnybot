const db = require('../../../db.js')

module.exports = {
    config: {
        nome: 'setprefix',
        cooldown: 10,
        options: [
            {
            name: 'prefix',
            type: 'STRING',
            description: 'Prefixo que deseja do jeitiho que você quiser!',
            required: true,
        },
    ]
    },
    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`Administrador!\``)
        const guild = await db.prefixs.findOne({
            id: message.guild.id
        })
        let newprefix = args[0]
        if(!newprefix) return message.reply(`${client.user.username} - Erro \n Não colocou o prefixo!`)
        if (newprefix.length > 5) return message.reply(`${client.user.username} - Erro \n Você so pode botar no maximo 5 caracteres!`)
        if(guild) {
            message.reply(`${client.user.username} - Correto \n Seu novo prefixo agora é ${newprefix}`)

            await db.prefixs.findOneAndUpdate({id: message.guild.id}, {prefix: newprefix})
        } else if(!guild) {
            message.reply(`${client.user.username} - Correto \n Seu novo prefixo agora é ${newprefix}`)
            await db.prefixs.create({
                id: message.guild.id,
                prefix: newprefix
            })
        }
    }
}