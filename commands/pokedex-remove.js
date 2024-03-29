module.exports.command = {
    name: "pokedex-remove",
    aliases: ["pr"],
    description: "Removes a Pokemon from PokeCloud's Pokedex. Must use the English name.",
    category: "Pokedex",
    usage: "<pokemon>",
    example: "bulbasaur",
    permission: "**Role:** Pokedex | **Channel:** Any",
    arguments: ""
}

const Discord = require("discord.js")
const errors = require("../util/data/errors.json")
const times = require("../util/data/times.json")

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

    bot.Pokedex.delete(pokedex_english);

    let userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    let username = message.guild.member(user).displayName

    var embed = new Discord.RichEmbed()
        embed.setColor(success.color)
        embed.setTitle(pokedex_english + " removed from the Pokedex")
        embed.setFooter(username, userimage)
    return message.channel.send({embed: embed}).then(deleteIT => {
        bot.channels.get('639499414981050398').send({embed: embed});
        deleteIT.delete(times.thirtysec)
    });
}