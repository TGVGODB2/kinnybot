module.exports = {
    config: {
        nome: "grau",
        cooldown: 9
    },
    run: async(client, message, args) => {
        const escolha = args.join(" ").toLowerCase()
        if(!escolha) return message.reply('Use grau <moto/bike>')
        if(!['bike', 'moto'].includes(escolha)) return message.reply('Isso não está na lista! use: grau <moto/bike>')
        if(escolha === 'bike') {
            message.reply('<:bike_andando:816293573322211358>').then(editar => {
                setTimeout(() => {
                    editar.edit('⠀⠀<:bike_andando:816293573322211358>')
                }, 2000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀<:bike_andando:816293573322211358>')
                }, 4000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀⠀<:bike_subindodescendo:816293573027692586>')
                }, 6000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀⠀⠀⠀<:bike_empinada:816293573367824385>')
                }, 8000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀⠀⠀⠀⠀⠀<:bike_subindodescendo:816293573027692586>')
                }, 10000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<:bike_pneuestourado:816293573179867138>')
                }, 12000)
                setTimeout(() => {
                    editar.edit('Vixi pneu estourou :(')
                }, 14000)
            })
        } else if(escolha === 'moto') {
            message.reply('<:moto_andando:816293573023760425>').then(editar => {
                setTimeout(() => {
                    editar.edit('⠀⠀<:moto_andando:816293573023760425>')
                }, 2000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀<:moto_andando:816293573023760425>')
                }, 4000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀⠀<:motoka_decsendo:816293573158895650>')
                }, 6000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀⠀⠀⠀<:motoka_enpinada:816293573359173662>')
                }, 8000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀⠀⠀⠀⠀⠀<:motoka_decsendo:816293573158895650>')
                }, 10000)
                setTimeout(() => {
                    editar.edit('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<:moto_andando:816293573023760425>')
                }, 12000)
                setTimeout(() => {
                    editar.edit('NICE!')
                }, 14000)
            })
        }
    }
}