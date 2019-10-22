exports.run = (bot, message) => {
    // set new data value
    bot.defaultNest.set(nestKey, nestDataCap, 'location.state')
    const neststate = bot.defaultNest.get(nestKey, 'location.state')

    // send confirmation
    var CONFIRM = new Discord.RichEmbed()
        CONFIRM.setAuthor(success.code.zero, success.image)
        CONFIRM.setColor(success.color)
        CONFIRM.setTitle(`${nestName} ${success.response.updated.a} ${neststate}`)
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
};