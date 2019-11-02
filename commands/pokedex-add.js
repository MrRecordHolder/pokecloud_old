module.exports.command = {
    name: "pokedex-add",
    aliases: ["pa"],
    description: "Add a Pokemon to PokeCloud's Pokedex. Must be added using the English name.",
    category: "Pokedex",
    usage: "<pokemon>, <dex>, <primary type>, <primary boost>, [secondary type], [secondary boost]",
    example: "bulbasaur, 001, grass, sunny, poision, cloudy",
    permission: "**Role:** Pokedex | **Channel:** Any",
    arguments: ""
}

const Discord = require("discord.js")
const errors = require("../util/data/errors.json")
const times = require("../util/data/times.json")
const Pokedex = require("../keys/Pokedex")

exports.run = (bot, message, args) => { 

    // must be developer
    if (message.author.id !== "373660480532643861") {
        var developer = new Discord.RichEmbed()
            .setColor(errors.color)
            .setAuthor("Error", errors.image)
            .setTitle("Only the developer can use this command")    
        return message.channel.send({embed: developer})
        .then(deleteIT => {
            deleteIT.delete(times.thirtysec)
        });
    };


    let output = args.join(" ").trim(" ").split(",")

    // create data props
    let name = output[0]
    let dex = output[1]
    let typeP = output[2]
    let boostP = output[3]
    let typeS = output[4]
    let boostS = output[5]

    // create new Pokedex with default props
    function createdex(name, object) {
        bot.Pokedex.ensure(name, object)
    } createdex(name, Pokedex)

    // set new data
    bot.Pokedex.set(name, name, 'name.english')
    bot.Pokedex.set(name, dex, 'dex')
    bot.Pokedex.set(name, typeP, 'type.primary')
    bot.Pokedex.set(name, boostP, 'boost.primary')

    if(typeS) {
        bot.Pokedex.set(name, typeS, 'type.secondary')
    }
    if(boostS) {
        bot.Pokedex.set(name, boostS, 'boost.secondary')
    }  
};