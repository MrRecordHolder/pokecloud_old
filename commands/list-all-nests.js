const Discord = require("discord.js")
const emoji = require("../util/data/emoji.json")

module.exports.command = {
    name: "list-all-nests",
    aliases: ["lan"],
    description: "Lists all nests created by this community in alphabetical order and allows live reporting and updating.",
    category: "Nest",
    usage: "",
    example: "",
    permission: "**Role:** Admin | **Channel:** Admin",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#list-all-nests",
    arguments: ""
}

exports.run = (bot, message, args) => {
    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    
    // admin role check
    if (!message.member.roles.some(role => role.name === adminrole)) {
        let checkrole = require(`../util/runs/errors/permissions/admin.js`);
        return checkrole.run(bot, message, args);
    };

    // require guildSettings
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')

    // check for nest channel
    if(message.channel.id !== nestchannel) {
        let checkchannel = require(`../util/runs/errors/channels/nest.js`);
        return checkchannel.run(bot, message, args);
    };

    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    // require per language responses
    const basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)

    // sort all keys
    bot.defaultNest.keyArray().sort().forEach(key =>{
        
        // ensure the nest is created by the current server
        if(bot.defaultNest.get(key, `serverid`) === message.guild.id) {

            // require defaultNest
            const nestname = bot.defaultNest.get(key, 'name')
            const google = bot.defaultNest.get(key, 'location.maps.google')
            const nestcity = bot.defaultNest.get(key, 'location.city')
            const pokestops = bot.defaultNest.get(key, 'pokestops')
            const gyms = bot.defaultNest.get(key, 'gyms')
            const spawns = bot.defaultNest.get(key, 'spawns')
            const exraidgyms = bot.defaultNest.get(key, 'exgyms')

            const cpokemonname = bot.defaultNest.get(key, 'pokemon.current.name')

            // ensure pokedex file exists
            if(cpokemonname === "?") {
                pokemon = require(`../pokedex/English/Unreported.json`)
            } else {
                try {
                    pokemon = require(`../pokedex/${serverlanguage}/${cpokemonname}.json`)
                } catch {
                    // not pokedex file exists
                }
            }

            // basics emoji support
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
            
            // generate the nest embed
            const embed = new Discord.RichEmbed()

            // nest info
            embed.setTitle("**" + nestname + "** - " + nestcity)
            if(exraidgyms > 0) {
                embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${exraidGymEmoji}${basicNestLanguage.exgyms}: ${exraidgyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
            } else {
                embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
            }

            // pokemon info
            if(cpokemonname === "?") {
                embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
                embed.addField(basicNestLanguage.unreported.title, basicNestLanguage.unreported.description)
            } else {
                const cpokemonimage = bot.defaultNest.get(key, 'pokemon.current.image')
                embed.setThumbnail(cpokemonimage)
                if(pokemon.shiny === true) {
                    if(pokemon.type.secondary === "") {
                        embed.addField("#" + pokemon.dex + " " + cpokemonname + " " + shinyEmoji, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                    } else {
                        embed.addField("#" + pokemon.dex + " " + cpokemonname + " " + shinyEmoji, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                    }
                } else {
                    if(pokemon.type.secondary === "") {
                        embed.addField("#" + pokemon.dex + " " + cpokemonname, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                    } else {
                        embed.addField("#" + pokemon.dex + " " + cpokemonname, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                    }                    
                }
            }
            embed.setFooter("Listed")
            embed.setTimestamp();

            // require nest messageid
            const messagetodelete = bot.defaultNest.get(key, 'messageid')

            // check for previously listed nest
            message.channel.fetchMessage(messagetodelete).then(oldembed => {
                if (oldembed) oldembed.delete();                
            }).catch(err => {
                // skip deletion
            });

            // send new nest embed
            message.channel.send(embed).then(message => {
                // save the sent embed message id
                bot.defaultNest.set(key, message.channel.lastMessageID, "messageid")
            });
        };
    });

    // require guildSettings
    const migrationmessagetodelete = bot.guildSettings.get(message.guild.id, 'migration.messageid')

    // check for previously listed migration details
    message.channel.fetchMessage(migrationmessagetodelete).then(oldmigration => {
        if (oldmigration) oldmigration.delete();               
    }).catch(err => {
        // skip deletion
    });

    // send new migration details
    let migrationdetails = require(`../util/runs/commands/migrationdetails.js`);
    migrationdetails.run(bot, message);        
}