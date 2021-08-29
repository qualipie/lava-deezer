import { LavalinkTrack, LavalinkTrackResponse } from "../typings";
import Node from "./Node";
export default class Resolver {
    node: Node;
    client: import("..").DeezerClient;
    cache: Map<string, LavalinkTrack>;
    constructor(node: Node);
    get autoResolve(): boolean;
    getTrack(id: string): Promise<LavalinkTrackResponse | any>;
    getPlaylist(id: string): Promise<LavalinkTrackResponse | any>;
    getAlbum(id: string): Promise<LavalinkTrackResponse | any>;
    getArtist(id: string): Promise<LavalinkTrackResponse | any>;
    private resolve;
    private retrieveTrack;
    private buildUnresolved;
    private buildResponse;
}
