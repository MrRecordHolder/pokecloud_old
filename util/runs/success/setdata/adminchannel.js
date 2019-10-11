const Discord = require("discord.js")
const times = require("../../../data/times.json")
const success = require("../../../data/success.json")

exports.run = (bot, message) => {
    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    // require per language responses
    const language = require(`../../../responses/${serverlanguage}/success/setdata.json`)
    // list the migration message    
    var embed = new Discord.RichEmbed()
        .setAuthor("Success", success.image)
        .setColor(success.color)
        .setTitle(language.channelID.admin.title.a)    
        .setDescription("<#" + adminchannel + ">")
    return message.channel.send(embed).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else { // if clean replies is false and current channel is the nest channel
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {
                    console.log(err + "\nerrors -> permissions -> missingnestN.js")
                });
            };
        };
    });
};