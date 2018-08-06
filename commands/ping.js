const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


message.channel.send(`Latency is ${message.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(Client.ping)}ms`)




}


module.exports.help = {
    name: "ping"
  }