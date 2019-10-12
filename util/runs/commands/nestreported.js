const Discord = require("discord.js")
const times = require("../../data/times.json")

exports.run = (bot, message) => {
    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const success = require(`../../responses/${serverlanguage}/success/general.json`)
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    const prefix = bot.guildSettings.get(message.guild.id, 'prefix')
    // list the migration message    
    var embed = new Discord.RichEmbed()
        embed.setAuthor(success.code.zero, success.image)
        embed.setColor(success.color)
        embed.setTitle(nestPokemon + " " + success.response.one.a + " " + nestName + " " + success.response.one.b)


        // pokemon info
        if(pokemon.name === "?") {
            embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
            embed.addField(basicNestLanguage.unreported.title, basicNestLanguage.unreported.description)
        } else {
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


    return message.channel.send(embed).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else { // if clean replies is false and current channel is the nest channel
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {
                    console.log(err + "\nerrors -> permissions -> missingnestN.js")
                });
            };
        };
    });
}