module.exports.command = {
    name: "list-all-nests",
    aliases: ["lan"],
    description: "Lists all nests created by this community in alphabetical order and allows live reporting, updating and deletion. Optionally enter repoted to list all reported nests or enter a city name to list all nests in that city.",
    category: "Nest",
    usage: "[city name] OR [reported]",
    example: "atlanta",
    permission: "**Role:** Admin | **Channel:** Admin",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#list-all-nests",
    arguments: ""
}

exports.run = (bot, message, args) => {   

    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    
    if (!message.member.roles.some(role => role.name === adminrole)) {
        // error: must have admin or nest role
        return;
    };
    
    const guildSettings_nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    const guildSettings_cityone = bot.guildSettings.get(message.guild.id, 'channels.city.one')
    const guildSettings_citytwo = bot.guildSettings.get(message.guild.id, 'channels.city.two')

    let chanID = message.channel.id

    if(chanID !== guildSettings_nestchannel && chanID !== guildSettings_cityone && chanID !== guildSettings_citytwo) {
        // error: channel not found
        console.log('error here')
        return;
    };

    let output = args.join(" ").trim()
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    let guildSettings_language = bot.guildSettings.get(message.guild.id, 'language');
    let guildSettings_language_low = guildSettings_language.toLowerCase();

    let guildSettings_migration_messageid = bot.guildSettings.get(message.guild.id, 'migration.messageid')
    const guildSettings_lastmigration = bot.guildSettings.get(message.guild.id, 'migration.dates.last')
    const guildSettings_nextmigration = bot.guildSettings.get(message.guild.id, 'migration.dates.next')

    let nests = require(`../util/responses/${guildSettings_language}/nests.json`)

    if(output) {
        if(capitalize_Words(output) === "Reported") {
            bot.defaultNest.keyArray().sort().forEach(defaultNest_key =>{
                if(bot.defaultNest.get(defaultNest_key, `serverid`) === message.guild.id) {
                    
                    let defaultNest_messageid = bot.defaultNest.get(defaultNest_key, 'messageid')
                    let defaultNest_channel = bot.defaultNest.get(defaultNest_key, 'channel')
        
                    bot.channels.get(defaultNest_channel).fetchMessage(defaultNest_messageid).then(oldembed => {
                        if (oldembed) oldembed.delete();               
                    }).catch(err => {
                        // skip deletion
                    });

                    if(bot.defaultNest.get(defaultNest_key, `pokemon.current.name`) !== "?") {            
                        
                        let pokedex_key = bot.defaultNest.get(defaultNest_key, 'pokemon.current.name')
                        let pokedex_key_low = pokedex_key.toLowerCase();
            
                        if(!bot.Pokedex.has(pokedex_key)) {
                            let pokedex_key_german = bot.Pokedex.findKey(key => key.name.german === pokedex_key);
                            pokedex_key = pokedex_key_german
                            pokedex_key_low = pokedex_key.toLowerCase();
                        };
            
                        let defaultNest_key_name = bot.defaultNest.get(defaultNest_key, 'name')
                        let defaultNest_city = bot.defaultNest.get(defaultNest_key, 'location.city')
                        let defaultNest_exgyms = bot.defaultNest.get(defaultNest_key, 'exgyms')
                        let defaultNest_gyms = bot.defaultNest.get(defaultNest_key, 'gyms')
                        let defaultNest_pokestops = bot.defaultNest.get(defaultNest_key, 'pokestops')
                        let defaultNest_spawns = bot.defaultNest.get(defaultNest_key, 'spawns')
                        let defaultNest_google = bot.defaultNest.get(defaultNest_key, 'location.maps.google')
            
                        const pokestopEmoji = bot.emojis.find(emoji => emoji.id === `587904284100657164`)
                        const gymEmoji = bot.emojis.find(emoji => emoji.id === `587905379355066378`)
                        const exraidGymEmoji = bot.emojis.find(emoji => emoji.id === `601418167541301258`)
                        const spawnEmoji = bot.emojis.find(emoji => emoji.id === `587905573387763724`)
            
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
            
                        var embed = new Discord.RichEmbed()
                            embed.setTitle("**" + defaultNest_key_name + "** - " + defaultNest_city)
                            if(defaultNest_exgyms > 0) {
                                embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${exraidGymEmoji}${nests.exgyms}: ${defaultNest_exgyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
                            } else {
                                embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
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
                        return bot.channels.get(guildSettings_nestchannel).send(embed).then(message => {
                            bot.defaultNest.set(defaultNest_key, message.channel.lastMessageID, "messageid")
                            bot.defaultNest.set(defaultNest_key, message.channel.id, 'channel')
                        }).catch(err => {
                            // error: no nest channel
                            console.log("Nest channel not found")
                        });
            
                    };
                };
            });
        };

        bot.defaultNest.keyArray().sort().forEach(defaultNest_key =>{
            if(bot.defaultNest.get(defaultNest_key, `serverid`) === message.guild.id) {
                if(bot.defaultNest.get(defaultNest_key, `location.city`) === capitalize_Words(output)) {

                    let defaultNest_messageid = bot.defaultNest.get(defaultNest_key, 'messageid')
                    let defaultNest_channel = bot.defaultNest.get(defaultNest_key, 'channel')

                    bot.channels.get(defaultNest_channel).fetchMessage(defaultNest_messageid).then(oldembed => {
                        if (oldembed) oldembed.delete();               
                    }).catch(err => {
                        // skip deletion
                    });

                    let pokedex_key = bot.defaultNest.get(defaultNest_key, 'pokemon.current.name')
                    let pokedex_key_low = pokedex_key.toLowerCase();

                    let defaultNest_key_name = bot.defaultNest.get(defaultNest_key, 'name')
                    let defaultNest_city = bot.defaultNest.get(defaultNest_key, 'location.city')
                    let defaultNest_exgyms = bot.defaultNest.get(defaultNest_key, 'exgyms')
                    let defaultNest_gyms = bot.defaultNest.get(defaultNest_key, 'gyms')
                    let defaultNest_pokestops = bot.defaultNest.get(defaultNest_key, 'pokestops')
                    let defaultNest_spawns = bot.defaultNest.get(defaultNest_key, 'spawns')
                    let defaultNest_google = bot.defaultNest.get(defaultNest_key, 'location.maps.google')

                    const pokestopEmoji = bot.emojis.find(emoji => emoji.id === `587904284100657164`)
                    const gymEmoji = bot.emojis.find(emoji => emoji.id === `587905379355066378`)
                    const exraidGymEmoji = bot.emojis.find(emoji => emoji.id === `601418167541301258`)
                    const spawnEmoji = bot.emojis.find(emoji => emoji.id === `587905573387763724`)

                    if(pokedex_key === "?") {
                        var embed = new Discord.RichEmbed()
                            embed.setTitle("**" + defaultNest_key_name + "** - " + defaultNest_city)
                            if(defaultNest_exgyms > 0) {
                                embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${exraidGymEmoji}${nests.exgyms}: ${defaultNest_exgyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
                            } else {
                                embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
                            };
                            embed.fields.length = 0;
                            embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
                            embed.addField(nests.unreported.title, nests.unreported.description)
                        return bot.channels.get(guildSettings_nestchannel).send(embed).then(message => {
                            bot.defaultNest.set(defaultNest_key, message.channel.lastMessageID, "messageid")
                            bot.defaultNest.set(defaultNest_key, message.channel.id, 'channel')
                        }).catch(err => {
                            // error: no nest channel
                            console.log("Nest channel not found")
                        });
                    };

                    if(!bot.Pokedex.has(pokedex_key)) {
                        let pokedex_key_german = bot.Pokedex.findKey(key => key.name.german === pokedex_key);
                        pokedex_key = pokedex_key_german
                        pokedex_key_low = pokedex_key.toLowerCase();
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

                    var embed = new Discord.RichEmbed()
                        embed.setTitle("**" + defaultNest_key_name + "** - " + defaultNest_city)
                        if(defaultNest_exgyms > 0) {
                            embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${exraidGymEmoji}${nests.exgyms}: ${defaultNest_exgyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
                        } else {
                            embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
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
                    return bot.channels.get(guildSettings_nestchannel).send(embed).then(message => {
                        bot.defaultNest.set(defaultNest_key, message.channel.lastMessageID, "messageid")
                        bot.defaultNest.set(defaultNest_key, message.channel.id, 'channel')
                    }).catch(err => {
                        // error: no nest channel
                        console.log("Nest channel not found")
                    });
                    
                    
                  
                };
            };
        });

        message.channel.fetchMessage(guildSettings_migration_messageid).then(oldmigration => {
            if (oldmigration) oldmigration.delete();               
        }).catch(err => {
            // skip deletion
        });
        
        var MIGATION = new Discord.RichEmbed()
            MIGATION.setColor("RANDOM")
            MIGATION.setTitle(nests.migration.title)
            MIGATION.setDescription(nests.migration.description)
            MIGATION.addField(nests.migration.field.one.title, `◀ **${nests.migration.field.one.description.a}:** ${guildSettings_lastmigration}\n▶ **${nests.migration.field.one.description.b}:** ${guildSettings_nextmigration}`)
            MIGATION.setFooter(`${nests.migration.footer} ${message.guild.name}`)
        return message.channel.send({embed: MIGATION}).then(message => {
            bot.guildSettings.set(message.guild.id, message.channel.lastMessageID, "migration.messageid")
        });
    };

    bot.defaultNest.keyArray().sort().forEach(defaultNest_key =>{
        if(bot.defaultNest.get(defaultNest_key, `serverid`) === message.guild.id) {

            let defaultNest_messageid = bot.defaultNest.get(defaultNest_key, 'messageid')
            let defaultNest_channel = bot.defaultNest.get(defaultNest_key, 'channel')

            bot.channels.get(defaultNest_channel).fetchMessage(defaultNest_messageid).then(oldembed => {
                if (oldembed) oldembed.delete();               
            }).catch(err => {
                // skip deletion
            });

            let pokedex_key = bot.defaultNest.get(defaultNest_key, 'pokemon.current.name')
            let pokedex_key_low = pokedex_key.toLowerCase();

            let defaultNest_key_name = bot.defaultNest.get(defaultNest_key, 'name')
            let defaultNest_city = bot.defaultNest.get(defaultNest_key, 'location.city')
            let defaultNest_exgyms = bot.defaultNest.get(defaultNest_key, 'exgyms')
            let defaultNest_gyms = bot.defaultNest.get(defaultNest_key, 'gyms')
            let defaultNest_pokestops = bot.defaultNest.get(defaultNest_key, 'pokestops')
            let defaultNest_spawns = bot.defaultNest.get(defaultNest_key, 'spawns')
            let defaultNest_google = bot.defaultNest.get(defaultNest_key, 'location.maps.google')

            const pokestopEmoji = bot.emojis.find(emoji => emoji.id === `587904284100657164`)
            const gymEmoji = bot.emojis.find(emoji => emoji.id === `587905379355066378`)
            const exraidGymEmoji = bot.emojis.find(emoji => emoji.id === `601418167541301258`)
            const spawnEmoji = bot.emojis.find(emoji => emoji.id === `587905573387763724`)

            if(pokedex_key === "?") {
                var embed = new Discord.RichEmbed()
                    embed.setColor('36393F');
                    embed.setTitle("**" + defaultNest_key_name + "** - " + defaultNest_city)
                    if(defaultNest_exgyms > 0) {
                        embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${exraidGymEmoji}${nests.exgyms}: ${defaultNest_exgyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
                    } else {
                        embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
                    };
                    embed.fields.length = 0;
                    embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
                    embed.addField(nests.unreported.title, nests.unreported.description)
                return bot.channels.get(guildSettings_nestchannel).send(embed).then(message => {
                    bot.defaultNest.set(defaultNest_key, message.channel.lastMessageID, "messageid")
                    bot.defaultNest.set(defaultNest_key, message.channel.id, 'channel')
                }).catch(err => {
                    // error: no nest channel
                    console.log("Nest channel not found")
                });
            };

            if(!bot.Pokedex.has(pokedex_key)) {
                let pokedex_key_german = bot.Pokedex.findKey(key => key.name.german === pokedex_key);
                pokedex_key = pokedex_key_german
                pokedex_key_low = pokedex_key.toLowerCase();
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

            var embed = new Discord.RichEmbed()
                embed.setTitle("**" + defaultNest_key_name + "** - " + defaultNest_city)
                if(defaultNest_exgyms > 0) {
                    embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${exraidGymEmoji}${nests.exgyms}: ${defaultNest_exgyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
                } else {
                    embed.setDescription(`[${nests.directions}](${defaultNest_google})\n${pokestopEmoji}${nests.pokestops}: ${defaultNest_pokestops} | ${gymEmoji}${nests.gyms}: ${defaultNest_gyms}\n${spawnEmoji}${nests.spawns}: ${defaultNest_spawns}`)
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
            return bot.channels.get(guildSettings_nestchannel).send(embed).then(message => {
                bot.defaultNest.set(defaultNest_key, message.channel.lastMessageID, "messageid")
                bot.defaultNest.set(defaultNest_key, message.channel.id, 'channel')
            }).catch(err => {
                // error: no nest channel
                console.log("Nest channel not found")
            });

        };
    });    

    

    message.channel.fetchMessage(guildSettings_migration_messageid).then(oldmigration => {
        if (oldmigration) oldmigration.delete();               
    }).catch(err => {
        // skip deletion
    });

    var MIGATION = new Discord.RichEmbed()
        MIGATION.setColor("RANDOM")
        MIGATION.setTitle(nests.migration.title)
        MIGATION.setDescription(nests.migration.description)
        MIGATION.addField(nests.migration.field.one.title, `◀ **${nests.migration.field.one.description.a}:** ${guildSettings_lastmigration}\n▶ **${nests.migration.field.one.description.b}:** ${guildSettings_nextmigration}`)
        MIGATION.setFooter(`${nests.migration.footer} ${message.guild.name}`)
    message.channel.send({embed: MIGATION}).then(message => {
        bot.guildSettings.set(message.guild.id, message.channel.lastMessageID, "migration.messageid")
    });
};