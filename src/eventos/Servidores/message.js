const { Collection, MessageEmbed } = require('discord.js')
const { prefix } = require("../../../config.json")
const cooldowns = new Collection()
const db = require('../../../db.js')
module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return
    const randomXP = Math.floor(Math.random() * 100)
    const user = await db.xps.findOne({userID: message.author.id}) || await db.xps.create({
        xp: 0,
        userID: message.author.id,
        guildID: message.guild.id,
        level: 0,
        channel: 0
    })

    function leveledUp(xp, level, differ) {
        return xp > level * differ
    }

    user.xp = user.xp + randomXP
    if (client.user === message.author) return;
    if (leveledUp(user.xp, user.level, 8000)) {
        user.level = user.level + 1
        let canal = await db.chan?.findOne({grupo: message.guild.id}) || message.channel.id
        let canal3 = message.guild.channels.cache.get(canal?.chanl || canal)
        canal3?.send(`${client.user.username} - Diversão \n Parabens \`${message.author.username}\`! Você chegou ao nivel ${user.level}`) || console.log("Não foi possivel mandar msg nesse canal! Ignorando")

    }
    user.xp = user.xp + randomXP
    user.save()
    const pra = await db.prefixs.findOne({
        id: message.guild.id
    })
    let pr = pra?.prefix || prefix
    if (message.content === `<@!${client.user.id}>` || message.content === '<@' + client.user.id + '>') {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.avatarURL())
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Apresentação`)
            .addField('Olá ser humano, eu me chamo Kinny!', 'Minha comida favorita é Bolo de cenoura, so de falar me da agua na boca')
            .addField(`Meu prefixo é ${pr}`, `Mas você pode trocar o prefixo usando ${pr}setprefix <novo prefixo>! <a:dance:798169339181531167>`)
            .addField('Eu fui projetado para ter uma diversão e utilidades!', 'Meu desenvolvedor é o <@395995293436477442>')
        message.channel.send(embed)
    }
    const prefixo = await db.prefixs.findOne({
        id: message.guild.id
    })
    if(prefixo) {
        const args = message.content.slice(prefixo.prefix.length).trim().split(/ +/g)
        const comando = args.shift().toLowerCase()
        if (!message.content.toLowerCase().startsWith(prefixo.prefix)) return
        let banira = await db.ban.findOne({punid: message.author.id})
        if (banira) return message.channel.send(`🇧🇷 Olá! Se você está vendo essa mensagem é porque você foi banido e não pode utilizar mais os comandos da Kinny! \n \n Motivo ${banira.motivo} \n🇺🇸 Hi! If you are seeing this message it is because you have been banned and can no longer use Kinny commands! \n \n Reason: ${banira.motivo}`)

        const comandoInfo = client.commands.get(comando) || client.commands.get(client.aliases.get(comando))

        if (comandoInfo) {
            if (!cooldowns.has(comandoInfo.config.nome)) cooldowns.set(comandoInfo.config.nome, new Collection())

            const now = Date.now()
            const timestamps = cooldowns.get(comandoInfo.config.nome)
            const cooldown = (comandoInfo.config.cooldown || 0) * 1000

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldown;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message
                        .reply(`Opa calma lá! Você precisa esperar ${timeLeft.toFixed(1)} segundo(s) até poder usar esse comando novamente. Ta muito apressadinho`)
                        .then(msg => msg.delete({timeout: timeLeft * 1000}).catch(e => console.log('Ocorreu um erro tentando apagar a mensagem do bot.')))
                        .catch(e => console.log('Ocorreu um erro tentando enviar a mensagem no chat.'))
                }
            }

            timestamps.set(message.author.id, now)
            setTimeout(() => timestamps.delete(message.author.id), cooldown)
                comandoInfo.run(client, message, args)

        }  else {
           const cmd = await db.sets.find({id: message.guild.id})
            if(cmd) {
                if(cmd.map(x => x.command).some(e => message.content.toLowerCase().includes(e))) {
                   const cmda = await db.sets.findOne({command: message.content.toLowerCase().replace(prefixo.prefix.toLowerCase(), '')})
                   return message.quote(cmda.reply)
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
                .setDescription(`<:bug:801198221087080449> O comando **${prefix}${comando}** não foi encontrado! Veja se esse comando realmente existe! Acho que você quis dizer **${prefixo.prefix}${sugestao}**`)

            message.channel.send(embed)
        }
    } else {
        if (!message.content.toLowerCase().startsWith(prefix)) return;
        let banira = await db.ban.findOne({punid: message.author.id})
        if (banira) return message.channel.send(`🇧🇷 Olá! Se você está vendo essa mensagem é porque você foi banido e não pode utilizar mais os comandos da Kinny! \n \n Motivo ${banira.motivo} \n🇺🇸 Hi! If you are seeing this message it is because you have been banned and can no longer use Kinny commands! \n \n Reason: ${banira.motivo}`)
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const comando = args.shift().toLowerCase()
        const comandoInfo = client.commands.get(comando) || client.commands.get(client.aliases.get(comando))
        if (comandoInfo) {
            if (!cooldowns.has(comandoInfo.config.nome)) cooldowns.set(comandoInfo.config.nome, new Collection())

            const now = Date.now()
            const timestamps = cooldowns.get(comandoInfo.config.nome)
            const cooldown = (comandoInfo.config.cooldown || 0) * 1000

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldown;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message
                        .reply(`Opa calma lá! Você precisa esperar ${timeLeft.toFixed(1)} segundo(s) até poder usar esse comando novamente. Ta muito apressadinho`)
                        .then(msg => msg.delete({timeout: timeLeft * 1000}).catch(e => console.log('Ocorreu um erro tentando apagar a mensagem do bot.')))
                        .catch(e => console.log('Ocorreu um erro tentando enviar a mensagem no chat.'))
                }
            }

            timestamps.set(message.author.id, now)
            setTimeout(() => timestamps.delete(message.author.id), cooldown)
                comandoInfo.run(client, message, args)
        }  else {
            const cmd = await db.sets.find({id: message.guild.id})
            if(cmd) {
                if(cmd.map(x => x.command).some(e => message.content.toLowerCase().includes(e))) {
                   const cmda = await db.sets.findOne({command: message.content.toLowerCase().replace(prefix.toLowerCase(), '')})
                   return message.quote(cmda.reply)
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
                .setDescription(`<:bug:801198221087080449> O comando **${prefix}${comando}** não foi encontrado! Veja se esse comando realmente existe! Acho que você quis dizer **${prefix}${sugestao}**`)

            message.channel.send(embed)
        }
    }
}