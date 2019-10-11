const Discord = require("discord.js")
const times = require("../../../data/times.json")

exports.run = (bot, message) => {
    // require guildSettings
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    // determine language response
    const errors = require(`../../../responses/${serverlanguage}/errors/general.json`)    
    // build embed
    var embed = new Discord.RichEmbed()
        embed.setColor(errors.color)
        embed.setAuthor(errors.code.zero, errors.image)
        embed.setTitle(pokemonName + " " + errors.respose.three)
    return message.channel.send({embed: embed}).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else { // if clean replies is false and current channel is the nest channel
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {
                    console.log(err + "\nerrors -> permissions -> admin.js")
                });
            };
        };
    });
}; 