const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;


fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Coudn't find commands.");
      return;

    }

    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
       console.log(`${f} loaded!`);
       bot.commands.set(props.help.name, props);

    });
});

bot.on("ready", async () => {
    console.log("Bot is active.");
    bot.user.setActivity('SkyLight | /help', { type: 'WATCHING' }); //Whatever game you want the bot to be playing here.
    //Don't ever use Client.user.SetGame - Its depricated
});

bot.on("message", message => {   
    
let prefix = botconfig.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message,args);

    if(cmd === `${prefix}help`){
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL,
      // Lol this wouldn't work idk | Try looking at the documentation //      icon_url: client.user.avatarURL
            },
            title: "Commands Help For SkyLight Rebirth",
            url: "http://google.com",
            description: "Commands Help for SkyLight Bot!",
            fields: [{
                name: "/help",
                value: "Sends help message to user."
              },
              {
                name: "/play_skywars",
                value: "Play some skywars and win if you can!"
              },
              {
                name: "/play_bedwars",
                value: "Play some  bedwars and win if you can!"
              },
              {
                name: "/warn [user] [reason]",
                value: "Warn a user - Staff Use Only"
              },
              {
                name: "/invite",
                value: "Server Discord Invite."
              },
              {
                name: "/warnings [user]",
                value: "Calculates how much warnings that user has."
              },
              {
                name: "/kick [user] [reason]",
                value: "Kick People - Staff Use Only"
              },
              {
                name: "/ban [user] [reason]",
                value: "Ban People - Staff Use Only"
              },
              {
                name: "/suggestion [suggestion]",
                value: "Make suggestions for us to make!"
              },
              {
                name: "/ping",
                value: "Pong!"
              },
              {
                name: "/xp [user] or /level [user]",
                value: "Check your XP or other's XP!"
              },
              {
                name: "/statistics",
                value: "Bot Statistics!"
              },
              {
                name: "/transfer [user]",
                value: "Transfer coins to other players!"
              },
              {
                name: "/bal [user] or /balance [user] or /wallet [user]",
                value: "Check your coins balance or other's coins balance!"
              },
              {
                name: "/clear [amount of messages to be cleared]",
                value: "Clear Chat - Staff Only"
              },
              {
                name: "/mute [user] [optional-reason]",
                value: "Mute Players - Staff Only"
              },
              {
                name: "/serverstats",
                value: "SkyLight Server Statistics!"
              },
              {
                name: "/report [user] [reason]",
                value: "Report a user that has been breaking the rules, for staff to be alerted."
              },
              {
                name: "/play [song link or name]",
                value: "Play music directly to voice channel."
              },
              {
                name: "/stop",
                value: "Stop current song."
              },
              {
                name: "/picture",
                value: "Send random pictures."
              },
              {
                name: "/nsfw",
                value: "Sends random nsfw pictures."
              }


            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© xFlqshlight#8645 SkyLight Bot"
            }
          }   
    });
  }
	
	//How I fixed tagging channels
	// - Do <#SERVER_ID>
	
if(cmd === `${prefix}report`){

let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!rUser) return message.channel.send("Coudn't find user.");
let reason = args.join(" ").slice(22);

let reportEmbed = new Discord.RichEmbed()
.setDescription("Player Reports")
.setColor("#15f153")
.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
.addField("Reported By:", `${message.author} with ID: ${message.author.id}`)
.addField("Channel", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", reason);


message.channel.send(reportEmbed);
return;
}

if(cmd === `${prefix}kick`){

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Coudn't find user.");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't do that since you are not a staff member.");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Uhh, You can't kick a staff member.");
    
    
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kicked Player Report")
    .setColor("#15f163")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked By:", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("Kicked In:", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);
    
    message.guild.member(kUser).kick(kReason);
    message.channel.send(kickEmbed);
    return;
    }


    if(cmd === `${prefix}ban`){

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Coudn't find user.");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't do that since you are not a staff member.");
        if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Uhh, You can't kick a staff member.");
        
        
        let banEmbed = new Discord.RichEmbed()
        .setDescription("Kicked Player Report")
        .setColor("#15f163")
        .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
        .addField("Banned By:", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Banned In:", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
        
        message.guild.member(bUser).ban(bReason);
        message.channel.send(banEmbed);
        return;
        }

        if(!coins[message.author.id]){
            coins[message.author.id] = {
              coins: 0
            };
          }
        
          let coinAmt = Math.floor(Math.random() * 15) + 1;
          let baseAmt = Math.floor(Math.random() * 15) + 1;
          console.log(`${coinAmt} ; ${baseAmt}`);
        
          if(coinAmt === baseAmt){
            coins[message.author.id] = {
              coins: coins[message.author.id].coins + coinAmt
            };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log(err)
          });
          let coinEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username)
          .setColor("#0000FF")
          .addField("💰", `You have been given ${coinAmt} coins!`);
        
          message.channel.send(coinEmbed);
          }



let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup);
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  if(cmd === `${prefix}ping`){

  message.channel.send(`Pong! Latency is ${message.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`)

  return;
  }


});


bot.login(tokenfile.token)