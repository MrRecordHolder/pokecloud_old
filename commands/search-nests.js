const Discord = require("discord.js")

module.exports.command = {
    name: "search-nests",
    aliases: ["sn"],
    description: "By default, nest results are returned if it is located in the same state as the current server. To search worldwide use `, all` at the end of the command.",
    category: "Nest",
    usage: "<argument>, <search term>, [all]",
    example: "pokemon, pikachu",
    permission: "**Role:** Any | **Channel:** Any",
    link: "https://pokecloud.gitbook.io/pokecloud/trainer-guides/search-nests",
    arguments: "`city` | `c`\n`state` | `s`\n`pokemon` | `pokémon` | `p`"
}

exports.run = (bot, message, args) => {

    commandalias = this.command.aliases
    commandusage = this.command.usage
    commandexample = this.command.example
    commandargs = this.command.arguments

    // get command discord user
    theuser = message.author.id

    // split the args
    output = args.join(" ").trim(" ").split(",")

    // check for nest property
    if(!output[0]) {
        let checknestNP = require(`../util/runs/errors/args/searchterms`);
        return checknestNP.run(bot, message);
    };

    // check for nest property value
    if(!output[1]) {
        let checknestNP = require(`../util/runs/errors/args/searchterms`);
        return checknestNP.run(bot, message);
    };

    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    nestprop = capitalize_Words(output[0]).trim(" ")
    nestpropvalue = capitalize_Words(output[1]).trim(" ")

    // require guildSettings
    serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    serverstate = bot.guildSettings.get(message.guild.id, 'location.state')

    // require per language responses
    basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)

    // create embed
    embed = new Discord.RichEmbed()

    if(nestprop === "City" || nestprop === "C") {
        let snCity = require(`../util/runs/commands/search-nest/city.js`);
        return snCity.run(bot, message);
    };

    if(nestprop === "State" || nestprop === "S") {
        let snState = require(`../util/runs/commands/search-nest/state.js`);
        return snState.run(bot, message);
    };

    if(nestprop === "Region" || nestprop === "R") {
        let snRegion = require(`../util/runs/commands/search-nest/region.js`);
        return snRegion.run(bot, message);
    };

    if(nestprop === "Pokemon" || nestprop === "P" || nestprop === "Pokémon") {
        let snPokemon = require(`../util/runs/commands/search-nest/pokemon.js`);
        return snPokemon.run(bot, message);
    };
}

