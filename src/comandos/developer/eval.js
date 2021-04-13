const {token} = require('../../../config.json')
const { inspect } = require('util')
const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const sourcebin = require('sourcebin');
module.exports = {
    config: {
        nome: 'eval'
    },
    run: async (client, message, args) => {
        if (!['395995293436477442', '411619431051952139'].includes(message.author.id)) {
            const body = {
                content: 'Que lindo né? Tentando usar meu eval, só meu dono pode usar!',
                message_reference: {
                    message_id: message.id,
                    channel_id: message.channel.id,
                    guild_id: message.guild.id
                }
            }
            require('node-fetch')(`https://discord.com/api/v8/channels/${message.channel.id}/messages`, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${token}`
                }
            })
        } else {
            const input = args.join(" ");
            if(!input) return message.reply(`${client.user.username} - Erro \n Adicione algo!`)
            try {
                let output = await eval(input);
                let outputt = typeof(eval(input));
                if(typeof output !== "string") output = inspect(output);

                if(output.length >= 1024) {
                    sourcebin.create([
                        {
                            name: 'eval',
                            content: `${inspect(eval(input), { depth: 0 })}`,
                            languageId: 'JSON'
                        }
                    ], {
                        title: 'Eval Kinny BOT',
                    }).then(eva => {
                        const embed = new MessageEmbed()
                            .setColor('#FF00CD')
                            .setTitle('EVAL')
                            .addField('Entrada', `\`${input}\``)
                            .addField('Saida', `\`${eva.short}\``)
                            .addField('Tipo', `\`${outputt}\``)
                        message.channel.send(embed)
                    }).catch(console.error);
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF00CD')
                        .setTitle('EVAL')
                        .addField('Entrada', `\`${input}\``)
                        .addField('Saida', `\`${output.replace(config.token, '***')}\``)
                        .addField('Tipo', `\`${outputt}\``)
                    message.channel.send(embed)
                }
            } catch (error) {
                message.channel.send(`**Seu eval está com erro veja!:**\n\`${error}\``);
            }

        }
    }
}