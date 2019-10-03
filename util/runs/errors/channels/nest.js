const Discord = require("discord.js")

const errors = require("../../../data/errors.json")
const times = require("../../../data/times.json")

exports.run = (bot, message) => {

    // require guildSettings
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    // determine language response
    const language = require(`../../../responses/${serverlanguage}/permissions/channels.json`)
    // build embed
    var ADMIN = new Discord.RichEmbed()
        ADMIN.setColor(errors.color)
        ADMIN.setAuthor(language.admin.author.text, errors.image)
        ADMIN.setTitle(language.admin.title.a)
        ADMIN.setDescription("🔰 <#" + nestchannel + ">")
    return message.channel.send({embed: ADMIN}).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else { // if clean replies is false and current channel is the nest channel
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {
                    console.log(err + "\nerrors -> channels -> nest.js")
                });
            };
        };
    });
}; 