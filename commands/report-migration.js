module.exports.command = {
    name: "report-migration",
    aliases: ["rmigration"],
    description: "Sets all nests created by the current server to unreported. Listed nests and migration details in the nest channel will update live.",
    category: "Migration",
    usage: "",
    example: "",
    permission: "**Role:** Admin | **Channel:**Admin & Nest",
    link: "https://pokecloud.gitbook.io/pokecloud/commands#report-migration",
    arguments: ""
}

const Discord = require("discord.js")

const success = require("../util/data/success.json")
const caution = require("../util/data/caution.json")
const times = require("../util/data/times.json")

exports.run = (bot, message) => {

    userimage = message.author.avatarURL
    let user = message.mentions.users.first() || message.author
    const username = message.guild.member(user).displayName

    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')

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
    const language = require(`../util/responses/${serverlanguage}/migration/details.json`)
    const basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)

    // send inital message
    var confirm = new Discord.RichEmbed()
        .setAuthor("Migration Reported", success.image)
        .setColor(caution.color)
        .setTitle("All nests for this server are being updated")  
        .setFooter("This process takes 10-30 seconds on average.")
    message.channel.send({embed: confirm}).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else {
            if(message.channel.id === nestchannel) {
                // if clean replies is false and is the nest channel
                message.delete(times.thirtysec)
            }
        }
    });

    const migrationTagChannel = bot.guildSettings.get(message.guild.id, 'migration.tagchannel')
    const migrationTagole = bot.guildSettings.get(message.guild.id, 'migration.tagrole')
    const migrationTag = bot.guildSettings.get(message.guild.id, 'migration.tag')

    if(migrationTag === true) {
        var mtagembed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("A nest migration has been reported!")  
            .setDescription("Head out to your local nests and reported back what you've discovered.")
            .setFooter("Reported by")
        bot.channels.get(migrationTagChannel).message.channel.send({embed: mtagembed})
    };
    
    bot.defaultNest.keyArray().forEach(key =>{
        if(bot.defaultNest.get(key, `serverid`) === message.guild.id) {
            let pogo = bot.defaultNest.get(key, `pokemon.current.name`)
            bot.defaultNest.set(key, `?`, `pokemon.current.name`)
            let pogoImg = bot.defaultNest.get(key, `pokemon.current.image`)
            bot.defaultNest.set(key, pogo, `pokemon.previous.name`)
            bot.defaultNest.set(key, pogoImg, `pokemon.previous.image`)
            bot.defaultNest.set(key, `https://vignette.wikia.nocookie.net/pokemongo/images/0/06/Sighting_Grass.png/revision/latest?cb=20161003231726`, `pokemon.current.image`)

            nestToEdit = bot.defaultNest.get(key, `messageid`)
            if(nestToEdit) {
                let serverNestChannel = bot.defaultNest.get(key, 'channel')
                // fetch the message
                bot.channels.get(serverNestChannel).fetchMessage(nestToEdit).then(editEmbed => {               
                    defPogoImg = bot.defaultNest.get(key, `pokemon.current.image`)
                    const { RichEmbed } = require ('discord.js');
                    const embed = new RichEmbed (editEmbed.embeds[0])
                        embed.fields.length = 0
                        embed.addField(basicNestLanguage.unreported.title, basicNestLanguage.unreported.description)
                        embed.setThumbnail(defPogoImg)
                        embed.setFooter("Migration by " + username, userimage)
                    editEmbed.edit(embed)
                    .catch(console.error)
                }).catch(err => {
                    return;
                });
            };
        };
    });


    //////////// migration 
    const timezone = bot.guildSettings.get(message.guild.id, 'location.timezone')
    const nextmigdate = bot.guildSettings.get(message.guild.id, 'migration.dates.next')
    const migrations = require(`../util/data/migrations/${timezone}.json`)

    // create current date
    const now = new Date();

    // per server timezone
    if(timezone === "Central") {
        today = new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"}));
        twoWeeks = new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"}));
        twoWeeks.setDate(twoWeeks.getDate() + 14);
    }

    if(timezone === "Eastern") {
        today = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        twoWeeks = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        twoWeeks.setDate(twoWeeks.getDate() + 14);
    }

    if(timezone === "Mountain") {
        today = new Date(now.toLocaleString("en-US", {timeZone: "America/Denver"}));
        twoWeeks = new Date(now.toLocaleString("en-US", {timeZone: "America/Denver"}));
        twoWeeks.setDate(twoWeeks.getDate() + 14);
    }

    if(timezone === "Pacific") {
        today = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        twoWeeks = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        twoWeeks.setDate(twoWeeks.getDate() + 14);
    }

    if(timezone === "Utc0") {
        today = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Lisbon"}));
        twoWeeks = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Lisbon"}));
        twoWeeks.setDate(twoWeeks.getDate() + 14);
    }
    
    if(timezone === "Utc1") {
        today = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Berlin"}));
        twoWeeks = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Berlin"}));
        twoWeeks.setDate(twoWeeks.getDate() + 14);
    }

    if(timezone === "Utc2") {
        today = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Kiev"}));
        twoWeeks = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Kiev"}));
        twoWeeks.setDate(twoWeeks.getDate() + 14);
    }

   
    // format date
    hours = (today.getHours());
    if(hours==0){
        hours=12;
    } else if(hours>12) {
        hours=hours%12;
    }
    minutes = today.getMinutes();
    ampm = today.getHours() > 11 ? "PM":"AM";
    addzero = minutes < 9 ? "0":""
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // generate last migration
    let lastMig = days[today.getDay()] + " " + months[today.getMonth()] + ", " + today.getDate() + " at " + hours + ":" + addzero + today.getMinutes() + " " + ampm
    // save todays migration date
    bot.guildSettings.set(message.guild.id, lastMig, "migration.dates.last")
    
    let nextMig = days[twoWeeks.getDay()] + " " + months[twoWeeks.getMonth()] + ", " + twoWeeks.getDate() + " at " + migrations.time
    var todaysDate = days[today.getDay()] + " " + months[today.getMonth()] + ", " + today.getDate() + " at " + migrations.time

    // get message id
    const migmsgid = bot.guildSettings.get(message.guild.id, 'migration.messageid')
    
    // check to see if it is a event migration
    if (todaysDate === nextmigdate) {   
        bot.guildSettings.set(message.guild.id, nextMig, "migration.dates.next")
        bot.channels.get(nestchannel).fetchMessage(migmsgid).then(editEmbed => {
            const { RichEmbed } = require ('discord.js');
            const embed = new RichEmbed (editEmbed.embeds[0])
                embed.fields.length = 0
                embed.addField(language.field.one.title, `◀ **${language.field.one.description.a}:** ${lastMig}\n▶ **${language.field.one.description.b}:** ${nextMig}`)
            editEmbed.edit(embed)
        }).catch(err => {
            return
        });
    } else { 
        // regular migration
        bot.channels.get(nestchannel).fetchMessage(migmsgid).then(editEmbed => {
            const { RichEmbed } = require ('discord.js');
            const embed = new RichEmbed (editEmbed.embeds[0])
                embed.fields.length = 0
                embed.addField(language.field.one.title, `◀ **${language.field.one.description.a}:** ${lastMig}\n▶ **${language.field.one.description.b}:** ${nextmigdate}`)
            editEmbed.edit(embed)
        }).catch(err => {
            return;
        });
    };
};