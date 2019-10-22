exports.run = (bot, message) => {
    // set new data value
    bot.defaultNest.set(nestKey, nestData, 'notes')
    const notes = bot.defaultNest.get(nestKey, 'notes')

    // send confirmation
    var CONFIRM = new Discord.RichEmbed()
        CONFIRM.setAuthor(success.code.zero, success.image)
        CONFIRM.setColor(success.color)
        CONFIRM.setTitle(`${nestName} notes has been updated to:\n${nestData}`)
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
                if(notes !== "") {
                    embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${exraidGymEmoji}${basicNestLanguage.exgyms}: ${exgyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}\n${notesEmoji} ${notes}` )
                } else {
                    embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${exraidGymEmoji}${basicNestLanguage.exgyms}: ${exgyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
                }
            } else {
                if(notes !== "") {
                    embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}\n${notesEmoji} ${notes}`)
                } else {
                    embed.setDescription(`[${basicNestLanguage.directions}](${google})\n${pokestopEmoji}${basicNestLanguage.pokestops}: ${pokestops} | ${gymEmoji}${basicNestLanguage.gyms}: ${gyms}\n${spawnEmoji}${basicNestLanguage.spawns}: ${spawns}`)
                }
            }
            embed.setFooter(basicNestLanguage.notes + " " + success.response.updatedby.a + " " + username, userimage)
            embed.setTimestamp()
        editEmbed.edit(embed);
    }).catch(err => {
        console.log(err)
    });
};