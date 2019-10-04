const Discord = require("discord.js")

const errors = require("../../../data/errors.json")
const times = require("../../../data/times.json")

exports.run = (bot, message) => {

    // require guildSettings
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')
    // determine language response
    const language = require(`../../../responses/${serverlanguage}/permissions/channels.json`)
    // build embed
    var NEST = new Discord.RichEmbed()
        NEST.setColor(errors.color)
        NEST.setAuthor(language.admin.author.text, errors.image)
        NEST.setTitle(language.nest.title.a)
        NEST.setDescription("🔐<#" + adminchannel + "> 🔰 <#" + nestchannel + ">" + language.nest.title.b)
    return message.channel.send({embed: NEST}).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else { // if clean replies is false and current channel is the nest channel
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {
                    console.log(err + "\nerrors -> channels -> nestadmin.js")
                });
            };
        };
    });
}; 