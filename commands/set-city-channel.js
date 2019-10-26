module.exports.command = {
    name: "set-city-channel",
    aliases: ["scc"],
    description: "Set the servers city channel using the id of the channel. This ensures accuracy and allows you to change the channel name at any time. A city channel is a sub nest channel used to list all nests for one area your server covers (if the server has area based channels).",
    category: "Server Settings",
    usage: "<number> <channel id>",
    example: "1, 000000000000000000",
    permission: "**Server:** Administrator | **Channel:** Admin",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#set-nest-channel",
    arguments: ""
}

const Discord = require("discord.js")
const times = require("../util/data/times.json")

exports.run = (bot, message, args) => {
    const language = bot.guildSettings.get(message.guild.id, 'language')
    const errors = require(`../util/responses/${language}/errors/general.json`)
    const success = require(`../util/responses/${language}/success/general.json`)

    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')

    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')

    let mainserver = require(`../util/data/server.json`)
    if(!bot.guilds.get(mainserver.home.id).members.get(message.author.id).roles.some(role => role.id === mainserver.patreon.supporter)) {
    var patreon = new Discord.RichEmbed()
            .setColor(errors.color)
            .setAuthor("Error", errors.image)
            .setTitle("Must be a Patreon supporter to use this feature")   
        return message.channel.send({embed: patreon})
        .then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    }

    // admin role check
    if (!message.member.roles.some(role => role.name === adminrole)) {
        let checkrole = require(`../util/runs/errors/permissions/admin.js`);
        return checkrole.run(bot, message);
    };

    // require guildSettings
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')

    // check for admin channel
    if(message.channel.id !== adminchannel) {
        let channelcheck = require(`../util/runs/errors/channels/admin.js`);
        return channelcheck.run(bot, message);
    };

    // generate channel id
    let output = args.join(" ").trim().split(",")

    // require guildSettings
    serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    // require per language responses
    basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)
    nestLanguageSuccess = require(`../util/responses/${serverlanguage}/success/setdata.json`)

    if(output[0] === undefined) {
        var norole = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(errors.response.permission.citychannel)  
        return message.channel.send({embed: norole}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }

    if(!output[1]) {
        if(output[0] === "One" || output[0] === "1") {
            bot.guildSettings.set(message.guild.id, "", "channels.city.one")
        }

        if(output[0] === "Two" || output[0] === "2") {
            bot.guildSettings.set(message.guild.id, "", "channels.city.two")
        }
        // specified channel not found
        var nochannel = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(errors.response.permission.nochannelfound)    
        return message.channel.send({embed: nochannel}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }
    
    let citychannelid = output[1].trim();
    let findchannel = message.guild.channels.find(x => x.id == citychannelid);
    if(findchannel) {
        if(output[0] === "One" || output[0] === "1") {
            bot.guildSettings.set(message.guild.id, citychannelid, "channels.city.one")
        }

        if(output[0] === "Two" || output[0] === "2") {
            bot.guildSettings.set(message.guild.id, citychannelid, "channels.city.two")
        }
        
        var embed = new Discord.RichEmbed()
            .setAuthor(success.code.zero, success.image)
            .setColor(success.color)
            .setTitle(nestLanguageSuccess.channelID.city.title.a)
            .setDescription(`<#${citychannelid}>`)
        message.channel.send({embed: embed}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        }); 
    }
}