const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
})
 
app.listen(25565)
const shards = new ShardingManager('./bot.js', {
  respawn: true,
  totalShards: 'auto',
  token,
});

shards.on('shardCreate', (shard) => {
  console.log(`[SHARD] Iniciando a shard de id ${shard.id}`);
});

shards.spawn();