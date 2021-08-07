const {token} = require('../../../config.json')
const { inspect } = require('util')
const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const sourcebin = require('sourcebin');
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'eval'
    },
    run: async (client, message, args) => {
        if (!['395995293436477442', '425775842371829760'].includes(!message.author ? message.user.id:message.author.id)) {
            return message.reply('Que lindo né? Tentando usar meu eval, só meu dono pode usar!')
        
        } else {
            const input = args.join(" ");
            if(!input) return message.reply({content: `${client.user.username} - Erro \n Adicione algo!`})
            try {
                let output = await eval(input);
                let outputt = typeof(eval(input));
                if(typeof output !== "string") output = inspect(output);

                if(output.length >= 1024) {
                    sourcebin.create([
                        {
                            name: 'eval',
                            content: `${await inspect(eval(input), { depth: 0 })}`,
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
                        message.reply({embeds: [embed]}).then(reagir => {
                            reagir.react('🔒')
                            const filter = (reaction, user) => {
                                return reaction.emoji.name === '🔒' && user.id === !message.author ? message.user.id:message.author.id
                            };
                            
                            const collector = reagir.createReactionCollector({filter});
                            
                            collector.on('collect', (reaction, user) => {
                                reagir.delete()
                                message.reply('Eval fechado!')
                            });
                        })
                    }).catch(console.error);
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF00CD')
                        .setTitle('EVAL')
                        .addField('Entrada', `\`${input}\``)
                        .addField('Saida', `\`${output.replace(config.token, '***')}\``)
                        .addField('Tipo', `\`${outputt}\``)
                        message.reply({embeds: [embed]}).then(reagir => {
                            reagir.react('🔒')
                            const filter = (reaction, user) => {
                                return reaction.emoji.name === '🔒' && user.id === !message.author ? message.user.id:message.author.id;
                            };
                            
                            const collector = reagir.createReactionCollector({filter});
                            
                            collector.on('collect', (reaction, user) => {
                                reagir.delete()
                                message.reply('Eval fechado!')
                            });
                        })
                }
            } catch (error) {
                message.reply(`**Seu eval está com erro veja!:**\n\`${error}\``);
            }

        }
    }
}