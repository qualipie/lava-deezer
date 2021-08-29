import { ClientOptions, NodeOptions } from "./typings";

export const DefaultClientOptions: ClientOptions = {
    audioOnlyResults: false,
    useDeezerMetadata: false,
    autoResolve: false
};

export const DefaultNodeOptions: NodeOptions = {
    name: "",
    url: "",
    auth: "",
    secure: false
};
