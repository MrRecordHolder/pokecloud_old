exports.run = (bot, message) => {
    // set new data value
    bot.defaultNest.set(nestKey, nestDataCap, 'location.city')
    const nestcity = bot.defaultNest.get(nestKey, 'location.city')

    // send confirmation
    var CONFIRM = new Discord.RichEmbed()
        CONFIRM.setAuthor(success.code.zero, success.image)
        CONFIRM.setColor(success.color)
        CONFIRM.setTitle(`${nestName} ${success.response.updated.a} ${nestcity} ${basicNestLanguage.city}`)
        CONFIRM.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/pokemap.png?raw=true")
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

    // fetch the message to edit
    bot.channels.get(nestchannel).fetchMessage(nestmsgid).then(editEmbed => {
        const { RichEmbed } = require ('discord.js');
        embed = new RichEmbed (editEmbed.embeds[0])
            embed.setTitle("**" + nestName + "** - " + nestcity)
            embed.setFooter(basicNestLanguage.city + " " + success.response.updatedby.a + " " + username, userimage)
            embed.setTimestamp()
        editEmbed.edit(embed);
    }).catch(err => {
        console.log(err)
    });
};