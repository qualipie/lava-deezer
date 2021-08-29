export interface DeezerArtist {
    id: number;
    name: string;
    tracklist: string;
    type: string;
}

export interface DeezerData {
    data: DeezerTrack[];
}

export interface DeezerAlbum {
    artist: DeezerArtist;
    title: string;
    tracks: {
        data: DeezerTrack[];
    };
}

export interface DeezerPlaylist {
    creator: DeezerArtist;
    title: string;
    tracks: {
        data: DeezerTrack[];
        checksum: string;
    };
}

export interface DeezerTrack {
    artist: DeezerArtist;
    duration: number;
    link: string;
    id: number;
    title: string;
}
