import petitio from "petitio";
import { DeezerTrack, LavalinkTrack, LavalinkTrackResponse, DeezerAlbum, DeezerArtist, DeezerPlaylist, UnresolvedTrack } from "../typings";
import Util from "../Util";
import Node from "./Node";

export default class Resolver {
    public client = this.node.client;
    public cache = new Map<string, LavalinkTrack>();

    public constructor(public node: Node) { }

    public get autoResolve(): boolean {
        return this.client.options.autoResolve!;
    }

    public async getTrack(id: string): Promise<LavalinkTrackResponse | any> {
        const deezerTrack: DeezerTrack = await petitio(`${this.client.baseURL}/track/${id}`).json();
        const unresolvedTrack = this.buildUnresolved(deezerTrack);
        return this.buildResponse("TRACK", this.autoResolve ? ([await unresolvedTrack.resolve()] as LavalinkTrack[]) : [unresolvedTrack]);
    }

    public async getPlaylist(id: string): Promise<LavalinkTrackResponse | any> {
        const deezerPlaylist: DeezerPlaylist = await petitio(`${this.client.baseURL}/playlist/${id}`).json();
        const unresolvedPlaylistTracks = deezerPlaylist.tracks.data.map((x) => this.buildUnresolved(x));
        return this.buildResponse("PLAYLIST", this.autoResolve ? ((await Promise.all(unresolvedPlaylistTracks.map((x: any) => x.resolve()))).filter(Boolean) as LavalinkTrack[]) : unresolvedPlaylistTracks, deezerPlaylist.title);
    }

    public async getAlbum(id: string): Promise<LavalinkTrackResponse | any> {
        const deezerAlbum: DeezerAlbum = await petitio(`${this.client.baseURL}/album/${id}`, "GET").json();
        const unresolvedAlbumTracks = deezerAlbum?.tracks.data.map((track) => this.buildUnresolved(track)) ?? [];
        return this.buildResponse("PLAYLIST", this.autoResolve ? ((await Promise.all(unresolvedAlbumTracks.map((x) => x.resolve()))).filter(Boolean) as LavalinkTrack[]) : unresolvedAlbumTracks, deezerAlbum.title);
    }

    public async getArtist(id: string): Promise<LavalinkTrackResponse | any> {
        const metaData = await petitio(`${this.client.baseURL}/artist/${id}`).json();
        const deezerArtist: DeezerArtist = await petitio(`${this.client.baseURL}/artist/${id}/top?limit=50`).json();
        const unresolvedArtistTracks = deezerArtist.data.map(track => track && this.buildUnresolved(track)) ?? [];
        return this.buildResponse("PLAYLIST", this.autoResolve ? ((await Promise.all(unresolvedArtistTracks.map((x) => x.resolve()))).filter(Boolean) as LavalinkTrack[]) : unresolvedArtistTracks, metaData.title);

    }

    private async resolve(unresolvedTrack: UnresolvedTrack): Promise<LavalinkTrack | undefined> {
        const cached = this.cache.get(unresolvedTrack.info.identifier);
        if (cached) return Util.structuredClone(cached);

        const lavaTrack = await this.retrieveTrack(unresolvedTrack);
        if (lavaTrack) {
            if (this.client.options.useDeezerMetadata) {
                Object.assign(lavaTrack.info, {
                    title: unresolvedTrack.info.title,
                    author: unresolvedTrack.info.author,
                    uri: unresolvedTrack.info.uri
                });
            }
            this.cache.set(unresolvedTrack.info.identifier, Object.freeze(lavaTrack));
        }
        return Util.structuredClone(lavaTrack);
    }

    private async retrieveTrack(unresolvedTrack: UnresolvedTrack): Promise<LavalinkTrack | undefined> {
        const params = new URLSearchParams({ identifier: `ytsearch:${unresolvedTrack.info.author} - ${unresolvedTrack.info.title} ${this.client.options.audioOnlyResults ? "Audio" : ""}` });
        const response: LavalinkTrackResponse<LavalinkTrack> = await petitio(`http${this.node.secure ? "s" : ""}://${this.node.url}/loadtracks?${params.toString()}`).header("Authorization", this.node.auth).json();
        return response.tracks[0];
    }

    private buildUnresolved(deezerTrack: DeezerTrack): UnresolvedTrack {
        const _this = this; // eslint-disable-line
        return {
            info: {
                identifier: `${deezerTrack.id}`,
                title: deezerTrack.title,
                author: deezerTrack.artist ? deezerTrack.artist.name : undefined ?? "",
                uri: deezerTrack.link,
                length: deezerTrack.duration
            },
            resolve(): Promise<LavalinkTrack | undefined> {
                return _this.resolve(this);
            }
        };
    }

    private buildResponse(type: LavalinkTrackResponse["type"], tracks: Array<UnresolvedTrack | LavalinkTrack> = [], playlistName?: string, exceptionMsg?: string): LavalinkTrackResponse {
        return Object.assign(
            {
                type,
                tracks,
                playlistName
            },
            exceptionMsg ? { exception: { message: exceptionMsg, severity: "COMMON" } } : { }
        );
    }
}
