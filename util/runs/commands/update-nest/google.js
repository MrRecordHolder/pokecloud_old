exports.run = (bot, message) => {

    // create map links
    let lon = output[2].trim(" ")
    let lat = output[3].trim(" ")
    // set new map link
    bot.defaultNest.set(nestKey, `https://www.google.com/maps/dir/Current+Location/${lon}+${lat}`, `location.maps.google`)
    bot.defaultNest.set(nestKey, lon, `location.maps.lon`)
    bot.defaultNest.set(nestKey, lat, `location.maps.lat`)


    const google = bot.defaultNest.get(nestKey, 'location.maps.google')

    // send confirmation
    var CONFIRM = new Discord.RichEmbed()
        CONFIRM.setAuthor(success.code.zero, success.image)
        CONFIRM.setColor(success.color)
        CONFIRM.setTitle(`${nestName} ${success.response.updated.a} ${lon},${lat}`)
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
            if(exgyms > 0) {
                embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${exraidGymEmoji}${basicNestLanguage.exgyms}: ${exgyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
            } else {
                embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
            }
            embed.setFooter(basicNestLanguage.google + " " + success.response.updatedby.a + " " + username, userimage)
            embed.setTimestamp()
        editEmbed.edit(embed);
    }).catch(err => {
        console.log(err)
    });
};