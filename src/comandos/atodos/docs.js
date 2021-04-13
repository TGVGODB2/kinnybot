const fetch = require("node-fetch")

module.exports = {
    config: {
        nome: 'docs',
        cooldown: 10,
        
    },
    run: async(client, message, args) => {
        const query = args.join(" ")
        if (!query) {
            return message.reply("Digite sua pesquisa!")
        }
        fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`)
            .then(res => res.json())
            .then(json => {
                message.quote({ embed: json }).catch(() => message.reply("não achei nenhum resultado para sua pesquisa."))
            })
    }
}