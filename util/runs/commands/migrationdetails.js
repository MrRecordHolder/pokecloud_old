const Discord = require("discord.js")
exports.run = (bot, message) => {
    // require guildSettings
    const lmigrationdate = bot.guildSettings.get(message.guild.id, 'migration.dates.last')
    const nmigrationdate = bot.guildSettings.get(message.guild.id, 'migration.dates.next')
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    // require per language responses
    const language = require(`../../responses/${serverlanguage}/migration/details.json`)
    // list the migration message    
    var MIGATION = new Discord.RichEmbed()
        MIGATION.setColor("RANDOM")
        MIGATION.setTitle(language.title)
        MIGATION.setDescription(language.description)
        MIGATION.addField(language.field.one.title, `◀ **${language.field.one.description.a}:** ${lmigrationdate}\n▶ **${language.field.one.description.b}:** ${nmigrationdate}`)
        MIGATION.setFooter(`${language.footer} ${message.guild.name}`)
    message.channel.send({embed: MIGATION}).then(message => {
        // set the message id
        bot.guildSettings.set(message.guild.id, message.channel.lastMessageID, "migration.messageid")
    });
}