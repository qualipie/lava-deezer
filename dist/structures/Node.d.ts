import DeezerClient from "../Client";
import { LavalinkTrackResponse, NodeOptions } from "../typings";
import Resolver from "./Resolver";
export default class Node {
    client: DeezerClient;
    resolver: Resolver;
    name: string;
    url: string;
    auth: string;
    secure: boolean;
    private readonly methods;
    constructor(client: DeezerClient, options: NodeOptions);
    /**
     * A method for loading Spotify URLs
     * @returns Lavalink-like /loadtracks response
     */
    load(url: string): Promise<LavalinkTrackResponse | null>;
}
