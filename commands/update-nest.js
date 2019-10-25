module.exports.command = {
    name: "update-nest",
    aliases: ["un"],
    description: "Update Information about a nest that was created by this community.",
    category: "Nest",
    usage: "<nest name>, <property>, <new value>",
    example: "hilton park, exgyms, 3",
    permission: "**Role:** Admin | **Channel:** Nest",
    link: "https://github.com/MrRecordHolder/pokecloud/wiki/All-Commands#update-nest--un",
    arguments: "`pokestops` | `gyms` | `exgyms` | `spawns` | `city` | `state` | `region` | `country` | `google` | `notes"
}

Discord = require("discord.js")
errors = require("../util/data/errors.json")

caution = require("../util/data/caution.json")
times = require("../util/data/times.json")
emoji = require("../util/data/emoji.json")

exports.run = (bot, message, args) => {

    userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    username = message.guild.member(user).displayName

    // require guildSettings
    serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    // require per language responses
    basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)
    success = require(`../util/responses/${serverlanguage}/success/general.json`)

    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')

    // admin role check
    if (!message.member.roles.some(role => role.name === adminrole)) {
        let checkrole = require(`../util/runs/errors/permissions/admin.js`);
        return checkrole.run(bot, message);
    };

    // split the args
    output = args.join(" ").trim(" ").split(",")

    //capitalize word function
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
 
    // generate new args
    nestName = capitalize_Words(output[0])

    // generate nest key
    nestKey = `${message.guild.id}-${nestName}`

    // require guildSettings
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')
    nestchannel = bot.defaultNest.get(nestKey, 'channel')

    // check for admin & nest channel
    if(message.channel.id !== adminchannel && message.channel.id !== nestchannel) {
        let channelcheck = require(`../util/runs/errors/channels/nestadmin.js`);
        return channelcheck.run(bot, message);
    };
 
    
 
    // require guildSettings
    prefix = bot.guildSettings.get(message.guild.id, 'prefix')
 
    // if no nest name
    if(!output[0]) {
        var embed = new Discord.RichEmbed()
            .setAuthor("Error", errors.image)
            .setColor(errors.color)
            .setTitle("Must provide the nest name, property to update and the new data value")
            .addField('Properties', this.command.arguments)
            .addField('Usage', "```" + prefix + this.command.aliases + " " + this.command.usage + "```")
            .setFooter(`KEY: < > = required, [ ] = optional`)
        return message.channel.send(embed).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }
 
    // if no property
    if(!output[1]) {
        var embed = new Discord.RichEmbed()
            .setAuthor("Error", errors.image)
            .setColor(errors.color)
            .setTitle("Must also provide the property to update and the new data value")
            .addField('Properties', this.command.arguments)
            .addField('Usage', "```" + prefix + this.command.aliases + " " + this.command.usage + "```")
            .setFooter(`KEY: < > = required, [ ] = optional`)
        return message.channel.send(embed).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }
 
 
    // if nest property is not valid
    const validProp = ["pokestops","p", "gyms", "exgyms", "spawns", "notes", "city", "state", "region", "country", "alias", "google", "osm"];

    if(!validProp.some(word => output[1].includes(word)) ) {
        var embed = new Discord.RichEmbed()
            .setAuthor("Error", errors.image)
            .setColor(errors.color)
            .setTitle(`${output[1]} is not a valid nest property`)
            .addField('Properties', this.command.arguments)
            .addField('Usage', "```" + prefix  + this.command.aliases + " " + this.command.usage + "```")
            .setFooter(`KEY: < > = required, [ ] = optional`)
        return message.channel.send(embed).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }

    nestProp = capitalize_Words(output[1]).trim(" ")
    nestData = output[2].trim(" ")
    nestDataCap = capitalize_Words(output[2]).trim(" ")

    

    if(!bot.defaultNest.has(nestKey)) {
        var embed = new Discord.RichEmbed()
            .setAuthor("Error", errors.image)
            .setColor(errors.color)
            .setTitle(`${nestName} does not exist in the PokeCloud database`) 
        return message.channel.send({embed: embed})
        .then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }

    // emoji support
    pokestopEmoji = bot.emojis.get(emoji.pokestop);
    gymEmoji = bot.emojis.get(emoji.gym);
    exraidGymEmoji = bot.emojis.get(emoji.exraid);
    spawnEmoji = bot.emojis.get(emoji.spawn);
    notesEmoji = bot.emojis.get(emoji.notes);

    // require guildSettings
    serverid = bot.guildSettings.get(message.guild.id, 'id')
 
    // require defaultNest
    nestmsgid = bot.defaultNest.get(nestKey, 'messageid')
    google = bot.defaultNest.get(nestKey, 'location.maps.google')
    pokestops = bot.defaultNest.get(nestKey, 'pokestops')
    gyms = bot.defaultNest.get(nestKey, 'gyms')
    spawns = bot.defaultNest.get(nestKey, 'spawns')
    exgyms = bot.defaultNest.get(nestKey, 'exgyms')
 
     // if nest is created by current server
     if(serverid === message.guild.id) {
 
        // pokestops
        if(nestProp === "Pokestops" || nestProp === "P") {
            let updateProp = require(`../util/runs/commands/update-nest/pokestops`);
            return updateProp.run(bot, message);
        }

        // gyms
        if(nestProp === "Gyms" || nestProp === "G") {
            let updateProp = require(`../util/runs/commands/update-nest/gyms`);
            return updateProp.run(bot, message);
        }

        // exgyms
        if(nestProp === "Exgyms" || nestProp === "Ex") {
            let updateProp = require(`../util/runs/commands/update-nest/exgyms`);
            return updateProp.run(bot, message);
        }

        // spawns
        if(nestProp === "Spawns" || nestProp === "S") {
            let updateProp = require(`../util/runs/commands/update-nest/spawns`);
            return updateProp.run(bot, message);
        }


        // city
        if(nestProp === "City" || nestProp === "C") {
            let updateProp = require(`../util/runs/commands/update-nest/city`);
            return updateProp.run(bot, message);
        }

        // state
        if(nestProp === "State" || nestProp === "St") {
            let updateProp = require(`../util/runs/commands/update-nest/state`);
            return updateProp.run(bot, message);
        }

        // region
        if(nestProp === "Region" || nestProp === "R") {
            let updateProp = require(`../util/runs/commands/update-nest/region`);
            return updateProp.run(bot, message);
        }

        // country
        if(nestProp === "Country" || nestProp === "Co") {
            let updateProp = require(`../util/runs/commands/update-nest/country`);
            return updateProp.run(bot, message);
        }

        // google
        if(nestProp === "Google" || nestProp === "Go") {
            let updateProp = require(`../util/runs/commands/update-nest/google`);
            return updateProp.run(bot, message);
        }

        // notes
        if(nestProp === "Notes" || nestProp === "N") {
            let updateProp = require(`../util/runs/commands/update-nest/notes`);
            return updateProp.run(bot, message);
        }
     }
 };