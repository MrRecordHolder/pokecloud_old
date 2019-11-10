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

    

    if(output[0].trim().toLowerCase() === "nest") {
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
    };        
}