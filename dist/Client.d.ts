import { ClientOptions, NodeOptions } from "./typings";
import Node from "./structures/Node";
export default class DeezerClient {
    /** The provided options when the class was instantiated */
    options: Readonly<ClientOptions>;
    /** The {@link Node}s are stored here */
    nodes: Map<string, Node>;
    /** Spotify API base URL */
    readonly baseURL: string;
    /** A RegExp that will be used for validate and parse URLs */
    readonly deezerPattern: RegExp;
    constructor(nodesOpt: NodeOptions[], options?: ClientOptions);
    addNode(options: NodeOptions): void;
    removeNode(id: string): boolean;
    /**
     * @param {string} [id] The node id, if not specified it will return a random node.
     */
    getNode(id?: string): Node | undefined;
    /** Determine the URL is a valid Spotify URL or not */
    isValidURL(url: string): boolean;
}
