import DogeSocket from "doge-socket";
declare class DogeFetch {
    #private;
    constructor(socket: DogeSocket);
    fetch(opCode: string, data: object): Promise<object>;
}
export default DogeFetch;
