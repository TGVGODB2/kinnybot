const { MessageEmbed } = require('discord.js')
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'piada',
        cooldown: 10,
    },
    run: async(client, message, args) => {
        const lan = await db.lgs.findOne({guildID: message.guild.id})
        if(!lan) {
  let piadas =  [
      "O que o pintinho falou para sua mãe? \n \n R: Piu!",
     "Oi meu nome é Jaqueline, eu tenho 12 anos e já namoro \n Já o que? \n Queline",
     "O que o pagodeiro foi fazer na igreja? \n \n R: Ele foi cantar pá god",
     "O que acontece quando chove na inglaterra? \n \n R: Ela vira Iglalama",
     "Por que a galinha queria ir na igreja? \n \n R: Para ver a missa do galo",
     "Duas formigas japonesas se encontraram: \n \n --Oi como você se chama \n --Fu \n -- Fu o que? \n -- Fu miga. E você? \n --Ota \n --Ota o que? \n --Ota fumiga!",
     "Uma familia ficou perdida no deserto por 80 dias. Eles encontram um rio e atodos tomam banho, menos ávo. Qual nome do filme? \n \n R: A vó Ta Imunda a 80 dias.",
     "O que o sal disse para a batata frita? \n \n R: E nois na frita",
     "Um mineiro e um gringo envolveram em um acidente de carro e o gringo foi falar com outro rapaz: \n \n --Hello \n \n O Mineiro irritado disse \n \n Relô nada. Amassô foi tudo!",
     "Antes da chuva eu lutava capoeira \n Agora depois da chuva luto combarro!",
     "Qual cereal favorito do vampiro? \n \n R: Aveia!",
     "Sabe o que o rato diz quando se queima? \n \n R: Nossa mickey mei",
     "Um senhor chega a um restaurante e chama o garçom: \n \n — Olá, meu nome é Djalma e eu queria um suco de laranja. \n \n O garçom, sem entender, pergunta: \n \n — De que? \n \n — Djalma!",
    "Qual foi a primeira vez que os americanos comeram carne? \n \n R: Quando chegou Cristovão COM LOMBO."

        ]
        const random = piadas[Math.floor(Math.random() * piadas.length)];
 const embed = new MessageEmbed()
     .setColor('#9900f8')
     .setTitle(`${client.user.username} - Diversão`)
     .addField('Você quer uma piada? Acabou de sair do forno essa', random)
     .setFooter(`Comando executado por ${message.author.username} (O Comando possui ${piadas.length} piadas!)`, message.author.displayAvatarURL({dynamic: true}))
       message.quote(embed)
        } else {
            let piadas =  [
                "What did the chick say to his mother? \n \n R: Tweet!",
               "Hi my name is Jaqueline, I am 12 years old and already dating \n Already what? \n Queline",
               "What did the pagodeiro do in the church? \n \n R: He went to sing god",
               "What happens when it rains in england? \n \n R: She becomes Iglalama",
               "Why did the chicken want to go to church? \n \n R: To see the mass of the cock",
               "Two Japanese ants met: \n \n --Hi what do you call yourself \n --Fu \n - Fu what? \n - Fu miga. Is that you? \n --Ota \  --Ota what? \n --Oh smoke!",
               "A family is lost in the desert for 80 days. They find a river and everyone bathes, less water. What movie name? \n \n R: Grandma Ta Imunda for 80 days.",
               "O que o sal disse para a batata frita? \n \n R: E nois na frita",
               "Um mineiro e um gringo envolveram em um acidente de carro e o gringo foi falar com outro rapaz: \n \n --Hello \n \n O Mineiro irritado disse \n \n Relô nada. Amassô foi tudo!",
               "Antes da chuva eu lutava capoeira \n Agora depois da chuva luto combarro!",
               "Qual cereal favorito do vampiro? \n \n R: Aveia!",
               "Sabe o que o rato diz quando se queima? \n \n R: Nossa mickey mei",
               "Um senhor chega a um restaurante e chama o garçom: \n \n — Olá, meu nome é Djalma e eu queria um suco de laranja. \n \n O garçom, sem entender, pergunta: \n \n — De que? \n \n — Djalma!",
              "Qual foi a primeira vez que os americanos comeram carne? \n \n R: Quando chegou Cristovão COM LOMBO."
          
                  ]
                  const random = piadas[Math.floor(Math.random() * piadas.length)];
                  const embed = new MessageEmbed()
                      .setColor('#9900f8')
                      .setTitle(`${client.user.username} - Diversão`)
                      .addField('Do you want a joke? Just came out of the oven this', random)
                      .setFooter(`Comando executado por ${message.author.username} (Command has ${piadas.length} jokes!)`, message.author.displayAvatarURL({dynamic: true}))
                        message.quote(embed)
        }
    }
}