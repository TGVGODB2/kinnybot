const { ShardingManager } = require('discord.js');
const { token, tokenc } = require('./config.json');
const colors = require('colors')
 
const shards = new ShardingManager('./bot.js', {
  respawn: true,
  totalShards: 'auto',
  token,
});

shards.on('shardCreate', (shard) => {
  console.log(`[SHARD] Iniciando a shard de id ${shard.id}`.green);
});

shards.spawn();