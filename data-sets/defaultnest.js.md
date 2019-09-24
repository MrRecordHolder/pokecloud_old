---
description: The default PokeCloud nest structure.
---

# defaultNest.js

```text
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
            image: "https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/unreported.png?raw=true"
        },
        previous: {
            name: "?",
            image: "https://github.com/MrRecordHolder/pokecloud/blob/master/images/pokemon/unreported.png?raw=true"
        }
    },
    messageid: "",
    servershare: {
        serverid: "",
        messageid: ""
    }
}

module.exports = defaultNest
```

