const bot = require("../index")

bot.on("guildDelete", (guild) => {
    bot.guildSettings.delete(guild.id)
    console.log(guild.id + " was deleted")
})