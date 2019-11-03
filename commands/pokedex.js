module.exports.command = {
    name: "pokedex",
    aliases: ["p"],
    description: "Displays all Pokemon in the PokeCloud Pokedex.",
    category: "Pokedex",
    usage: "",
    example: "",
    permission: "**Role:** Any | **Channel:** Any",
    arguments: ""
}

const Discord = require("discord.js")
const errors = require("../util/data/errors.json")
const times = require("../util/data/times.json")
const Pokedex = require("../keys/Pokedex")

exports.run = (bot, message, args) => { 
    let responseObject = bot.Pokedex.findAll(`nest`, true)
    let pokemon = responseObject.map(key => [`${key.english.name}`])
    
    var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`**Nesting Pokemon**`)    
        .setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true`)
        .setDescription(pokemon.sort().slice(0, 50))
        .setFooter('Data provide by PokeCloud', bot.user.avatarURL)
    message.channel.send({embed});
}