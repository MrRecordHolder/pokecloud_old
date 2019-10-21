module.exports.command = {
    name: "revert-migration",
    aliases: ["revmigration"],
    description: "Sets all nests created by the current server to the nesting species that was reported BEFORE the last migration.. All nests listed in the nest channel will update live and search results will be updated for the next search. This command also edits the migration details message listed in the nest channel to the proper dates.",
    category: "Migration",
    usage: "",
    example: "",
    permission: "**Role:** Admin | **Channel:** Admin & Nest",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#revert-migration",
    arguments: ""
}

const Discord = require("discord.js")
const success = require("../util/data/success.json")
const caution = require("../util/data/caution.json")
const times = require("../util/data/times.json")

exports.run = (bot, message) => {

    userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    username = message.guild.member(user).displayName

    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')

    // admin role check
    if (!message.member.roles.some(role => role.name === adminrole)) {
        let checkrole = require(`../util/runs/errors/permissions/admin.js`);
        return checkrole.run(bot, message);
    };

    // require guildSettings
    const adminchannel = bot.guildSettings.get(message.guild.id, 'channels.admin')
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')

    // check for admin & nest channel
    if(message.channel.id !== adminchannel && message.channel.id !== nestchannel) {
        let channelcheck = require(`../util/runs/errors/channels/nestadmin.js`);
        return channelcheck.run(bot, message);
    };
    

    // require per language responses
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)


    // send inital message
    var confirm = new Discord.RichEmbed()
        .setAuthor("Revert Migration Reported", success.image)
        .setColor(caution.color)
        .setTitle("All nests for this server are being updated")  
        .setFooter("This process takes 10-30 seconds on average.")
    message.channel.send({embed: confirm})
    .then(deleteIT => {
        deleteIT.delete(times.thirtysec)
    });


    bot.defaultNest.keyArray().forEach(key =>{
        if(bot.defaultNest.get(key, `serverid`) === message.guild.id) {
            let previouspogo = bot.defaultNest.get(key, `pokemon.previous.name`)
            bot.defaultNest.set(key, previouspogo, `pokemon.current.name`)
            let previouspogoimg = bot.defaultNest.get(key, `pokemon.previous.image`)
            bot.defaultNest.set(key, previouspogoimg, `pokemon.current.image`)
            nestToEdit = bot.defaultNest.get(key, `messageid`)
            if(nestToEdit) {
                let serverIDn = bot.defaultNest.get(key, 'serverid')
                let serverNestChannel = bot.guildSettings.get(serverIDn, 'channels.nest')
                bot.channels.get(serverNestChannel).fetchMessage(nestToEdit).then(editEmbed => {              
                    const { RichEmbed } = require ('discord.js');
                    const embed = new RichEmbed (editEmbed.embeds[0])
                    // clear pokemon info
                    embed.fields.length = 0
                    // pokemon info
                    if(previouspogo === "?") {
                        embed.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/spawn.png?raw=true")
                        embed.addField(basicNestLanguage.unreported.title, basicNestLanguage.unreported.description)
                    } else {
                        // get pokedex file
                        pokemon = require(`../pokedex/${serverlanguage}/${previouspogo}.json`)
                        // emojis
                        primaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokemon.type.primary}`)
                        SecondaryTypeEmoji = bot.emojis.find(emoji => emoji.name === `Icon_${pokemon.type.secondary}`)
                        primaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokemon.weatherboost.primary}`)
                        secondaryweatherboostemoji = bot.emojis.find(emoji => emoji.name === `Weather_Icon_${pokemon.weatherboost.secondary}`)
                        shinyEmoji = bot.emojis.find(emoji => emoji.name === `Icon_Shiny`)

                        embed.setThumbnail(previouspogoimg)
                        if(pokemon.shiny === true) {
                            if(pokemon.type.secondary === "") {
                                embed.addField("#" + pokemon.dex + " " + pokemon.name + " " + shinyEmoji, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                            } else {
                                embed.addField("#" + pokemon.dex + " " + pokemon.name + " " + shinyEmoji, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                            }
                        } else {
                            if(pokemon.type.secondary === "") {
                                embed.addField("#" + pokemon.dex + " " + pokemon.name, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary}`)
                            } else {
                                embed.addField("#" + pokemon.dex + " " + pokemon.name, `${basicNestLanguage.type}: ${primaryTypeEmoji} ${pokemon.type.primary} ${SecondaryTypeEmoji} ${pokemon.type.secondary}\n${basicNestLanguage.boost}: ${primaryweatherboostemoji} ${pokemon.weatherboost.primary} ${secondaryweatherboostemoji} ${pokemon.weatherboost.secondary}`)
                            }                    
                        };
                    };
                    embed.setFooter("Migration reverted by " + username, userimage)
                    embed.setTimestamp()
                    editEmbed.edit(embed);
                }).catch(err => {
                    return;
                });
            };
        };
    })
};