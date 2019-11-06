module.exports.command = {
    name: "pokedex",
    aliases: ["p"],
    description: "Displays all Pokemon in the PokeCloud Pokedex.",
    category: "Utilities",
    usage: "",
    example: "",
    permission: "**Role:** Any | **Channel:** Any",
    arguments: ""
}

const Discord = require("discord.js")

exports.run = (bot, message, args) => { 
        
    let output = args.join(" ").trim().split(",")
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    if(!output[0]) {
        let pokemon = bot.Pokedex.map(key => [`${key.name.english}`])
        
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`**All Pokemon**`)    
            .setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true`)
            .setDescription(pokemon.sort().join(", "))
            .setFooter('Data provide by PokeCloud')
        message.channel.send({embed});
    }

    if(output[0].trim().toLowerCase() === "nest") {
        let responseObject = bot.Pokedex.findAll(`nest`, true)
        let pokemon = responseObject.map(key => [`${key.name.english}`])
        
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`**Nesting Pokemon**`)
            .setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true`)
            .setDescription(pokemon.sort().join(", "))
            .setFooter('Data provide by PokeCloud')
        message.channel.send({embed});
    };        
}