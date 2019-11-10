module.exports.command = {
    name: "pokedex-toggle-shiny",
    aliases: ["pts"],
    description: "Toggles if a Pokemon in the PokeCloud's Pokedex can be caught shiny. Must use the English name.",
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

    let output = args.join(" ").trim().split(",");
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    if(!output[0]) {
        // error: no pokemon specified
        return;
    };

    // create data props
    let pokedex_english = capitalize_Words(output[0]).trim()

    if(!bot.Pokedex.get(pokedex_english)) {
        // error: pokemon does not exist
        return;
    };

    let toggle = bot.Pokedex.get(pokedex_english, "shiny")
    let Ntoggle = !toggle

    bot.Pokedex.set(pokedex_english, Ntoggle, "shiny")
    let pokedex_dex = bot.Pokedex.get(pokedex_english, 'dex')

    let userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    let username = message.guild.member(user).displayName

    var embed = new Discord.RichEmbed()
        embed.setColor(success.color)
        embed.setTitle(pokedex_english + "'s shiny form has been updated to " + Ntoggle)
        if(Ntoggle === true) {
            embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${pokedex_dex}-${pokedex_english.toLowerCase()}-shiny@3x.png?raw=true`);
        } else {
            embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${pokedex_dex}-${pokedex_english.toLowerCase()}@3x.png?raw=true`);
        };
        embed.setFooter(username, userimage)
    return message.channel.send({embed: embed}).then(deleteIT => {
        bot.channels.get('639499414981050398').send({embed: embed});
        deleteIT.delete(times.thirtysec);
    });
};