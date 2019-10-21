exports.run = (bot, message) => {
    // set new data value
    bot.defaultNest.set(nestKey, nestData, 'pokestops')
    const pokestops = bot.defaultNest.get(nestKey, 'pokestops')

    // send confirmation
    var CONFIRM = new Discord.RichEmbed()
        CONFIRM.setAuthor(success.code.zero, success.image)
        CONFIRM.setColor(success.color)

        if(nestData === "1") {
            CONFIRM.setTitle(`${nestName} ${success.response.updated.a} ${nestData} ${basicNestLanguage.pokestop}`)
        } else {
            CONFIRM.setTitle(`${nestName} ${success.response.updated.a} ${nestData} ${basicNestLanguage.pokestops}`)
        }
        CONFIRM.setThumbnail("https://github.com/MrRecordHolder/pokecloud/blob/master/images/emojis/pokestop.png?raw=true")
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
            if(exgyms > 0) {
                embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${exraidGymEmoji}${basicNestLanguage.exgyms}: ${exgyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
            } else {
                embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
            }
            embed.setFooter(basicNestLanguage.pokestops + " " + success.response.updatedby.a + " " + username, userimage)
            embed.setTimestamp()
        editEmbed.edit(embed);
    }).catch(err => {
        console.log(err)
    });
};