const {token} = require('../../../config.json')
const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const shell = require('shelljs');
module.exports = {
    config: {
        nome: 'sh'
    },
    run: async (client, message, args) => {
        if (!['395995293436477442', '425775842371829760'].includes(!message.author ? message.user.id:message.author.id)) return message.reply('Que lindo né usando meu shell? So meu dono pode usar!')
        if(!args[0]) return message.reply('Digite o que quer executar no console!')
        if(shell.exec(args.join(" ")).stdout.length === 0) {
            return message.reply(` \`\`\`${shell.exec(args.join(" ")).stderr.replace('NzUwMzg0MDE0Mzg4NDk0Mzc2.X05vkg.vVftZt7VJHo_0Z9UvuvG3K_kfj4', '***')}\`\`\` `)
        }
        message.reply(` \`\`\`${shell.exec(args.join(" ")).stdout}\`\`\` `)
    },
}