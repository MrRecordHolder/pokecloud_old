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
const times = require("../util/data/times.json")
const Pokedex = require("../keys/Pokedex")

let mainserver = require(`../util/data/server.json`)

exports.run = (bot, message, args) => { 

    let guildSettings_language = bot.guildSettings.get(message.guild.id, 'language');
    let errors = require(`../util/responses/${guildSettings_language}/error.json`)
    let success = require(`../util/responses/${guildSettings_language}/success.json`)

    if(!bot.guilds.get(mainserver.home.id).members.get(message.author.id).roles.some(role => role.id === mainserver.roles.professor)) {
        var embed = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle("Must be **PokeCloud Professor**")
            .setDescription("[Click here to learn more](https://pokecloud.gitbook.io/pokecloud/about-us/become-a-professor)")
        return message.channel.send({embed: embed}).then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    };

    if(message.channel.id !== mainserver.home.professorslab) {
        // error: must be used in the professors lab
        var embed = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle("Must be used in the **Professors Lab**")
        return message.channel.send({embed: embed}).then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });  
    };


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

    if(pokedex_boost_p === "Partly Cloudy") {
        pokedex_boost_p = "PartlyCloudy"
    }
    

    let basicNestLanguage = require(`../util/responses/English/basics/nest.json`);

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
    };
    if(output[5]) {
        pokedex_boost_s = capitalize_Words(output[5]).trim()
        if(pokedex_boost_s === "Partly Cloudy") {
            pokedex_boost_s = "PartlyCloudy"
        }
        bot.Pokedex.set(pokedex_english, pokedex_boost_s, 'boost.secondary')
        secondaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex_boost_s}`)
    };

    let primaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex_type_p}`)
    let primaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex_boost_p}`)

    let userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    let username = message.guild.member(user).displayName

    var embed = new Discord.RichEmbed()
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