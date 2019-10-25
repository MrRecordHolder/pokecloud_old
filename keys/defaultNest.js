const defaultNest = {
    name: "",
    alias: "",
    serverid: "",
    location: {
        city: "",
        state: "",
        country: "",
        region: "",
        maps: {
            lat: "",
            lon: "",
            google: "",
            osm: "",
            silphroad: ""
        }
    },
    pokestops: "?",
    gyms: "?",
    exgyms: "0",
    spawns: "?",
    pokemon: {
        current: {
            name: "?",
            image: "https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/unreported.png?raw=true",
            type: ""
        },
        previous: {
            name: "?",
            image: "https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/unreported.png?raw=true"
        }
    },
    notes: "",
    messageid: "",
    channel: "",
    servershare: {
        serverid: "",
        messageid: ""
    }
}

module.exports = defaultNest