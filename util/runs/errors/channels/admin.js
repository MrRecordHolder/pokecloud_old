const Discord = require("discord.js")
const times = require("../../../data/times.json")

exports.run = (bot, message) => {

    // require guildSettings
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const errors = require(`../../../responses/${serverlanguage}/errors/general.json`)
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')
    // build embed
    var NEST = new Discord.RichEmbed()
        NEST.setColor(errors.color)
        NEST.setAuthor(errors.code.zero, errors.image)
        NEST.setTitle(errors.response.permission.channel)
        NEST.setDescription("🔐<#" + adminchannel + ">")
    return message.channel.send({embed: NEST}).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else { // if clean replies is false and current channel is the nest channel
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {
                    console.log(err + "\nerrors -> channels -> admin.js")
                });
            };
        };
    });
}; 