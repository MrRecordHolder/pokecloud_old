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
    output = args.join(" ").trim(" ").split(",")

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
    serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    serverstate = bot.guildSettings.get(message.guild.id, 'location.state')

    // require per language responses
    basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)

    // create embed
    embed = new Discord.RichEmbed()


    //////////////// check for valid arguments

    if(nestprop === "City" || nestprop === "C") {
        let snCity = require(`../util/runs/commands/search-nest/city.js`);
        return snCity.run(bot, message);
    }

    if(nestprop === "State" || nestprop === "S") {
        let snState = require(`../util/runs/commands/search-nest/state.js`);
        return snState.run(bot, message);
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

