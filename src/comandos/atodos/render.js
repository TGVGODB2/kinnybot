const puppeteer = require('puppeteer')
const { MessageAttachment, MessageEmbed } = require('discord.js')
const fs = require('fs')
module.exports = {
    config: {
        nome: 'render',
        aliases: ['site', 'versite'],
        cooldown: 10,
        options: [{
            name: 'url',
            type: 'STRING',
            description: 'URL do site que deseja renderizar!',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        if(!args[0] && !message.options.getString('url')) return message.reply(`${client.user.username} Erro \nDigite a URL do site!`)
        let url = !args[0].startsWith('http') ? 'http://' + args[0]:args[0]
        if(!message.author ? message.user.id:message.author.id !== require('../../../config.json').creatorid) {
            if(!message.channel.nsfw) {
                return message.reply(`${client.user.username} Erro \nApenas no canal NSFW!`)
            }
        }
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        message.reply('Tentando abrir o navegador').then(async editar => {
        await page.goto(url).catch(error => {
            editar.edit('Não foi possivel renderizar essa página')
        })
        editar.edit('Pagina carregada! Renderizando')
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
          });
        setTimeout(async () => {
        await page.screenshot({ path: './src/Canvas/img1.png' });
        const attachment = new MessageAttachment('./src/Canvas/img1.png');
        editar.delete()
        const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setDescription('**A pagina foi renderizada com sucesso!**')
        .setTitle(`${client.user.username} | Render`)
        .setImage(`attachment://img1.png`)
        message.reply({files: [attachment], embed})
        await browser.close();
        fs.unlinkSync('./src/Canvas/img1.png')
        }, 5000)
    })

    }
}