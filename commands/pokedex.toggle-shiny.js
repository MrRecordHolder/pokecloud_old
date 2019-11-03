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

    let output = args.join(" ").trim().split(",")
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    // create data props
    let pokedex_english = capitalize_Words(output[0]).trim()

    let toggle = bot.Pokedex.get(pokedex_english, "shiny")
    toggle = !toggle

    bot.Pokedex.set(pokedex_english, toggle, "shiny")

    var embed = new Discord.RichEmbed()
        embed.setAuthor("Success", success.image)
        embed.setColor(success.color)
        embed.setTitle(pokedex_english + "'s shiny form has been updated to " + toggle)
    return message.channel.send({embed: embed}).then(deleteIT => {
        bot.channels.get('639499414981050398').send({embed: embed});
        deleteIT.delete(times.thirtysec)
    });
};