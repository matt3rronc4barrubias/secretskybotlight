const Discord = require("discord.js");
const botconfig = require("../botconfig");
let purple = botconfig.purple;
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {

  let xUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!xUser) return message.reply("Couldn't find them yo");

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
  }
  let curxp = xp[xUser.id].xp;
  let curlvl = xp[xUser.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(purple)
  .addField("XP Stats of:", `<@${xUser.id}>`)
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed);

 
}

module.exports.help = {
  name: "xp"
}
