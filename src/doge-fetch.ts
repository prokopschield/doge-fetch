import DogeSocket from "doge-socket";
import { v4 } from 'uuid';

class DogeFetch {
	constructor (socket: DogeSocket) {
		this.#socket = socket;
		socket.on('fetch_done', (data: object, fetchId: string) => {
			const callback = this.#waiters.get(fetchId);
			if (typeof callback === 'function') {
				callback(data);
				this.#waiters.delete(fetchId);
			}
		});
	}
	#socket: DogeSocket;
	#waiters: Map<string, (data: object) => void> = new Map;
	fetch (opCode: string, data: object): Promise<object> {
		return new Promise (resolve => {
			const fetchId = v4();
			this.#waiters.set(fetchId, resolve);
			this.#socket.send(opCode, data, fetchId);
		});
	}
}

export default DogeFetch;
module.exports = DogeFetch;

Object.assign(DogeFetch, {
	default: DogeFetch,
	DogeFetch,
});
