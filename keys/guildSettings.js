const guildSettings = {
    name: "",
    id: "",
    owner: "",
    language: "English",
    prefix: "$",
    location: {
        city: "",
        state: "",
        country: "",
        region: "",
        timezone: "",
        maps: {
            tsr: ""
        }
    },
    channels: {
        admin: "",
        nest: "",
        log: "",
        city: {
            one: {
                channelid: "",
                name: ""
            }
        }
    },
    roles: {
        admin: "",
        nest: ""
    },
    bots: {
        pokenav: false,
        miscord: false
    },
    clean: {
        commands: true,
        replies: true,
    },
    migration: {
        tag: false,
        tagrole: "",
        tagchannel: "",
        messageid: "",
        dates: {
            last: "",
            next: ""
        }
    }
}

module.exports = guildSettings