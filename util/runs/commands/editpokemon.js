exports.run = (bot, message) => {
        // clear pokemon info
        embed.fields.length = 0
        // pokemon info
        if(pokemon.name === "?") {
            embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
            embed.addField(basicNestLanguage.unreported.title, basicNestLanguage.unreported.description)
        } else {
            const cpokemonimage = bot.defaultNest.get(nestKey, 'pokemon.current.image')
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
                    embed.addField("#" + pokemon.dex + " " + pokemon.name, `${basicNestLanguage.typ}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                }                    
            }
        }
        
        embed.setFooter("Reported by " + username, userimage)
        embed.setTimestamp()
};