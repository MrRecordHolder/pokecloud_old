const Discord = require("discord.js")
const times = require("../../../data/times.json")

exports.run = (bot, message) => {
    // require guildSettings
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const errors = require(`../../../responses/${serverlanguage}/errors/general.json`)
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    // build embed
    var ADMIN = new Discord.RichEmbed()
        ADMIN.setColor(errors.color)
        ADMIN.setAuthor(errors.code.zero, errors.image)
        ADMIN.setTitle(errors.response.permission.role.a + " `" + adminrole + "` " + errors.response.permission.role.b)
    return message.channel.send({embed: ADMIN}).then(deleteIT => {
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