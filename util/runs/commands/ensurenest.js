const Discord = require("discord.js")
const times = require("../../data/times.json")

exports.run = (bot, message) => {
    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const errors = require(`../../responses/${serverlanguage}/errors/general.json`)
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    // list the migration message    
    var embed = new Discord.RichEmbed()
        .setAuthor(errors.code.zero, errors.image)
        .setColor(errors.color)
        .setTitle(nestName + " " + errors.response.one)     
    return message.channel.send(embed).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else { // if clean replies is false and current channel is the nest channel
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {
                    console.log(err + "\nerrors -> permissions -> ensurenest.js")
                });
            };
        };
    });
}