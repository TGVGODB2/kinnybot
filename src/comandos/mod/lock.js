module.exports = {
    config: {
        nome: 'lock',
        cooldown: 10
    },
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`${client.user.username} - Erro \nVocê não tem a permissão \`Gerenciar mensagens!\``)
                if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply(`${client.user.username} - Erro \nEu não tenho a permissão \`Gerenciar mensagens!\``)
if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar Cargos\``)
    let canal = message.channel
    let grupo = message.guild.id

        canal.updateOverwrite(grupo, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        }).catch(e => {
            message.channel.send(`Ocorreu um erro interno ao tentar executar esse comando ${e}`)
        })
        message.channel.send(`${client.user.username} - Sucesso \n Esse canal foi bloqueado por ${message.author}`)
    }
}