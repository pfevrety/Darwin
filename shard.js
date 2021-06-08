const config = require('./config.json');
const logger = require('./utils/logger');
const Discord = require('discord.js');
const Statcord = require("statcord.js");
const { token } = require('./utils/variables.js');


const manager = new Discord.ShardingManager('./index.js', { token: token});


// Create statcord sharding client
const statcord = new Statcord.ShardingClient({
  key: "statcord.com-HT7EoM6txEHbDVZByYZN",
  manager,
  postCpuStatistics: true, /* Whether to post CPU statistics or not, defaults to true */
  postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
  postNetworkStatistics: true, /* Whether to post memory statistics or not, defaults to true */
  autopost: true /* Whether to auto post or not, defaults to true */
});

// Spawn shards, statcord works with both auto and a set amount of shards
manager.spawn();

// Normal shardCreate event
manager.on("shardCreate", (shard) => {
  console.log(`Spawned shard ${shard.id}`);
});

statcord.on("autopost-start", () => {
  // Emitted when statcord autopost starts
  console.log("Started autopost");
});

statcord.on("post", status => {
  // status = false if the post was successful
  // status = "Error message" or status = Error if there was an error
  if (!status) console.log("Successful post");
  else console.error(status);
});