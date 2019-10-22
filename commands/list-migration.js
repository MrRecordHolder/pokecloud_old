module.exports.command = {
    name: "list-migration",
    aliases: ["lmigration"],
    description: "List the migration details in your nest channel.",
    category: "Migration",
    usage: "",
    example: "",
    permission: "**Role:** Admin | **Channel:** Admin",
    link: "https://github.com/MrRecordHolder/pokecloud/wiki/All-Commands#list-migration--lmigration",
    arguments: ""
}

exports.run = async (bot, message, args) => {
    // require guildSettings
    const adminrole = bot.guildSettings.get(message.guild.id, 'roles.admin')
    
    // admin role check
    if (!message.member.roles.some(role => role.name === adminrole)) {
        let checkrole = require(`../util/runs/errors/permissions/admin.js`);
        return checkrole.run(bot, message, args);
    };

    // require guildSettings
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')

    // check for nest channel
    if(message.channel.id !== nestchannel) {
        let checkchannel = require(`../util/runs/errors/channels/nest.js`);
        return checkchannel.run(bot, message, args);
    };

    // require guildSettings
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    // require per language responses
    const basicNestLanguage = require(`../util/responses/${serverlanguage}/basics/nest.json`)

    // check for previously listed migration details
    const migrationmessagetodelete = bot.guildSettings.get(message.guild.id, 'migration.messageid')
    message.channel.fetchMessage(migrationmessagetodelete).then(oldmigration => {
        if (oldmigration) oldmigration.delete();               
    }).catch(err => {});

    // send new migration details
    let migrationdetails = require(`../util/runs/commands/migrationdetails.js`);
    migrationdetails.run(bot, message);
};