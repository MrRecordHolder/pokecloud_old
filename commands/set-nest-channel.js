module.exports.command = {
    name: "set-nest-channel",
    aliases: ["snc"],
    description: "Set the servers active nest channel. Requires the id of the channel to ensure accuracy.",
    category: "Server Settings",
    usage: "<channel id>",
    example: "000000000000000000",
    permission: "**Server:** Administrator | **Channel:** Admin",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#set-nest-channel",
    arguments: ""
}

const Discord = require("discord.js")
const times = require("../util/data/times.json")

exports.run = (bot, message, args) => {
    const language = bot.defaultNest.get(message.guild.id, 'language')
    const errors = require(`../util/responses/${language}/errors/general.json`)
    const success = require(`../util/responses/${language}/success/general.json`)

    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')

    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')

    // admin role check
    if (!message.member.roles.some(role => role.name === adminrole)) {
        let checkrole = require(`../util/runs/errors/permissions/admin.js`);
        return checkrole.run(bot, message);
    };

    // require guildSettings
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')

    // require guildSettings
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')

    // check for admin channel
    if(message.channel.id !== adminchannel) {
        let channelcheck = require(`../util/runs/errors/channels/admin.js`);
        return channelcheck.run(bot, message);
    };

    // generate channel id
    let output = args.join(" ").trim(" ")

    if(output === undefined) {
        var norole = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(`Must provide the channel id to set`)    
        return message.channel.send({embed: norole}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }
    
    let findchannel = message.guild.channels.find(x => x.id == output);
    if(findchannel) {
        bot.guildSettings.set(message.guild.id, output, "channels.nest")
        var embed = new Discord.RichEmbed()
            .setAuthor(success.code.zero, success.image)
            .setColor(success.color)
            .setTitle(`This community's nest channel is now set to:`)
            .setDescription(`<#${output}>`)
        message.channel.send({embed: embed}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        }); 
    } else {
        // specified channel not found
        var nochannel = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(`That channel does not exist on this server`)    
        return message.channel.send({embed: nochannel}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    } 
}