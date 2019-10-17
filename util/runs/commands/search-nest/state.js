exports.run = (bot, message) => {
    function capitalize_Words(output) {
        return output.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    usersearch = bot.defaultNest.filter(v => v.location.state === nestpropvalue);

    if(output[2]) {
        sall = capitalize_Words(output[2]).trim(" ")
        if(sall === "All") {
            eachnest = usersearch.map(key => [`📍 [**${key.name}**](${key.location.maps.google}) - ${key.pokemon.current.name}`])
            embed.setTitle(basicNestLanguage.search.worldwide)
            embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${nestpropvalue}.`)
        }
    } else {
        reportedstatewide = usersearch.filter(v => v.pokemon.current.name !== "?")
        eachnest = reportedstatewide.map(key => [`📍 [**${key.name}**](${key.location.maps.google}) - ${key.pokemon.current.name}`])
        embed.setTitle(basicNestLanguage.search.statewide)
        embed.setFooter(`${eachnest.sort().slice(0, 0).length} - ${eachnest.sort().slice(0, 10).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${serverstate}`)
    }
        
    embed.setColor("RANDOM")
    embed.setDescription(eachnest.sort().slice(0, 10))
    // send first 10 nests
    message.channel.send(embed);

    // wait then send nests 11-20
    setTimeout(function(){
        if(eachnest.length > 10) {
            embed.setTitle("")
            embed.setDescription(eachnest.sort().slice(10, 20))
            if(output[2]) {
                if(sall === "All") {
                    embed.setFooter(`${eachnest.sort().slice(0, 11).length} - ${eachnest.sort().slice(0,0).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${nestpropvalue}`)
                }
            } else {                    
                embed.setFooter(`${eachnest.sort().slice(0, 11).length} - ${eachnest.sort().slice(0, 20).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${serverstate}`)
            }
            message.channel.send(embed);
        }
    }, 1500);

    // react to see more via private message
    setTimeout(function(){
        if(eachnest.length > 20) {
            embed.description.length = 0
            embed.setTitle("Would you like to see more nests?")
            embed.setDescription("")
            embed.setFooter("👍 = Send results in private message | ❌ = Cancel")
            message.channel.send(embed).then(message => {
                message.react('👍').then(() => message.react('❌'));

                const filter = (reaction, user) => {
                    return ['👍', '❌'].includes(reaction.emoji.name) && user.id === theuser;
                };
                
                message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '👍') {
                        message.delete();
                        embed.setDescription(eachnest.sort().slice(20, 30))
                        if(output[2]) {
                            if(sall === "All") {
                                embed.setTitle(basicNestLanguage.search.worldwide)
                                embed.setFooter(`${eachnest.sort().slice(0, 21).length} - ${eachnest.sort().slice(0, 30).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${nestpropvalue}`)
                            }
                        } else {                    
                            embed.setTitle(basicNestLanguage.search.statewide)
                            embed.setFooter(`${eachnest.sort().slice(0, 21).length} - ${eachnest.sort().slice(0, 30).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${serverstate}`)
                        }
                        bot.users.get(theuser).send(embed)

                        // wait then send nests 31-40
                        setTimeout(function(){
                            if(eachnest.length > 30) {
                                embed.setTitle("")
                                embed.setDescription(eachnest.sort().slice(30, 40))
                                if(output[2]) {
                                    if(sall === "All") {
                                        embed.setFooter(`${eachnest.sort().slice(0, 31).length} - ${eachnest.sort().slice(0, 40).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${nestpropvalue}`)
                                    }
                                } else {                    
                                    embed.setFooter(`${eachnest.sort().slice(0, 31).length} - ${eachnest.sort().slice(0, 40).length} ${basicNestLanguage.search.footer.a} ${eachnest.length} ${basicNestLanguage.search.footer.b} ${serverstate}`)
                                }
                                bot.users.get(theuser).send(embed)
                            }
                        }, 1500);
                    } else {
                        // cancel the message
                        message.delete();
                    }
                })
                .catch(collected => {
                    // no reaction made
                    message.delete();
                });
            })
        }
    }, 2300);
}