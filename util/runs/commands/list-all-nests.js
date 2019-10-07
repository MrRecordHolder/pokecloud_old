const Discord = require("discord.js")

const errors = require("../../../data/errors.json")
const times = require("../../../data/times.json")

exports.run = (bot, message) => {
    
    const embed = new Discord.RichEmbed()

    // emoji support
    const pokestopEmoji = bot.emojis.get(emoji.pokestop);
    const gymEmoji = bot.emojis.get(emoji.gym);
    const exraidGymEmoji = bot.emojis.get(emoji.exraid);
    const spawnEmoji = bot.emojis.get(emoji.spawn);

    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    // require per language responses
    const language = require(`../../../responses/${serverlanguage}/commands/nestdisplay.json`)
    const basicNestLanguage = require(`../../../responses/${serverlanguage}/basics/nest.json`)


    // sort all keys
    bot.defaultNest.keyArray().sort().forEach(key =>{
        // ensure the nest is created by the currrent server
        if(bot.defaultNest.get(key, `serverid`) === message.guild.id) {

            // require defaultNest
            nestname = bot.defaultNest.get(key, 'name')
            google = bot.defaultNest.get(key, 'location.maps.google')
            nestcity = bot.defaultNest.get(key, 'location.city')
            pokestops = bot.defaultNest.get(key, 'pokestops')
            gyms = bot.defaultNest.get(key, 'gyms')
            spawns = bot.defaultNest.get(key, 'spawns')
            exraidgyms = bot.defaultNest.get(key, 'exgyms')

            cpokemonname = bot.defaultNest.get(key, 'pokemon.current.name')
            cpokemonimage = bot.defaultNest.get(key, 'pokemon.current.image')

            // ensure pokedex file exists
            if(cpokemonname === "?") {
                pokemon = require(`../pokedex/en/Unreported.json`)
            } else {
                try {
                    pokemon = require(`../pokedex/${language}/${cpokemonname}.json`)
                } catch {
                    // no pokedex file exists
                }
            }

            // type emoji
            primaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokemon.type.primary}`)
            SecondaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokemon.type.secondary}`)
            // weather boost emoji
            primaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokemon.weatherboost.primary}`)
            secondaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokemon.weatherboost.secondary}`)
            // shiny emoji
            shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)


        // nest info
        embed.setTitle("**" + nestname + "** - " + nestcity)
        if(exraidgyms > 0) { // has ex raid gyms
            embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${exraidGymEmoji}${basicNestLanguage.exgyms}: ${exraidgyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
        } else { // does not have
            embed.setDescription(`[Get Directions](${google})\n${pokestopEmoji}Pokestops: ${pokestops} | ${gymEmoji}Gyms: ${gyms}\n${spawnEmoji}Avg Sightings Per Visit: ${spawns}`)
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
        bot.defaultNest.set(key, message.channel.lastMessageID, "messageid")
    });
}
    });
}