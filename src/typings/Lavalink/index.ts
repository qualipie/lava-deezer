import { UnresolvedTrack } from "..";

export interface NodeOptions {
    name: string;
    url: string;
    auth: string;
    secure?: boolean;
}

export interface LavalinkTrack {
    track: string;
    info: {
        identifier: string;
        isSeekable: boolean;
        author: string;
        artworkUrl?: string;
        length: number;
        isStream: boolean;
        position: number;
        title: string;
        uri: string;
    };
}

export interface LavalinkTrackResponse<T = UnresolvedTrack | LavalinkTrack | null> {
    type: "TRACK" | "PLAYLIST" | "SEARCH";
    playlistName: string | undefined | null;
    tracks: T[];
    exception?: {
        message: string;
        severity: string;
    };
}
