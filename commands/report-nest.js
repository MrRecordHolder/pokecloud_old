module.exports.command = {
    name: "report-nest",
    aliases: ["rn"],
    description: "Changes the current Pokemon nesting at the specified park. Replace <pokemon> with <?> to clear the current report.",
    category: "Nest",
    usage: "<nest name>, <pokemon>",
    example: "hilton park, pikachu",
    permission: "**Role:** Admin & Nest Manager | **Channel:** Nest & Admin",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#report-nest",
    arguments: ""
};

const Discord = require("discord.js")
const times = require("../util/data/times.json")

exports.run = (bot, message, args) => {
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    const nestrole = bot.guildSettings.get(message.guild.id, 'roles.nest')

    let guildSettings_language = bot.guildSettings.get(message.guild.id, 'language');
    let guildSettings_language_low = guildSettings_language.toLowerCase();
    let guildSettings_c_replies = bot.guildSettings.get(message.guild.id, 'clean.commands')
    let guildSettings_prefix = bot.guildSettings.get(message.guild.id, 'prefix')

    let nests = require(`../util/responses/${guildSettings_language}/nests.json`)
    let error = require(`../util/responses/${guildSettings_language}/error.json`)
    let success = require(`../util/responses/${guildSettings_language}/success.json`)
    
    if (!message.member.roles.some(role => role.name === adminrole) && !message.member.roles.some(role => role.name === nestrole)) {
        var embed = new Discord.RichEmbed()
            .setAuthor(error.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(`${error.response.permission.role.a} **${adminrole}** | **${nestrole}** ${error.response.permission.role.b}`)
        return message.channel.send({embed: embed}).then(deleteIT => {
            if(guildSettings_c_replies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    };

    let output = args.join(" ").trim().split(",")
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    if(!output[0] || !output[1]){
        var embed = new Discord.RichEmbed()
            .setAuthor(error.code.zero, errors.image)
            .setColor(errors.color)
            .setTitle(error.response.arg.nameANDpokemon)
            .addField(error.code.two, `${guildSettings_prefix}${this.command.aliases} ${this.command.example}`)
        return message.channel.send({embed: embed}).then(deleteIT => {
            if(guildSettings_c_replies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    };

    let defaultNest_name = capitalize_Words(output[0]);
    let defaultNest_key = `${message.guild.id}-${defaultNest_name}`;

    if(!bot.defaultNest.has(defaultNest_key)) {
        let defaultNest_key_alias = bot.defaultNest.findKey(val => val.alias === defaultNest_name);
        defaultNest_key = defaultNest_key_alias
    };

    let defaultNest_key_name = bot.defaultNest.get(defaultNest_key, 'name')
    let defaultNest_messageid = bot.defaultNest.get(defaultNest_key, 'messageid')
    let defaultNests_channel = bot.defaultNest.get(defaultNest_key, 'channel')

    let pokedex_key = capitalize_Words(output[1]).trim();
    let pokedex_key_low = output[1].trim().toLowerCase();

    if(pokedex_key === "?" || pokedex_key === "Unreported") {
        bot.defaultNest.set(defaultNest_key, pokedex_key, 'pokemon.current.name')

        bot.channels.get(defaultNests_channel).fetchMessage(defaultNest_messageid).then(editEmbed => {
            const { RichEmbed } = require ('discord.js');
            const embed = new RichEmbed (editEmbed.embeds[0]);
                embed.fields.length = 0;
                embed.setColor('36393F');
                embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
                embed.addField(nests.unreported.title, nests.unreported.description)
            editEmbed.edit(embed);
        }).catch(err => {
            // error: no nest channel
            console.log("Nest channel not found")
        });

        let Discord_message_link = `https://discordapp.com/channels/${message.guild.id}/${defaultNests_channel}/${defaultNest_messageid}`

        var embed = new Discord.RichEmbed()
            embed.setColor('36393F');
            embed.setTitle(defaultNest_key_name + success.response.c);
            embed.setDescription(`\n[**Click here to view the nest**](${Discord_message_link})`)
            embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
        message.channel.send({embed: embed}).then(deleteIT => {
            if(guildSettings_c_replies === true) {               
                deleteIT.delete(times.thirtysec)
            };
        });
    };

    if(!bot.Pokedex.has(pokedex_key)) {
        if(guildSettings_language === "German") {
            let pokedex_key_alias = bot.Pokedex.findKey(key => key.name.german === pokedex_key);
            pokedex_key = pokedex_key_alias
            pokedex_key_low = pokedex_key.toLowerCase();
        };
    };

    let pokedex_nest = bot.Pokedex.get(pokedex_key, 'nest');
    
    if(pokedex_nest === false) {
        // error: pokemon can not nest
    };

    let pokedex_name = bot.Pokedex.get(pokedex_key, `name.${guildSettings_language_low}`)
    let pokedex_dex = bot.Pokedex.get(pokedex_key, 'dex');
    let pokedex_type_p = bot.Pokedex.get(pokedex_key, 'type.primary');
    let pokedex_type_s = bot.Pokedex.get(pokedex_key, 'type.secondary');
    let pokedex_boost_p = bot.Pokedex.get(pokedex_key, 'boost.primary');
    let pokedex_boost_s = bot.Pokedex.get(pokedex_key, 'boost.secondary');
    let pokedex_shiny = bot.Pokedex.get(pokedex_key, 'shiny');

    let type_p_emoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex_type_p}`)
    let type_s_emoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokedex_type_s}`)
    let boost_p_emoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex_boost_p}`)
    let boost_s_emoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokedex_boost_s}`)

    let pogo_img_shiny = `https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/${pokedex_dex}-${pokedex_key_low}-shiny@3x.png?raw=true`;
    let pogo_img = `https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/${pokedex_dex}-${pokedex_key_low}@3x.png?raw=true`;

    bot.defaultNest.set(defaultNest_key, pokedex_name, 'pokemon.current.name')

    bot.channels.get(defaultNests_channel).fetchMessage(defaultNest_messageid).then(editEmbed => {
        const { RichEmbed } = require ('discord.js');
        const embed = new RichEmbed (editEmbed.embeds[0]);
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
        embed.fields.length = 0;
        if(pokedex_shiny === true) {
            let shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)
            embed.setThumbnail(pogo_img_shiny)
            if(pokedex_type_s === "") {
                embed.addField("#" + pokedex_dex + " " + pokedex_name + " " + shinyEmoji, `${nests.type}: ${type_p_emoji} ${pokedex_type_p}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p}`)
            } else {
                embed.addField("#" + pokedex_dex + " " + pokedex_name + " " + shinyEmoji, `${nests.type}: ${type_p_emoji} ${pokedex_type_p} ${type_s_emoji} ${pokedex_type_s}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p} ${boost_s_emoji} ${pokedex_boost_s}`)
            };
        } else {
            embed.setThumbnail(pogo_img)
            if(pokedex_type_s === "") {
                embed.addField("#" + pokedex_dex + " " + pokedex_name, `${nests.type}: ${type_p_emoji} ${pokedex_type_p}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p}`)
            } else {
                embed.addField("#" + pokedex_dex + " " + pokedex_name, `${nests.type}: ${type_p_emoji} ${pokedex_type_p} ${type_s_emoji} ${pokedex_type_s}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p} ${boost_s_emoji} ${pokedex_boost_s}`)
            };
        };
        editEmbed.edit(embed);
    }).catch (err => {
        /////
        // msg not found, list nest
        /////

        let defaultNest_city = bot.defaultNest.get(defaultNest_key, 'location.city')
        let defaultNest_exgyms = bot.defaultNest.get(defaultNest_key, 'exgyms')
        let defaultNest_gyms = bot.defaultNest.get(defaultNest_key, 'gyms')
        let defaultNest_pokestops = bot.defaultNest.get(defaultNest_key, 'pokestops')
        let defaultNest_spawns = bot.defaultNest.get(defaultNest_key, 'spawns')
        let defaultNest_google = bot.defaultNest.get(defaultNest_key, 'location.maps.google')

        const pokestopEmoji = bot.emojis.find(emoji => emoji.id === `587904284100657164`)
        const gymEmoji = bot.emojis.find(emoji => emoji.id === `587905379355066378`)
        const exraidGymEmoji = bot.emojis.find(emoji => emoji.id === `601418167541301258`)
        const ratingEmoji = bot.emojis.find(emoji => emoji.id === `643494686643847179`)
        const spawnEmoji = bot.emojis.find(emoji => emoji.id === `587905573387763724`)

        var embed = new Discord.RichEmbed()
            embed.setTitle("**" + defaultNest_key_name + "** - " + defaultNest_city)
            if(defaultNest_exgyms > 0) {
                embed.setDescription(`[__${nests.directions}__](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${exraidGymEmoji}${nests.exgyms}: ${defaultNest_exgyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
            } else {
                embed.setDescription(`[__${nests.directions}__](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
            };

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
            embed.fields.length = 0;
            if(pokedex_shiny === true) {
                let shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)
                embed.setThumbnail(pogo_img_shiny)
                if(pokedex_type_s === "") {
                    embed.addField("#" + pokedex_dex + " " + pokedex_name + " " + shinyEmoji, `${nests.type}: ${type_p_emoji} ${pokedex_type_p}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p}`)
                } else {
                    embed.addField("#" + pokedex_dex + " " + pokedex_name + " " + shinyEmoji, `${nests.type}: ${type_p_emoji} ${pokedex_type_p} ${type_s_emoji} ${pokedex_type_s}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p} ${boost_s_emoji} ${pokedex_boost_s}`)
                };
            } else {
                embed.setThumbnail(pogo_img)
                if(pokedex_type_s === "") {
                    embed.addField("#" + pokedex_dex + " " + pokedex_name, `${nests.type}: ${type_p_emoji} ${pokedex_type_p}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p}`)
                } else {
                    embed.addField("#" + pokedex_dex + " " + pokedex_name, `${nests.type}: ${type_p_emoji} ${pokedex_type_p} ${type_s_emoji} ${pokedex_type_s}\n${nests.boost}: ${boost_p_emoji} ${pokedex_boost_p} ${boost_s_emoji} ${pokedex_boost_s}`)
                };
            };
        return bot.channels.get(defaultNests_channel).send(embed).then(message => {
            bot.defaultNest.set(defaultNest_key, message.channel.lastMessageID, "messageid")
            bot.defaultNest.set(defaultNest_key, message.channel.id, 'channel')
        }).catch(err => {
            // error: no nest channel
            console.log("Nest channel not found")
        })
    });

    /////
    // send confirmation
    /////

    let Discord_message_link = `https://discordapp.com/channels/${message.guild.id}/${defaultNests_channel}/${defaultNest_messageid}`

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
        embed.setTitle(pokedex_name + " " + success.response.reported.a + " " + defaultNest_key_name + " " + success.response.reported.b);
        embed.setDescription(`\n[**Click here to view the nest**](${Discord_message_link})`)
        if(pokedex_shiny === true) {
            embed.setThumbnail(pogo_img_shiny)
        } else {
            embed.setThumbnail(pogo_img)
        };
    message.channel.send({embed: embed}).then(deleteIT => {
        if(guildSettings_c_replies === true) {               
            deleteIT.delete(times.thirtysec)
        };
    });
};