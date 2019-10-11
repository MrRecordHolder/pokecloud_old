const Discord = require("discord.js")

module.exports.command = {
    name: "search-nests",
    aliases: ["sn"],
    description: "By default, nest results are returned if it is located in the same state as the current server. To search worldwide use `, all` at the end of the command.",
    category: "Nest",
    usage: "<argument>, <search term>, [all]",
    example: "pokemon, pikachu",
    permission: "**Role:** Any | **Channel:** Any",
    link: "https://pokecloud.gitbook.io/pokecloud/trainer-guides/search-nests",
    arguments: "`city` | `c`\n`state` | `s`\n`pokemon` | `pokémon` | `p`"
}

exports.run = (bot, message, args) => {

    commandalias = this.command.aliases
    commandusage = this.command.usage
    commandexample = this.command.example
    commandargs = this.command.arguments

    // get command discord user
    theuser = message.author.id

    // split the args
    let output = args.join(" ").trim(" ").split(",")

    // check for nest property
    if(!output[0]) {
        let checknestNP = require(`../util/runs/errors/args/searchterms`);
        return checknestNP.run(bot, message);
    };

    // check for nest property value
    if(!output[1]) {
        let checknestNP = require(`../util/runs/errors/args/searchterms`);
        return checknestNP.run(bot, message);
    };

    //capitalize word function
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    nestprop = capitalize_Words(output[0]).trim(" ")
    nestpropvalue = capitalize_Words(output[1]).trim(" ")

    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    serverstate = bot.guildSettings.get(message.guild.id, 'location.state')

    // require per language responses
    const basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)

    // create embed
    var embed = new Discord.RichEmbed()


    //////////////// check for valid arguments

    if(nestprop === "City" || nestprop === "C") {
        usersearch = bot.defaultNest.filter(v => v.location.city === nestpropvalue);

        
        // check if the search is for all nests, if not return statewide
        if(output[2]) {
            sall = capitalize_Words(output[2]).trim(" ")
            if(sall === "All") {
                eachnest = usersearch.map(key => [`📍 [**${key.name}**](${key.location.maps.google}) - ${key.pokemon.current.name}`])
                embed.setTitle(basicNestLanguage.search.worldwide)
                embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} of ${eachnest.length} total nests in ${nestpropvalue} worldwide`)
            }
        } else {
            statewidesearch = usersearch.filter(v => v.location.state === serverstate);
            reportedstatewide = statewidesearch.filter(v => v.pokemon.current.name !== "?")
            eachnest = reportedstatewide.map(key => [`📍 [**${key.name}**](${key.location.maps.google}) - ${key.pokemon.current.name}`])
            embed.setTitle(basicNestLanguage.search.statewide)
            embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} of ${eachnest.length} reported nests in ${nestpropvalue}, ${serverstate}`)
        }
        embed.setColor("RANDOM")
        embed.setDescription(eachnest.sort().slice(0, 10))
        // send first 10 nests
        message.channel.send(embed);

        // wait then send nests 11-20
        setTimeout(function(){
            if(eachnest.length > 10) {
                embed.setTitle("")
                embed.setDescription(eachnest.sort().slice(10, 20))
                if(output[2]) {
                    if(sall === "All") {
                        embed.setFooter(`${eachnest.sort().slice(0, 11).length} - ${eachnest.sort().slice(0, 20).length} of ${eachnest.length} total nests in ${nestpropvalue} worldwide`)
                    }
                } else {                    
                    embed.setFooter(`${eachnest.sort().slice(0, 11).length} - ${eachnest.sort().slice(0, 20).length} of ${eachnest.length} reported nests in ${nestpropvalue}, ${serverstate}`)
                }
                message.channel.send(embed);
            }
        }, 1500);

        // react to see more via private message
        setTimeout(function(){
            if(eachnest.length > 20) {
            embed.description.length = 0
            embed.setTitle("Would you like to see more nests?")
            embed.setDescription("")
            embed.setFooter("👍 = Send results in private message | ❌ = Cancel")
            message.channel.send(embed).then(message => {
                message.react('👍').then(() => message.react('❌'));

                const filter = (reaction, user) => {
                    return ['👍', '❌'].includes(reaction.emoji.name) && user.id === theuser;
                };
                
                message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '👍') {
                        message.delete();
                        embed.setDescription(eachnest.sort().slice(20, 30))
                        if(output[2]) {
                            if(sall === "All") {
                                embed.setTitle(basicNestLanguage.search.worldwide)
                                embed.setFooter(`${eachnest.sort().slice(0, 21).length} - ${eachnest.sort().slice(0, 30).length} of ${eachnest.length} total nests in ${nestpropvalue} worldwide`)
                            }
                        } else {                    
                            embed.setTitle(basicNestLanguage.search.statewide)
                            embed.setFooter(`${eachnest.sort().slice(0, 21).length} - ${eachnest.sort().slice(0, 30).length} of ${eachnest.length} reported nests in ${nestpropvalue}, ${serverstate}`)
                        }
                        bot.users.get(theuser).send(embed)

                        // wait then send nests 31-40
                        setTimeout(function(){
                            if(eachnest.length > 10) {
                                embed.setTitle("")
                                embed.setDescription(eachnest.sort().slice(30, 40))
                                if(output[2]) {
                                    if(sall === "All") {
                                        embed.setFooter(`${eachnest.sort().slice(0, 31).length} - ${eachnest.sort().slice(0, 40).length} of ${eachnest.length} total nests in ${nestpropvalue} worldwide`)
                                    }
                                } else {                    
                                    embed.setFooter(`${eachnest.sort().slice(0, 31).length} - ${eachnest.sort().slice(0, 40).length} of ${eachnest.length} reported nests in ${nestpropvalue}, ${serverstate}`)
                                }
                                bot.users.get(theuser).send(embed)
                            }
                        }, 1500);
                    } else {
                        // cancel the message
                        message.delete();
                    }
                })
                .catch(collected => {
                    // no reaction made
                    message.delete();
                });
            })
        }
        }, 2300);
    }





    if(nestprop === "State" || nestprop === "S") {
        usersearch = bot.defaultNest.filter(v => v.location.state === nestpropvalue);
        eachnest = usersearch.map(key => [`📍 [**${key.name}**](${key.location.maps.google}) - ${key.pokemon.current.name}`])
           
        embed.setTitle(basicNestLanguage.search.statewide)
        embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} of ${eachnest.length} total nests in ${nestpropvalue}`)
        embed.setColor("RANDOM")
        embed.setDescription(eachnest.sort().slice(0, 10))
        // send first 10 nests
        message.channel.send(embed);

        // wait then send nests 11-20
        setTimeout(function(){
            if(eachnest.length > 10) {
                embed.setTitle("")
                embed.setDescription(eachnest.sort().slice(10, 20))
                embed.setFooter(`${eachnest.sort().slice(0, 11).length} - ${eachnest.sort().slice(0, 20).length} of ${eachnest.length} total nests in ${nestpropvalue}`)
                
                message.channel.send(embed);
            }
        }, 1500);

        // react to see more via private message
        setTimeout(function(){
            if(eachnest.length > 20) {
            embed.description.length = 0
            embed.setTitle("Would you like to see more nests?")
            embed.setDescription("")
            embed.setFooter("👍 = Send results in private message | ❌ = Cancel")
            message.channel.send(embed).then(message => {
                message.react('👍').then(() => message.react('❌'));

                const filter = (reaction, user) => {
                    return ['👍', '❌'].includes(reaction.emoji.name) && user.id === theuser;
                };
                
                message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '👍') {
                        message.delete();
                        usersearch = bot.defaultNest.filter(v => v.location.state === nestpropvalue);

                        // page 1
                        embed.setTitle(basicNestLanguage.search.statewide)
                        embed.setFooter(`${eachnest.sort().slice(0, 21).length} - ${eachnest.sort().slice(0, 30).length} of ${eachnest.length} total nests in ${nestpropvalue}`)
                        embed.setColor("RANDOM")
                        embed.setDescription(eachnest.sort().slice(20, 30))
                        bot.users.get(theuser).send(embed);

                        // page 2
                        setTimeout(function(){
                            if(eachnest.length > 30) {
                                embed.setTitle("")
                                embed.setDescription(eachnest.sort().slice(30, 40))
                                embed.setFooter(`${eachnest.sort().slice(0, 31).length} - ${eachnest.sort().slice(0, 40).length} of ${eachnest.length} total nests in ${nestpropvalue}`)
                                bot.users.get(theuser).send(embed);
                            }
                        }, 1500);

                        // page 3
                        setTimeout(function(){
                            if(eachnest.length > 40) {
                                embed.setTitle("")
                                embed.setDescription(eachnest.sort().slice(30, 40))
                                embed.setFooter(`${eachnest.sort().slice(0, 31).length} - ${eachnest.sort().slice(0, 40).length} of ${eachnest.length} total nests in ${nestpropvalue}`)
                                bot.users.get(theuser).send(embed);
                            }
                        }, 1500);

                        // page 3
                        setTimeout(function(){
                            if(eachnest.length > 50) {
                                embed.setTitle("")
                                embed.setDescription(eachnest.sort().slice(40, 50))
                                embed.setFooter(`${eachnest.sort().slice(0, 41).length} - ${eachnest.sort().slice(0, 50).length} of ${eachnest.length} total nests in ${nestpropvalue}`)
                                bot.users.get(theuser).send(embed);
                            }
                        }, 1500);

                    } else {
                        // cancel the message
                        message.delete();
                    }
                })
                .catch(collected => {
                    // no reaction made
                    message.delete();
                });
            })
        }
        }, 2300);
    }




    if(nestprop === "Pokemon" || nestprop === "P" || nestprop === "Pokémon") {
        usersearch = bot.defaultNest.filter(v => v.pokemon.current.name === nestpropvalue);
        // check if the search is for all nests, if not return statewide
        if(output[2]) {
            sall = capitalize_Words(output[2]).trim(" ")
            if(sall === "All") {
                eachnest = usersearch.map(key => [`📍 [**${key.name}**](${key.location.maps.google})\n${key.location.city}, ${key.location.state}`])
                embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} of ${eachnest.length} total ${nestpropvalue} nests worldwide`)
            }
        } else {
            statewidesearch = usersearch.filter(v => v.location.state === serverstate);
            eachnest = statewidesearch.map(key => [`📍 [**${key.name}**](${key.location.maps.google})\n${key.location.city}, ${key.location.state}`])
            embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} of ${eachnest.length} total ${nestpropvalue} nests in ${serverstate}`)
        }

        // get pokedex file
        try {
            pokedex = require(`../pokedex/${serverlanguage}/${nestpropvalue}.json`)
        } catch {
            pokemonName = nestpropvalue
            let dontNest = require(`../util/runs/errors/pokemon/dontnest`);
            return dontNest.run(bot, message);
        }

        if(pokedex.type.primary === 'Bug') {
            embed.setColor('GREEN')
        }
        if(pokedex.type.primary === 'Dark') {
            embed.setColor('RANDOM')
        }
        if(pokedex.type.primary === 'Dragon') {
            embed.setColor('BLUE')
        }
        if(pokedex.type.primary === 'Electric') {
            embed.setColor('0xFFFF00')
        }
        if(pokedex.type.primary === 'Fairy') {
            embed.setColor('PINK')
        }
        if(pokedex.type.primary === 'Fighting') {
            embed.setColor('ORANGE')
        }
        if(pokedex.type.primary === 'Fire') {
            embed.setColor('RED')
        }
        if(pokedex.type.primary === 'Flying') {
            embed.setColor('LIGHT_BLUE')
        }
        if(pokedex.type.primary === 'Ghost') {
            embed.setColor('LIGHT_PURPLE')
        }
        if(pokedex.type.primary === 'Grass') {
            embed.setColor('GREEN')
        }
        if(pokedex.type.primary === 'Ground') {
            embed.setColor('LIGHT_ORANGE')
        }
        if(pokedex.type.primary === 'Ice') {
            embed.setColor('LIGHT_BLUE')
        }
        if(pokedex.type.primary === 'Normal') {
            embed.setColor('LIGHT_GREY')
        }
        if(pokedex.type.primary === 'Poison') {
            embed.setColor('PURPLE')
        }
        if(pokedex.type.primary === 'Psychic') {
            embed.setColor('PINK')
        }
        if(pokedex.type.primary === 'Rock') {
            embed.setColor('ORANGE')
        }
        if(pokedex.type.primary === 'Steel') {
            embed.setColor('DARK_GREY')
        }
        if(pokedex.type.primary === 'Water') {
            embed.setColor('BLUE')
        }

        // type emoji
        primaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex.type.primary}`)
        SecondaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex.type.secondary}`)

        // weather boost emoji
        primaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex.weatherboost.primary}`)
        secondaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex.weatherboost.secondary}`)

        // shiny emoji
        shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)
        
        if(pokedex.shiny === true) {
            embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${pokedex.dex}-${pokedex.name.toLowerCase()}-shiny@3x.png?raw=true`)
            if(pokedex.type.secondary === "") {
                embed.setTitle("#" + pokedex.dex + " " + nestpropvalue + " " + shinyEmoji + `\nType: ${primaryTypeEmoji} ${pokedex.type.primary}\nBoost: ${primaryweatherboostemoji} ${pokedex.weatherboost.primary}`)
            } else {
                embed.setTitle("#" + pokedex.dex + " " + nestpropvalue + " " + shinyEmoji + `\nType: ${primaryTypeEmoji} ${pokedex.type.primary} ${SecondaryTypeEmoji} ${pokedex.type.secondary}\nBoost: ${primaryweatherboostemoji} ${pokedex.weatherboost.primary} ${secondaryweatherboostemoji} ${pokedex.weatherboost.secondary}`)
            }
        } else {
            embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${pokedex.dex}-${pokedex.name.toLowerCase()}@3x.png?raw=true`)
            if(pokedex.type.secondary === "") {
                embed.setTitle("#" + pokedex.dex + " " + nestpropvalue + `\nType: ${primaryTypeEmoji} ${pokedex.type.primary}\nBoost: ${primaryweatherboostemoji} ${pokedex.weatherboost.primary}`)
            } else {
                embed.setTitle("#" + pokedex.dex + " " + nestpropvalue + `\nType: ${primaryTypeEmoji} ${pokedex.type.primary} ${SecondaryTypeEmoji} ${pokedex.type.secondary}\nBoost: ${primaryweatherboostemoji} ${pokedex.weatherboost.primary} ${secondaryweatherboostemoji} ${pokedex.weatherboost.secondary}`)
            }
        }   
        embed.setDescription(eachnest.sort().slice(0, 10))
        embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} of ${eachnest.length} total nests`)    
        message.channel.send(embed);
    }

    
}

