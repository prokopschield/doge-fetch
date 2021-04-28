"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _socket, _waiters;
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class DogeFetch {
    constructor(socket) {
        _socket.set(this, void 0);
        _waiters.set(this, new Map);
        __classPrivateFieldSet(this, _socket, socket);
        socket.on('fetch_done', (data, fetchId) => {
            const callback = __classPrivateFieldGet(this, _waiters).get(fetchId);
            if (typeof callback === 'function') {
                callback(data);
                __classPrivateFieldGet(this, _waiters).delete(fetchId);
            }
        });
    }
    fetch(opCode, data) {
        return new Promise(resolve => {
            const fetchId = uuid_1.v4();
            __classPrivateFieldGet(this, _waiters).set(fetchId, resolve);
            __classPrivateFieldGet(this, _socket).send(opCode, data, fetchId);
        });
    }
}
_socket = new WeakMap(), _waiters = new WeakMap();
exports.default = DogeFetch;
module.exports = DogeFetch;
Object.assign(DogeFetch, {
    default: DogeFetch,
    DogeFetch,
});
