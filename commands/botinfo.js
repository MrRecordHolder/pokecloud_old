const Discord = require("discord.js")

module.exports.command = {
    name: "botinfo",
    aliases: ["bi"],
    description: "Shows bots information.",
    category: "Util",
    usage: "botinfo"
}

exports.run = async (bot, message) => {

    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    let config = require(`../util/config.json`);

    var embed = new Discord.RichEmbed()
        .setTitle("PokeCloud information")
        .setColor("RANDOM")
        .setThumbnail(bot.user.avatarURL)
        .setDescription("Uptime: " + uptime)
        .addField("Version", config.version)
        .addField("Data", `Servers: ${bot.guildSettings.size}\nTrainers: ${bot.users.size}\nNests: ${bot.defaultNest.size}\nPokedex: ${bot.Pokedex.size}`)
    return message.channel.send(embed);
}