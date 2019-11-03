module.exports.command = {
    name: "pokedex-add",
    aliases: ["pa"],
    description: "Add a Pokemon to PokeCloud's Pokedex. Must be added using the English name.",
    category: "Pokedex",
    usage: "<pokemon>, <dex>, <primary type>, <primary boost>, [secondary type], [secondary boost]",
    example: "bulbasaur, 001, grass, sunny, poison, cloudy",
    permission: "**Role:** Pokedex | **Channel:** Any",
    arguments: ""
}

const Discord = require("discord.js")
const errors = require("../util/data/errors.json")
const times = require("../util/data/times.json")
const Pokedex = require("../keys/Pokedex")

exports.run = (bot, message, args) => { 

    // must be developer
    if (message.author.id !== "373660480532643861") {
        var developer = new Discord.RichEmbed()
            .setColor(errors.color)
            .setAuthor("Error", errors.image)
            .setTitle("Only the developer can use this command")    
        return message.channel.send({embed: developer})
        .then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    };

    let userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    const username = message.guild.member(user).displayName


    let output = args.join(" ").trim().split(",")
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    // create data props
    let pokedex_english = capitalize_Words(output[0]).trim()
    let pokedex_english_low = output[0].toLowerCase().trim()
    let pokedex_dex = output[1].trim()
    let pokedex_type_p = capitalize_Words(output[2]).trim()
    let pokedex_boost_p = capitalize_Words(output[3]).trim()

    basicNestLanguage = require(`../util/responses/English/basics/nest.json`);

    // create new Pokedex with default props
    function createdex(pokedex_english, object) {
        bot.Pokedex.ensure(pokedex_english, object)
    } createdex(pokedex_english, Pokedex);


    // set new data
    bot.Pokedex.set(pokedex_english, pokedex_english, 'name.english')
    bot.Pokedex.set(pokedex_english, pokedex_dex, 'dex')
    bot.Pokedex.set(pokedex_english, pokedex_type_p, 'type.primary')
    bot.Pokedex.set(pokedex_english, pokedex_boost_p, 'boost.primary')

    if(output[4]) {
        pokedex_type_s = capitalize_Words(output[4]).trim()
        bot.Pokedex.set(pokedex_english, pokedex_type_s, 'type.secondary')
        SecondaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex_type_s}`)
    }
    if(output[5]) {
        pokedex_boost_s = capitalize_Words(output[5]).trim()
        bot.Pokedex.set(pokedex_english, pokedex_boost_s, 'boost.secondary')
        secondaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex_boost_s}`)
    }  

    // type emoji
    primaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex_type_p}`)

    // weather boost emoji
    primaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex_boost_p}`)
    
    // shiny emoji
    shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)

    var embed = new Discord.RichEmbed()
        embed.setAuthor("Success", success.image)
        embed.setColor(success.color)
        embed.setTitle(pokedex_english + " added to the Pokedex")
        embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${pokedex_dex}-${pokedex_english_low}@3x.png?raw=true`)
        if(!output[4]) {
            embed.addField("#" + pokedex_dex + " " + pokedex_english, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokedex_type_p}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokedex_boost_p}`)
        } else {
            embed.addField("#" + pokedex_dex + " " + pokedex_english, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokedex_type_p} ${SecondaryTypeEmoji} ${pokedex_type_s}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokedex_boost_p} ${secondaryweatherboostemoji} ${pokedex_boost_s}`)
        };    
        embed.setFooter(username, userimage)
    return message.channel.send({embed: embed}).then(deleteIT => {
        bot.channels.get('639499414981050398').send({embed: embed});
        deleteIT.delete(times.thirtysec)
    });
};