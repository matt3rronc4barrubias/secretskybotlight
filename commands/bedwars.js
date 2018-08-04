const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    let replies = ["You managed to broke all 4 beds and won!", "Your opponent god bridged to you and you lost!", "Your wifi got disconnected and you lost! Stupid Router.", "Your mom carries you and you won!", "The game glitched! TIE!",
"You managed to get a diamond sword and fell into the void! Bye bye sword.", "You fapped too much that you weren't paying attention to the game! Game Over!", "Your eyetracker broke! You lost the game!", "Your pro skills made you win!",
"You godbridged to them and you got their bed and won!", "You were hiding above your island and won!"];

    let result = Math.floor((Math.random() * replies.length));

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#FF9900")
    .addField("Result:", replies [result]);

    message.channel.send(ballembed);


    }


    module.exports.help = {
        name: "play_bedwars"
    }

