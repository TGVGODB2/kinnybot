const { MessageEmbed } = require('discord.js')

module.exports = async(client, guild) => {
        let servidor = client.guilds.cache.get('800349226919788586')
        let clm = servidor.channels.cache.get('803038083293511720')
        if(['781113404764585995', '783120271565389844', '537339615808454658'].includes(guild.ownerID)){
            console.log(`O usuario ${guild.members.cache.get(guild.ownerID).user.username} tentou adicionar o bot porem foi barrado!`)
            return client.guilds.cache.get(guild.id).leave()
        }
        const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Novo servidor!`)
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addField('Fui adicionado em um novo servidor!', `Grupo: ${guild.name} \nID Do grupo: ${guild.id} \nMembros ${guild.memberCount} \nDono: ${guild.members.cache.get(guild.ownerID).user.username} `)
        clm.send({embeds: [embed]})
}