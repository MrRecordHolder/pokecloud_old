const Discord = require("discord.js")
const times = require("../../data/times.json")
const errors = require("../../data/errors.json")

exports.run = (bot, message) => {
    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    const prefix = bot.guildSettings.get(message.guild.id, 'prefix')
    // require per language responses
    const language = require(`../../responses/${serverlanguage}/commands/missingnestNP.json`)
    // list the migration message    
    var embed = new Discord.RichEmbed()
        .setAuthor("Error", errors.image)
        .setColor(errors.color)
        .setTitle(language.title.a)     
        .addField(language.field.one.title, "```" + prefix + commandalias + " " + commandusage + "```")
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
}