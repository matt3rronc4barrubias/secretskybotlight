const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    let replies = ["You won!", "You fell right into the void.", "You got headshot by a bow.", "You got destroyed by a dragon!", "You accidentally drank a poison potion!", "You got killed by a hacker!"];

    let result = Math.floor((Math.random() * replies.length));

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#FF9900")
    .addField("Result:", replies [result]);

    message.channel.send(ballembed);


    }


    module.exports.help = {
        name: "play_skywars"
    }

