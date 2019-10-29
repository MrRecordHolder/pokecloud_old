module.exports.command = {
    name: "set-migration-date",
    aliases: ["smd"],
    description: "Set this servers next migration date.",
    category: "Migration",
    usage: "<month>, <day>",
    example: "12, 1",
    permission: "**Role:** Admin | **Channel:** Nest",
    link: "https://github.com/MrRecordHolder/pokecloud/wiki/All-Commands#set-migration-date--smd",
    arguments: ""
}

const Discord = require("discord.js")

const errors = require("../util/data/errors.json")
const success = require("../util/data/success.json")
const caution = require("../util/data/caution.json")
const times = require("../util/data/times.json")
const migrations = require("../util/data/migrations.json")

exports.run = (bot, message, args) => {
    
    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')


    // admin role check
    if (!message.member.roles.some(role => role.name === adminrole)) {
        let checkrole = require(`../util/runs/errors/permissions/admin.js`);
        return checkrole.run(bot, message); 
    };

    // require guildSettings
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')

    // check for admin & nest channel
    if(message.channel.id !== adminchannel && message.channel.id !== nestchannel) {
        let channelcheck = require(`../util/runs/errors/channels/nestadmin.js`);
        return channelcheck.run(bot, message);
    };

    // require guildSettings
    const timezone = bot.guildSettings.get(message.guild.id, 'location.timezone')

    // ensure timezone is set
    if(timezone === "") {
        var TIMEZONE = new Discord.RichEmbed()
            TIMEZONE.setAuthor("Error", errors.image)
            TIMEZONE.setColor(errors.color)
            TIMEZONE.setTitle("The timezone for this server has not been set yet")
        return message.channel.send({embed: TIMEZONE}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    };

    // assign & split args
    let output = args.join(" ").trim(" ").split(",")
    var newMonth = output[0]
    var newDay = output[1]

    // format date
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // create current date
    var now = new Date();
    now.setMonth(newMonth - 1)
    now.setDate(newDay)

    // require guildSettings
    const migmsgid = bot.guildSettings.get(message.guild.id, 'migration.messageid')
    const lmigdate = bot.guildSettings.get(message.guild.id, 'migration.dates.last')

    const migrationTime = require(`../util/data/migrations/${timezone}`)

    let newFullDate = days[now.getDay()] + " " + months[now.getMonth()] + ", " + now.getDate() + " at " + migrationTime.time
    bot.guildSettings.set(message.guild.id, newFullDate, 'migration.dates.next')

    // fetch & edit migration details message
    bot.channels.get(nestchannel).fetchMessage(migmsgid).then(editEmbed => {
        const { RichEmbed } = require ('discord.js');
        const embed = new RichEmbed (editEmbed.embeds[0])
            embed.fields.length = 0
            embed.addField("Dates", `◀ **Last Migration:** ${lmigdate}\n▶ **Next Migration:** ${newFullDate}`)
        editEmbed.edit(embed)
    }).catch(err => {
         // if nest is not listed
    });

    // send confirmation message
    var confirm = new Discord.RichEmbed()
        .setAuthor("Success", success.image)
        .setColor(success.colors)
        .setTitle("Next migration date set to:")
        .setDescription("**" + newFullDate + "**")
    return message.channel.send({embed: confirm}).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        }
    });
}