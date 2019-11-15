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
        },
        previous: {
            name: "?",
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