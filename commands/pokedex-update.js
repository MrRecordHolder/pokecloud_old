module.exports.command = {
    name: "pokedex-update",
    aliases: ["pu"],
    description: "Updates a Pokemon in the PokeCloud's Pokedex. Must use the English name.",
    category: "Pokedex",
    usage: "<pokemon>, <argument>, <value>",
    example: "bulbasaur",
    permission: "**Role:** Pokedex | **Channel:** Any",
    arguments: "`german` | `french` | `japanese`"
}

// $pu bulbasaur, german, bisasam

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

    // split the args
    let output = args.join(" ").trim().split(",");
    //capitalize word function
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    if(!output[0]) {
        // error: no pokemon specified 
        return;
    };

    let Pokedex_english = capitalize_Words(output[0]).trim();
    let Pokedex_english_low = output[0].toLowerCase().trim();

    if(!bot.Pokedex.get(Pokedex_english)) {
        var embed = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(Pokedex_english + ` does not exist in the Pokedex`)
        return message.channel.send({embed: embed}).then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    }

    if(!output[1]) {
        var embed = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle("Must provide a argument to update")
            .setDescription(this.command.arguments)
        return message.channel.send({embed: embed}).then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    };

    if(!output[2]) {
        var embed = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(`Must provide the new value`)
            .setDescription(this.command.usage)
        return message.channel.send({embed: embed}).then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    };

    let prop = output[1].toLowerCase().trim();
    let value = capitalize_Words(output[2]).trim();

    let Pokedex_shiny = bot.Pokedex.get(Pokedex_english, 'shiny')
    let Pokedex_dex = bot.Pokedex.get(Pokedex_english, 'dex')

    let userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    let username = message.guild.member(user).displayName

    if(prop === "german") {
        bot.Pokedex.set(Pokedex_english, value, 'name.german');
        var embed = new Discord.RichEmbed()
            embed.setColor(success.color)
            embed.setTitle(Pokedex_english + "'s German name has been updated")
            embed.setDescription(`English: ${Pokedex_english}\nGerman: ${value}`)
            if(Pokedex_shiny === true) {
                embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${Pokedex_dex}-${Pokedex_english.toLowerCase()}-shiny@3x.png?raw=true`);
            } else {
                embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${Pokedex_dex}-${Pokedex_english.toLowerCase()}@3x.png?raw=true`);
            };
            embed.setFooter(username, userimage)
        return message.channel.send({embed: embed}).then(deleteIT => {
            bot.channels.get(mainserver.home.pokedex).send({embed: embed});
            deleteIT.delete(times.thirtysec)
        });
    }

    if(prop === "french") {
        bot.Pokedex.set(Pokedex_english, value, 'name.french');
        var embed = new Discord.RichEmbed()
            embed.setColor(success.color)
            embed.setTitle(Pokedex_english + "'s French name has been updated to " + value)
            embed.setDescription(`English: ${Pokedex_english}\nFrench: ${value}`)
            if(Pokedex_shiny === true) {
                embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${Pokedex_dex}-${Pokedex_english.toLowerCase()}-shiny@3x.png?raw=true`);
            } else {
                embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${Pokedex_dex}-${Pokedex_english.toLowerCase()}@3x.png?raw=true`);
            };
            embed.setFooter(username, userimage)
        return message.channel.send({embed: embed}).then(deleteIT => {
            bot.channels.get(mainserver.home.pokedex).send({embed: embed});
            deleteIT.delete(times.thirtysec)
        });
    }

    if(prop === "japanese") {
        bot.Pokedex.set(Pokedex_english, value, 'name.japanese');
        var embed = new Discord.RichEmbed()
            embed.setColor(success.color)
            embed.setTitle(Pokedex_english + "'s Japanese name has been updated to " + value)
            embed.setDescription(`English: ${Pokedex_english}\nJapanese: ${value}`)
            if(Pokedex_shiny === true) {
                embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${Pokedex_dex}-${Pokedex_english.toLowerCase()}-shiny@3x.png?raw=true`);
            } else {
                embed.setThumbnail(`https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/en/${Pokedex_dex}-${Pokedex_english.toLowerCase()}@3x.png?raw=true`);
            };
            embed.setFooter(username, userimage)
        return message.channel.send({embed: embed}).then(deleteIT => {
            bot.channels.get(mainserver.home.pokedex).send({embed: embed});
            deleteIT.delete(times.thirtysec)
        });
    } else {
        var embed = new Discord.RichEmbed()
            .setAuthor(errors.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(prop + ` is not a valid argument`)
        return message.channel.send({embed: embed}).then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    }
    
};