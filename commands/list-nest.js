const Discord = require("discord.js")
const errors = require("../util/data/errors.json")
const success = require("../util/data/success.json")
const caution = require("../util/data/caution.json")
const times = require("../util/data/times.json")

const emoji = require("../util/data/emoji.json")

module.exports.command = {
    name: "list-nest",
    aliases: ["ln"],
    description: "List a nest created by this community and allow for live reporting and updating.",
    category: "Nest",
    usage: "<nest name>",
    example: "hilton park",
    permission: "**Role:** Admin | **Channel:** Nest",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#list-nest",
    arguments: ""
}

exports.run = (bot, message, args) => {    

    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'replies.clean')
    const prefix = bot.guildSettings.get(message.guild.id, 'prefix')

    // check for admin role
    if (!message.member.roles.some(role => role.name === adminrole)) {
        var ADMIN = new Discord.RichEmbed()
            .setAuthor("Error", errors.image)
            .setColor(errors.color)
            .setTitle("You must have the `ADMIN` role to perform this action")
        return message.channel.send({embed: ADMIN}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }

    // require guildSettings
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')

    // check for nest channel
    if(message.channel.id !== nestchannel) {
        var ADMIN = new Discord.RichEmbed()
            .setAuthor("Error", errors.image)
            .setColor(errors.color)
            .setTitle("This command must be used in:")
            .setDescription("🔰 <#" + nestchannel + ">")
        return message.channel.send({embed: ADMIN}).then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    };

    // split arguments
    let output = args.join(" ").trim(" ").split(",")

    if(!output[0]) {
        var nonestname = new Discord.RichEmbed()
            .setAuthor("Error", errors.image)
            .setColor(errors.color)
            .setTitle("Must provide a nest name to list") 
            .addField("Usage", "```" + prefix + this.command.name + " " + this.command.usage + "```")
        return message.channel.send({embed: nonestname})
        .then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    };

    //capitalize word function
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    // generate new args
    let nestName = capitalize_Words(output[0])

    // generate nest key
    let nestKey = `${message.guild.id}-${nestName}`

    // generate nest key
    nestKey = `${message.guild.id}-${nestName}`

    // if nest doesn't exist
    if(!bot.defaultNest.has(nestKey)) {
        nestKey = bot.defaultNest.findKey(val => val.alias === nestName);
        nestName = bot.defaultNest.get(nestKey, 'name')
    };

    if(!bot.defaultNest.has(nestKey)) {
        var noNEST = new Discord.RichEmbed()
            .setAuthor("Error", errors.image)
            .setColor(errors.color)
            .setTitle(`${nestName} does not exist in the PokeCloud datbase`) 
        return message.channel.send({embed: noNEST})
        .then(deleteIT => {
            if(cleanreplies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    }

    // require defaultNest
    const cpokemonname = bot.defaultNest.get(nestKey, 'pokemon.current.name')
    
    if(cpokemonname === "?") {
        pokemon = require(`../pokedex/English/Unreported.json`)
    } else {
        try {
            pokemon = require(`../pokedex/German/${cpokemonname}.json`)
        } catch {
            pokemon = require(`../pokedex/English/${cpokemonname}.json`)
        }
    }


    // emoji support
    const pokestopEmoji = bot.emojis.get(emoji.pokestop);
    const gymEmoji = bot.emojis.get(emoji.gym);
    const exraidGymEmoji = bot.emojis.get(emoji.exraid);
    const spawnEmoji = bot.emojis.get(emoji.spawn);
                
    // type emoji
    primaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokemon.type.primary}`)
    SecondaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokemon.type.secondary}`)

    // weather boost emoji
    primaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokemon.weatherboost.primary}`)
    secondaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokemon.weatherboost.secondary}`)

    // shiny emoji
    shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)

    // require defaultNest
    const nestname = bot.defaultNest.get(nestKey, 'name')
    const nestcity = bot.defaultNest.get(nestKey, 'location.city')
    const exraidgyms = bot.defaultNest.get(nestKey, 'exgyms')
    const googlemap = bot.defaultNest.get(nestKey, 'location.maps.google')
    const pokestops = bot.defaultNest.get(nestKey, 'pokestops')
    const gyms = bot.defaultNest.get(nestKey, 'gyms')
    const spawns = bot.defaultNest.get(nestKey, 'spawns')
    const cpokemonimage = bot.defaultNest.get(nestKey, 'pokemon.current.image')
                
    const embed = new Discord.RichEmbed()
        // nest info
        embed.setTitle("**" + nestname + "** - " + nestcity)
        if(exraidgyms > 0) { // has ex raid gyms
            embed.setDescription(`[Get Directions](${googlemap})\n${pokestopEmoji}Pokestops: ${pokestops} | ${gymEmoji}Gyms: ${gyms}\n${exraidGymEmoji}Eligible Ex Raid Gyms: ${exraidgyms}\n${spawnEmoji}Avg Sightings Per Visit: ${spawns}`)
        } else { // does not have
            embed.setDescription(`[Get Directions](${googlemap})\n${pokestopEmoji}Pokestops: ${pokestops} | ${gymEmoji}Gyms: ${gyms}\n${spawnEmoji}Avg Sightings Per Visit: ${spawns}`)
        }
    
        // pokemon info
        if(cpokemonname === "?") {
            embed.setThumbnail(`https://vignette.wikia.nocookie.net/pokemongo/images/0/06/Sighting_Grass.png/revision/latest?cb=20161003231726`)
            embed.addField('Unreported', 'No species has been reported since the last migration. Visit the park and report back what you\'ve discovered')
        } else {
            embed.setThumbnail(cpokemonimage)
            if(pokemon.shiny === true) {
                if(pokemon.type.secondary === "") {
                    embed.addField("#" + pokemon.dex + " " + cpokemonname + " " + shinyEmoji, `Type: ${primaryTypeEmoji} ${pokemon.type.primary}\nBoost: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                } else {
                    embed.addField("#" + pokemon.dex + " " + cpokemonname + " " + shinyEmoji, `Type: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\nBoost: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                }
            } else {
                if(pokemon.type.secondary === "") {
                    embed.addField("#" + pokemon.dex + " " + cpokemonname, `Type: ${primaryTypeEmoji} ${pokemon.type.primary}\nBoost: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                } else {
                    embed.addField("#" + pokemon.dex + " " + cpokemonname, `Type: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\nBoost: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                }                    
            }
        }
        embed.setFooter("Listed")
        embed.setTimestamp();
    message.channel.send(embed).then(message => {
        bot.defaultNest.set(nestKey, message.channel.lastMessageID, "messageid")
        bot.defaultNest.set(nestKey, message.channel.id, 'channel')
    });
}