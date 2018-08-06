const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    let replies = ["You won!", "You fell right into the void.", "You got headshot by a bow.", "You got destroyed by a dragon!", "You accidentally drank a poison potion!", "You got killed by a hacker!", "You got snowballed!", "You apparently block clutched and survived!",
"You got full leather armor and won! WHAT A GODDD", "Your 200IQ Plays betrayed you! You lost.", "You fall for your own trap!", "You managed to win the game in 1 minute! GODLY MOVES", "Your wifi got disconnected and you lost. Stupid Wifi.", "Suddenly your mouse and keyboard disconnected and you lost.",
"You clicked 1CPS and won!", "You managed to get a KB 1000 Rod and you hit yourself with it and you lost!", "It was Doom and you managed to win in 1 second remaining! WOAHH"];

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

