const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'setcommand',
        cooldown: 10
    },
    run: async (client, message, args) => {
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`Administrador!\``)
     const cmd = await db.sets.find({id: message.guild.id})
     let command = args[0]
     if(!command) return message.quote('Digite o comando que quer seja criado!')
     let replya = args.slice(1).join(" ")
     if(!replya) return message.quote('Digite o que vou responder!')
     const comandoInfo = client.commands.get(command.toLowerCase()) || client.commands.get(client.aliases.get(command.toLowerCase()))
     if(comandoInfo) return message.quote('Esse comando já existe na kinny!')
     if(cmd.map(x => x.command).includes(command.toLowerCase())) {
       return message.quote('Esse comando já existe! Caso queira deletar reaje aqui! (1 minuto para reagir)').then(reagir => {
            reagir.react('😳')
            const filter = (reaction, user) => {
                return reaction.emoji.name === '😳' && user.id === message.author.id;
            };
            
            const collector = reagir.createReactionCollector(filter, { time: 60000});
            
            collector.on('collect', async(reaction, user) => {
                 await db.sets.findOneAndRemove({command: command})
                 reagir.reactions.removeAll()
               reagir.edit('Removido com sucesso!')
            });
        })
    }
     await db.sets.create({id: message.guild.id, command: command, reply: replya})
     message.quote(`Comando criado com sucesso! Quando você colocar <prefix>${command} irei dizer ${replya}`)
}
}