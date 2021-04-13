const { Manager } = require("erela.js");
module.exports = async (client) => {
  client.manager.init(client.user.id)
  console.log(`\nO bot ${client.user.tag} foi ligado com sucesso!\n`)
  setInterval(() => {
  const status = [
    {
      type: 'PLAYING',
      message: 'Venha para Witch Hosting e seja feliz!',
      url: 'https://www.twitch.tv/sla'
    },
    {
      type: 'STREAMING',
      message: 'Obrigado por ter a Kinny em seu servidor!',
      url: 'https://www.twitch.tv/sla'
    },
    {
      type: 'WATCHING',
      message: `Agora eu estou em ${client.guilds.cache.size} servidores!`,
      url: 'https://www.twitch.tv/sla'
    },
  ]
  const random = status[Math.floor(Math.random() * status.length)];
  client.user.setActivity(random.message, { type: random.type, url: random.url, browser: 'Discord IOS' });
}, 6000)
}