exports.run = (bot, message) => {
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    usersearch = bot.defaultNest.filter(v => v.pokemon.current.name === nestpropvalue);
    // check if the search is for all nests, if not return statewide
    if(output[2]) {
        sall = capitalize_Words(output[2]).trim(" ")
        if(sall === "All") {
            eachnest = usersearch.map(key => [`📍 [**${key.name}**](${key.location.maps.google}) - ${key.location.city}, ${key.location.state}`])
            embed.setTitle(basicNestLanguage.search.worldwide)
            embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${nestpropvalue}.`)
        }
    } else {
        statewidesearch = usersearch.filter(v => v.location.state === serverstate);
        eachnest = statewidesearch.map(key => [`📍 [**${key.name}**](${key.location.maps.google}) - ${key.location.city}, ${key.location.state}`])
        embed.setTitle(basicNestLanguage.search.statewide)
        embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${nestpropvalue}, ${serverstate}`)
    }

    // get pokedex file
    try {
        pokedex = require(`../pokedex/${serverlanguage}/${nestpropvalue}.json`)
    } catch {
        // remove
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

    // wait then send nests 11-20
    setTimeout(function(){
        if(eachnest.length > 10) {
            embed.setTitle("")
            embed.setDescription(eachnest.sort().slice(10, 20))
            if(output[2]) {
                if(sall === "All") {
                    embed.setFooter(`${eachnest.sort().slice(0, 11).length} - ${eachnest.sort().slice(0,0).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${nestpropvalue}`)
                }
            } else {                    
                embed.setFooter(`${eachnest.sort().slice(0, 11).length} - ${eachnest.sort().slice(0, 20).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${nestpropvalue}, ${serverstate}`)
            }
            message.channel.send(embed);
        }
    }, 1500);
};