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
        let responseObject = bot.Pokedex

        let gen_i = responseObject.filter(v => v.dex <= 151);
        let pokemon_gen_i = gen_i.map(key => [`${key.name.english}`])

        let gen_ii = responseObject.filter(v => v.dex <= 251);
        let gen_ii_new = gen_ii.filter(v => v.dex >= 152);
        let pokemon_gen_ii = gen_ii_new.map(key => [`${key.name.english}`])

        let gen_iii = responseObject.filter(v => v.dex <= 386);
        let gen_iii_new = gen_iii.filter(v => v.dex >= 252);
        let pokemon_gen_iii = gen_iii_new.map(key => [`${key.name.english}`])

        let gen_iv = responseObject.filter(v => v.dex <= 491);
        let gen_iv_new = gen_iv.filter(v => v.dex >= 387);
        let pokemon_gen_iv = gen_iv_new.map(key => [`${key.name.english}`])

        let gen_v = responseObject.filter(v => v.dex <= 631);
        let gen_v_new = gen_v.filter(v => v.dex >= 492);
        let pokemon_gen_v = gen_v_new.map(key => [`${key.name.english}`])

        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`**All Species**`)
            .addField("**Gen 1 - Kanto**", pokemon_gen_i.sort().join(", "))
            .addField("**Gen 2 - Johto**", pokemon_gen_ii.sort().join(", "))
            .addField("**Gen 3 - Hoenn**", pokemon_gen_iii.sort().join(", "))
            .addField("**Gen 4 - Sinnoh**", pokemon_gen_iv.sort().join(", "))
            .addField("**Gen 5 - Unova**", pokemon_gen_v.sort().join(", "))
            .setFooter('Data provide by PokeCloud');
        message.channel.send({embed});
    }

    
    let argument = output[0].trim().toLowerCase()
    if(argument === "nest") {

        if(output[1]) {
            if(output[1].trim().toLowerCase() === "shiny") {
                let responseObject = bot.Pokedex.findAll(`nest`, true)&&bot.Pokedex.findAll(`shiny`, true)

                let gen_i = responseObject.filter(v => v.dex <= 151);
                let pokemon_gen_i = gen_i.map(key => [`${key.name.english}`])

                let gen_ii = responseObject.filter(v => v.dex <= 251);
                let gen_ii_new = gen_ii.filter(v => v.dex >= 152);
                let pokemon_gen_ii = gen_ii_new.map(key => [`${key.name.english}`])

                let gen_iii = responseObject.filter(v => v.dex <= 386);
                let gen_iii_new = gen_iii.filter(v => v.dex >= 252);
                let pokemon_gen_iii = gen_iii_new.map(key => [`${key.name.english}`])

                let gen_iv = responseObject.filter(v => v.dex <= 491);
                let gen_iv_new = gen_iv.filter(v => v.dex >= 387);
                let pokemon_gen_iv = gen_iv_new.map(key => [`${key.name.english}`])

                let gen_v = responseObject.filter(v => v.dex <= 631);
                let gen_v_new = gen_v.filter(v => v.dex >= 492);
                let pokemon_gen_v = gen_v_new.map(key => [`${key.name.english}`])

                var embed = new Discord.RichEmbed()
                    embed.setColor("RANDOM")
                    embed.setTitle(`**Nesting (Shiny) Species**`)
                    if(pokemon_gen_i.length > 0) {
                        embed.addField("**Gen 1 - Kanto**", pokemon_gen_i.sort().join(", "))
                    }
                    if(pokemon_gen_ii.length > 0) {
                        embed.addField("**Gen 2 - Johto**", pokemon_gen_ii.sort().join(", "))
                    }
                    if(pokemon_gen_iii) {
                        embed.addField("**Gen 3 - Hoenn**", pokemon_gen_iii.sort().join(", "))
                    }
                    if(pokemon_gen_iv.length > 0) {
                        embed.addField("**Gen 4 - Sinnoh**", pokemon_gen_iv.sort().join(", "))
                    }
                    if(pokemon_gen_v.length > 0) {
                        embed.addField("**Gen 5 - Unova**", pokemon_gen_v.sort().join(", "))
                    }
                    embed.setFooter('Data provide by PokeCloud');
                return message.channel.send({embed});
            };
        };

        let responseObject = bot.Pokedex.findAll(`nest`, true)

        let gen_i = responseObject.filter(v => v.dex <= 151);
        let pokemon_gen_i = gen_i.map(key => [`${key.name.english}`])

        let gen_ii = responseObject.filter(v => v.dex <= 251);
        let gen_ii_new = gen_ii.filter(v => v.dex >= 152);
        let pokemon_gen_ii = gen_ii_new.map(key => [`${key.name.english}`])

        let gen_iii = responseObject.filter(v => v.dex <= 386);
        let gen_iii_new = gen_iii.filter(v => v.dex >= 252);
        let pokemon_gen_iii = gen_iii_new.map(key => [`${key.name.english}`])

        let gen_iv = responseObject.filter(v => v.dex <= 491);
        let gen_iv_new = gen_iv.filter(v => v.dex >= 387);
        let pokemon_gen_iv = gen_iv_new.map(key => [`${key.name.english}`])

        let gen_v = responseObject.filter(v => v.dex <= 631);
        let gen_v_new = gen_v.filter(v => v.dex >= 492);
        let pokemon_gen_v = gen_v_new.map(key => [`${key.name.english}`])

        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`**Nesting Species**`)
            .addField("**Gen 1 - Kanto**", pokemon_gen_i.sort().join(", "))
            .addField("**Gen 2 - Johto**", pokemon_gen_ii.sort().join(", "))
            .addField("**Gen 3 - Hoenn**", pokemon_gen_iii.sort().join(", "))
            .addField("**Gen 4 - Sinnoh**", pokemon_gen_iv.sort().join(", "))
            .addField("**Gen 5 - Unova**", pokemon_gen_v.sort().join(", "))
            .setFooter('Data provide by PokeCloud');
        message.channel.send({embed});
    } else {

        let guildSettings_language = bot.guildSettings.get(message.guild.id, 'language');
        let guildSettings_language_low = guildSettings_language.toLowerCase();

        let pokedex_key = capitalize_Words(output[0]).trim();
        let pokedex_key_low = output[0].trim().toLowerCase();

        let pokedex_name = bot.Pokedex.get(pokedex_key, `name.${guildSettings_language_low}`)
    
        let pokedex_dex = bot.Pokedex.get(pokedex_key, 'dex');
        let pokedex_type_p = bot.Pokedex.get(pokedex_key, 'type.primary');
        let pokedex_type_s = bot.Pokedex.get(pokedex_key, 'type.secondary');
        let pokedex_boost_p = bot.Pokedex.get(pokedex_key, 'boost.primary');
        let pokedex_boost_s = bot.Pokedex.get(pokedex_key, 'boost.secondary');
        let pokedex_shiny = bot.Pokedex.get(pokedex_key, 'shiny');
        let pokedex_nest = bot.Pokedex.get(pokedex_key, 'nest');

        let nests = require(`../util/responses/${guildSettings_language}/nests.json`)

        let type_p_emoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex_type_p}`)
        let type_s_emoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex_type_s}`)
        let boost_p_emoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex_boost_p}`)
        let boost_s_emoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex_boost_s}`)

        let pogo_img_shiny = `https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/${pokedex_dex}-${pokedex_key_low}-shiny@3x.png?raw=true`;
        let pogo_img = `https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/${pokedex_dex}-${pokedex_key_low}@3x.png?raw=true`;

        if(bot.Pokedex.has(pokedex_key)) {
            var embed = new Discord.RichEmbed()
            if(pokedex_type_p === "Normal") {
                embed.setColor('CCD081')
            }
            if(pokedex_type_p === "Fighting") {
                embed.setColor('AE4F3C')
            }
            if(pokedex_type_p === "Psychic") {
                embed.setColor('D47FB3')
            }
            if(pokedex_type_p === "Dragon") {
                embed.setColor('494788')
            }
            if(pokedex_type_p === "Water") {
                embed.setColor('6DA0D0')
            }
            if(pokedex_type_p === "Fairy") {
                embed.setColor('FFC3D2')
            }
            if(pokedex_type_p === "Ice") {
                embed.setColor('BDEAF5')
            }
            if(pokedex_type_p === "Flying") {
                embed.setColor('C8AFD8')
            }
            if(pokedex_type_p === "Ghost") {
                embed.setColor('7F6193')
            }
            if(pokedex_type_p === "Fire") {
                embed.setColor('FF9051')
            }
            if(pokedex_type_p === "Steel") {
                embed.setColor('CECECE')
            }
            if(pokedex_type_p === "Grass") {
                embed.setColor('79CB7B')
            }
            if(pokedex_type_p === "Ground") {
                embed.setColor('DEE1A6')
            }
            if(pokedex_type_p === "Rock") {
                embed.setColor('AAAC72')
            }
            if(pokedex_type_p === "Dark") {
                embed.setColor('6F635B')
            }
            if(pokedex_type_p === "Electric") {
                embed.setColor('EEFC46')
            }
            if(pokedex_type_p === "Poison") {
                embed.setColor('7A5289')
            }
            if(pokedex_type_p === "Bug") {
                embed.setColor('B1C858')
            }
            if(pokedex_shiny === true) {
                let shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)
                embed.setThumbnail(pogo_img_shiny)
                if(pokedex_type_s === "") {
                    embed.addField("#" + pokedex_dex + " " + pokedex_name + " " + shinyEmoji, `${nests.type}: ${type_p_emoji} ${pokedex_type_p}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p}\n Nesting: ${pokedex_nest}`)
                } else {
                    embed.addField("#" + pokedex_dex + " " + pokedex_name + " " + shinyEmoji, `${nests.type}: ${type_p_emoji} ${pokedex_type_p} ${type_s_emoji} ${pokedex_type_s}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p} ${boost_s_emoji} ${pokedex_boost_s}\n Nesting: ${pokedex_nest}`)
                };
            } else {
                embed.setThumbnail(pogo_img)
                if(pokedex_type_s === "") {
                    embed.addField("#" + pokedex_dex + " " + pokedex_name, `${nests.type}: ${type_p_emoji} ${pokedex_type_p}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p}\n Nesting: ${pokedex_nest}`)
                } else {
                    embed.addField("#" + pokedex_dex + " " + pokedex_name, `${nests.type}: ${type_p_emoji} ${pokedex_type_p} ${type_s_emoji} ${pokedex_type_s}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p} ${boost_s_emoji} ${pokedex_boost_s}\n Nesting: ${pokedex_nest}`)
                };
            };
            message.channel.send({embed});
        };
    }      
}