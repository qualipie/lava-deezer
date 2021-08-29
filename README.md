// Originally code from [lava-spotify](https://github.com/Allvaa/lava-spotify)

## Installing
```sh
# npm
npm i lava-deezer

# yarn
yarn add lava-deezer
```

## Example Usage
```js
const { DeezerClient } = require("lava-deezer");

const deezer = new DeezerClient([
    {
        name: "weebs",
        url: "localhost:2333:,
        auth: "i_am_weebs"
    }
])

(async () => {
    // Select node to use with its id.
    const node = deezer.nodes.get("weebs");

    // Use Node#load to load album, playlist, and track
    const album = await node.load("https://www.deezer.com/album/192713912");
    console.log(album);

    const playlist = await node.load("https://www.deezer.com/playlist/3110429622");
    console.log(playlist);

    const track = await node.load("https://www.deezer.com/track/1174602992");
    console.log(track);

    const artist = await node.load("https://www.deezer.com/id/artist/469713");
    console.log(artist)

})();
```