const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  let warnlevel = warns[wUser.id].warns;

  let warnEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setThumbnail("https://orig00.deviantart.net/507e/f/2008/048/2/e/fbi_warning_invader_zim_by_invaderjacky.jpg")
  .addField("Warnings/Infractions of:", `<@${wUser.id}>`)
  .setColor("#cc0000")
  .addField("Amount of warnings:", `${warnlevel}`)
  .setFooter(message.author.id, message.author.avatarURL)
  .setTimestamp();
  
  
  message.channel.send(warnEmbed);

}

module.exports.help = {
  name: "warnings"
}


//let warnEmbed = new Discord.RichEmbed()
//.setAuthor(message.author.id)
//.setDescription("Warnings/Infractions")
//.setColor("#cc0000")
//.addField("Warnings", `${warnlevel}`)
//.addField("Warning stats for", `<@${wUser.id}>`)


//message.channel.send(warnEmbed);
