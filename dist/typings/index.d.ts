import { LavalinkTrack } from "./Lavalink";
export interface ClientOptions {
    /**
     * This will filter the search to video that only contains audio of the Spotify track (likely)
     * @default false
     */
    audioOnlyResults?: boolean;
    /**
     * The original value of title, author, and uri in {@link LavalinkTrack} will be replaced to Spotify's
     * @default false
     */
    useDeezerMetadata?: boolean;
    /**
     * Auto resolve the Spotify track to Lavalink track
     *
     * It's not recommended to enable this option, enabling it will spam HTTP requests to YouTube and take a while for large playlists to load.
     * @default false
     */
    autoResolve?: boolean;
}
export interface UnresolvedTrack {
    info: {
        identifier: string;
        title: string;
        author: string;
        length: number;
        uri: string;
    };
    resolve: () => Promise<LavalinkTrack | undefined>;
}
export * from "./Lavalink";
export * from "./Deezer";
