exports.run = (bot, message) => {

    let mainserver = require(`../../../data/server.json`)
    if(!bot.guilds.get(mainserver.home.id).members.get(message.author.id).roles.some(role => role.id === mainserver.patreon.supporter)) {
    var patreon = new Discord.RichEmbed()
            .setColor(errors.color)
            .setAuthor("Error", errors.image)
            .setTitle("Must be a Patreon supporter to use this feature")   
        return message.channel.send({embed: patreon})
        .then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    };

    
    // set new data value
    bot.defaultNest.set(nestKey, nestDataCap, 'alias')
    const alias = bot.defaultNest.get(nestKey, 'alias')

    // send confirmation
    var CONFIRM = new Discord.RichEmbed()
        CONFIRM.setAuthor(success.code.zero, success.image)
        CONFIRM.setColor(success.color)
        CONFIRM.setTitle(`${nestName} ${success.response.updated.c} ${alias} ${success.response.updated.d}`)
        CONFIRM.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/gear.png?raw=true")
        CONFIRM.setTimestamp();
    message.channel.send({embed: CONFIRM}).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else {
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {});
            };
        }
    });
};