const { Collection, MessageEmbed } = require('discord.js')
const config = require("../../../config.json")
const cooldowns = new Collection()
const db = require('../../../db')
module.exports = async (client, message) => { 
    if (message.author.bot || message.channel.type === 'dm') return 
    if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy') {
        client.commands.forEach(async comandos => {
        if(comandos.config.categoria === 'developer' && comandos.config.categoria === 'jornalismo') return;
        console.log(`Comando ${comandos.config.nome} ${!comandos.config.options ? "não tem":"tem"} configurações de slash commands: Config ${comandos.config.options}`)
		const data = {
			name: comandos.config.nome,
			description: !comandos.config.descricao ? "Sem descrição":comandos.config.descricao,
		};
        if(comandos.config.options) {
            data.options = comandos.config.options
        }
		client.application?.commands.set(data)
      })
	}
  const randomXP = Math.floor(Math.random() * 100)
  if(!message.author.bot) {
  const user = await db.xps.findOne({userID: !message.author ? message.user.id:message.author.id}) || await db.xps.create({
      xp: 0,
      userID: !message.author ? message.user.id:message.author.id,
      level: 0,
  })

  function leveledUp(xp, level, differ) {
      return xp > level * differ
  }
  user.xp = user.xp + randomXP
  if (client.user === message.author) return;
  if (leveledUp(user.xp, user.level, 8000)) {
      user.level = user.level + 1
      let canal = await db.idgr.findOne({group: message.guild.id}) || message.channel.id
      let canal3 = message.guild.channels.cache.get(canal?.xpc || canal)
      canal3?.send(`${client.user.username} - Diversão \n Parabens \`${message.author.username}\`! Você chegou ao nivel ${user.level}`) || console.log("Não foi possivel mandar msg nesse canal! Ignorando")

  }
  user.xp = user.xp + randomXP
  user.save()
}
  const prefixo = await db.prefixs.findOne({id: message.guild?.id || null})
  const prefix = !prefixo ? config.prefix:prefixo.prefix
  if (message.content === `<@!${client.user.id}>` || message.content === '<@' + client.user.id + '>') {
    const embed = new MessageEmbed()
        .setThumbnail(client.user.avatarURL())
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Apresentação`)
        .addField('Olá ser humano, eu me chamo Kinny!', 'Minha comida favorita é Bolo de cenoura, so de falar me da agua na boca')
        .addField(`Meu prefixo é ${prefix}`, `Mas você pode trocar o prefixo usando ${prefix}setprefix <novo prefixo>! <a:dance:798169339181531167>`)
        .addField('Eu fui projetado para ter uma diversão e utilidades!', 'Meu desenvolvedor é o <@395995293436477442>')
    return message.reply({embeds: [embed]})
  }
     
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const comando = args.shift().toLowerCase() 
    if (!message.content.startsWith(prefix)) return

    const comandoInfo = client.commands.get(comando) || client.commands.get(client.aliases.get(comando))

    if (comandoInfo) {
        if(comandoInfo.config.categoria === 'jornalismo') return message.reply('Essa categoria não funciona com slash commands!')
      if(!message.member.permissions.has('ADMINISTRATOR')) {
          let channel = await db.can.findOne({groupid: message.guild.id})
       if(channel && message.channel.id !== channel.channel) return message.reply(`Esse comando so pode ser executado em <#${channel.channel}>`)
      }
      if (!cooldowns.has(comandoInfo.config.nome)) cooldowns.set(comandoInfo.config.nome, new Collection())
      if(!message.author ? message.user.id:message.author.id !== '395995293436477442') {
      const now = Date.now()
      const timestamps = cooldowns.get(comandoInfo.config.nome)
      const cooldown = (comandoInfo.config.cooldown || 0) * 1000

      if (timestamps.has(!message.author ? message.user.id:message.author.id)) {
        const expirationTime = timestamps.get(!message.author ? message.user.id:message.author.id) + cooldown;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message
              .reply(`você precisa esperar mais ${timeLeft.toFixed(1)} segundo(s) até poder usar esse comando novamente.`)
              .then(msg => msg.delete({ timeout: timeLeft * 1000 }).catch(e => console.log('Ocorreu um erro tentando apagar a mensagem do bot.')))
              .catch(e => console.log('Ocorreu um erro tentando enviar a mensagem no chat.'))
        }
      }

      timestamps.set(!message.author ? message.user.id:message.author.id, now)
      setTimeout(() => timestamps.delete(!message.author ? message.user.id:message.author.id), cooldown)
    }
    const canal = client.channels.cache.get('833009933796507659')
    const embed = new MessageEmbed()
    .setTitle('Kinny logs')
    .setDescription(`Nome: ${message.author.username} \nID do user: ${!message.author ? message.user.id:message.author.id}\nGrupo: ${message.guild.name}\nID do grupo: ${message.guild.id} \nCanal: ${message.channel.name}\nComando: k.${comandoInfo.config.nome} ${args.join(" ")}`)
    canal.send({embeds: [embed]})
      comandoInfo.run(client, message, args)
    } else {
      const cmd = await db.sets.find({id: message.guild.id})
      if(cmd) {
          if(cmd.map(x => x.command).some(e => message.content.toLowerCase().includes(e))) {
             const cmda = await db.sets.findOne({command: message.content.toLowerCase().replace(prefixo.prefix.toLowerCase(), '')})
             return message.reply(cmda.reply)
          }
      }
      const levenshtein = (src, target) => {
          const res = [];
          let i, j;

          for (i=0; i<=src.length; i++)
              res.push([i]);

          for (j=1; j<=target.length; j++)
              res[0].push(j);

          for (i=1; i<=src.length; i++) {
              for (j=1; j<=target.length; j++) {
                  res[i].push(0);

                  if (src[i-1] === target[j-1]) {
                      res[i][j] = res[i-1][j-1];
                  }else {
                      let min = Math.min(
                          res[i-1][j] + 1,
                          res[i][j-1] + 1
                      );

                      min = Math.min(
                          min,
                          res[i-1][j-1] + 1
                      );
                      res[i][j] = min;
                  }
              }
          }
          return res[src.length][target.length];
      }
      let cmds = [];

      client.commands.forEach(cmd => {
          cmds.push(cmd.config.nome);
          if (cmd.config.aliases) cmds = cmds.concat(cmd.config.aliases);
      });

      let sugestao = '';
      let levDistanceLevel = Infinity;

      cmds.forEach(cmd => {
          const levDistance = levenshtein(comando, cmd);
          if (levDistance < levDistanceLevel) {
              sugestao = cmd;
              levDistanceLevel = levDistance;
          }
      });
      const embed = new MessageEmbed()
          .setColor('#9900f8')
          .setDescription(`<:bug:801198221087080449> O comando **${prefix}${comando}** não foi encontrado! Veja se esse comando realmente existe! Acho que você quis dizer **${prefix}${client.commands.get(sugestao).config.categoria === 'developer' ? "8ball":sugestao}**`)

      message.reply({embeds: [embed]})
    }
}
