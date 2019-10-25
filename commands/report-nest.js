const Discord = require("discord.js")
const emoji = require("../util/data/emoji.json")
const times = require("../util/data/times.json")
const errors = require("../util/data/errors.json")

module.exports.command = {
    name: "report-nest",
    aliases: ["rn"],
    description: "Changes the current Pokemon nesting at the specified park.",
    category: "Nest",
    usage: "<nest name>, <pokemon>",
    example: "hilton park, pikachu",
    permission: "**Role:** Admin & Nest Manager | **Channel:** Nest & Admin",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#report-nest",
    arguments: ""
}


exports.run = (bot, message, args) => {

    // get curent command data
    commandalias = this.command.aliases
    commandusage = this.command.usage

    userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    const username = message.guild.member(user).displayName

    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    const nestrole = bot.guildSettings.get(message.guild.id, 'roles.nest')
    
    // admin role check
    if (!message.member.roles.some(role => role.name === adminrole) && !message.member.roles.some(role => role.name === nestrole)) {
        let checkrole = require(`../util/runs/errors/permissions/nestadmin.js`);
        return checkrole.run(bot, message, args);
    };

    // require guildSettings
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')

    // check for admin & nest channel
    if(message.channel.id !== adminchannel && message.channel.id !== nestchannel) {
        let checkchannel = require(`../util/runs/errors/channels/nestadmin.js`);
        return checkchannel.run(bot, message, args);
    };

    // split the args
    let output = args.join(" ").trim().split(",")

    // check for nest name
    if(!output[0]){
        let checknestNP = require(`../util/runs/commands/missingnestNP.js`);
        return checknestNP.run(bot, message);
    };

    // check for pokemon
    if(!output[1]){
        let checknestNP = require(`../util/runs/commands/missingnestNP.js`);
        return checknestNP.run(bot, message);
    }

    //capitalize word function
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    //geneate outputs
    nestName = capitalize_Words(output[0])
    nestPokemon = capitalize_Words(output[1]).trim()
    nestPokemonLow = output[1].trim().toLowerCase()

    // generate nest key
    nestKey = `${message.guild.id}-${nestName}`
    
    // if nest doesn't exist
    if(!bot.defaultNest.has(nestKey)) {
        let ensurenest = require(`../util/runs/commands/ensurenest.js`);
        return ensurenest.run(bot, message, args);
    };

    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    // require per language responses
    basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)

    const nestingpokemon = require(`../pokedex/nesting/${serverlanguage}.json`)    

    // ensure pokemon can nest
    if(nestingpokemon.some(word => nestPokemon.includes(word))) {
        if(nestPokemon === "?" || nestPokemon === " ?" || nestPokemon === "Unreported" || nestPokemon === " Unreported" || nestPokemon === "unreported" || nestPokemon === " unreported") {
            pokemon = require(`../pokedex/English/Unreported.json`)
            // set new nest prop
            bot.defaultNest.set(nestKey, `https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true`, 'pokemon.current.image')
            bot.defaultNest.set(nestKey, "?", 'pokemon.current.name')
        } else {
            // ensure the pokedex file exist
            try {
                pokemon = require(`../pokedex/${serverlanguage}/${nestPokemon}.json`)
            } 
            // pokedex doesnt exist
            catch {
                var embed = new Discord.RichEmbed()
                    .setAuthor("Error", errors.image)
                    .setColor(errors.color)
                    .setTitle(nestPokemon + " is missing a Pokedex file... Please submit an issue on Github.")
                    .setDescription("[**SUBMIT ISSUE CLICK HERE**](https://github.com/MrRecordHolder/pokecloud/issues)")
                return message.channel.send(embed).then(deleteIT => {
                    deleteIT.delete(times.thirtysec)
                });
            }

            // set new nest prop
            bot.defaultNest.set(nestKey, nestPokemon, 'pokemon.current.name')
            if(pokemon.shiny === true) {
                bot.defaultNest.set(nestKey, `https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${pokemon.dex}-${pokemon.name.toLowerCase()}-shiny@3x.png?raw=true`, 'pokemon.current.image')
            } else {
                bot.defaultNest.set(nestKey, `https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${pokemon.dex}-${pokemon.name.toLowerCase()}@3x.png?raw=true`, 'pokemon.current.image')
            }

            // type emoji
            primaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokemon.type.primary}`)
            SecondaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokemon.type.secondary}`)

            // weather boost emoji
            primaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokemon.weatherboost.primary}`)
            secondaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokemon.weatherboost.secondary}`)

            // shiny emoji
            shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)


            const messageid = bot.defaultNest.get(nestKey, 'messageid')
            

            // fetch the message to edit
            let messagechannel = bot.defaultNest.get(nestKey, 'channel')
        
            bot.channels.get(messagechannel).fetchMessage(messageid).then(editEmbed => {
                // edit the embed if it exist
                if (editEmbed) {
                    const { RichEmbed } = require ('discord.js');
                    const embed = new RichEmbed (editEmbed.embeds[0])
                    // clear pokemon info
                    embed.fields.length = 0
                    // pokemon info
                    if(pokemon.name === "?") {
                        embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
                        embed.addField(basicNestLanguage.unreported.title, basicNestLanguage.unreported.description)
                    } else {
                        cpokemonimage = bot.defaultNest.get(nestKey, 'pokemon.current.image')
                        embed.setThumbnail(cpokemonimage)
                        if(pokemon.shiny === true) {
                            if(pokemon.type.secondary === "") {
                                embed.addField("#" + pokemon.dex + " " + pokemon.name + " " + shinyEmoji, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                            } else {
                                embed.addField("#" + pokemon.dex + " " + pokemon.name + " " + shinyEmoji, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                            }
                        } else {
                            if(pokemon.type.secondary === "") {
                                embed.addField("#" + pokemon.dex + " " + pokemon.name, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                            } else {
                                embed.addField("#" + pokemon.dex + " " + pokemon.name, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                            }                    
                        }
                    }
                    
                    embed.setFooter("Reported by " + username, userimage)
                    embed.setTimestamp()
                editEmbed.edit(embed);
                } 
                // send success message
                let nestreported = require(`../util/runs/commands/nestreported.js`);
                return nestreported.run(bot, message);
            }).catch(err => {
                // embed not listed, so list it
                // require defaultNest
                const google = bot.defaultNest.get(nestKey, 'location.maps.google')
                const pokestops = bot.defaultNest.get(nestKey, 'pokestops')
                const gyms = bot.defaultNest.get(nestKey, 'gyms')
                const spawns = bot.defaultNest.get(nestKey, 'spawns')
                const exraidgyms = bot.defaultNest.get(nestKey, 'exgyms')

                // basics emoji support
                const pokestopEmoji = bot.emojis.get(emoji.pokestop);
                const gymEmoji = bot.emojis.get(emoji.gym);
                const exraidGymEmoji = bot.emojis.get(emoji.exraid);
                const spawnEmoji = bot.emojis.get(emoji.spawn);

                // generate the nest embed
                const embed = new Discord.RichEmbed()

                // clear pokemon info
                embed.fields.length = 0

                const nestcity = bot.defaultNest.get(nestKey, 'location.city')

                // nest info
                embed.setTitle("**" + nestName + "** - " + nestcity)
                if(exraidgyms > 0) {
                    embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${exraidGymEmoji}${basicNestLanguage.exgyms}: ${exraidgyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
                } else {
                    embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
                }

                // pokemon info
                if(pokemon.name === "?") {
                    embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
                    embed.addField(basicNestLanguage.unreported.title, basicNestLanguage.unreported.description)
                } else {
                    cpokemonimage = bot.defaultNest.get(nestKey, 'pokemon.current.image')
                    embed.setThumbnail(cpokemonimage)
                    if(pokemon.shiny === true) {
                        if(pokemon.type.secondary === "") {
                            embed.addField("#" + pokemon.dex + " " + pokemon.name + " " + shinyEmoji, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                        } else {
                            embed.addField("#" + pokemon.dex + " " + pokemon.name + " " + shinyEmoji, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                        }
                    } else {
                        if(pokemon.type.secondary === "") {
                            embed.addField("#" + pokemon.dex + " " + pokemon.name, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                        } else {
                            embed.addField("#" + pokemon.dex + " " + pokemon.name, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                        }                    
                    }
                }
                
                embed.setFooter("Reported by " + username, userimage)
                embed.setTimestamp();
                // send new nest embed
                message.channel.send(embed).then(message => {
                    // save the sent embed message id
                    bot.defaultNest.set(nestKey, message.channel.lastMessageID, "messageid")
                });
            })
        }
    } else {
        // pokemon cant nest
        pokemonName = nestPokemon
        let dontNest = require(`../util/runs/errors/pokemon/dontnest`);
        return dontNest.run(bot, message);
    }
};