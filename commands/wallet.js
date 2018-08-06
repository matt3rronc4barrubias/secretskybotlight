const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  //!coins
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!uUser) return message.reply("Couldn't find them yo");
  let uCoins = coins[uUser.id].coins;


  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("#00FF00")
  .setThumbnail("https://i.imgur.com/12tihoc.jpg")
  .addField("Balance of:", `<@${uUser.id}>`)
  .addField("Coins:", `${uCoins}`)
  .addField("Bank Balance:", "0")
  .setFooter("Requested by:")
  .setFooter(message.author.username, message.author.avatarURL)
  .setTimestamp();

  message.channel.send(coinEmbed);

}

module.exports.help = {
  name: "wallet"
}