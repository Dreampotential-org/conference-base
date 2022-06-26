import io from "socket.io-client";

if (interfaceConfig.SOCKET_HOST === undefined) {
    interfaceConfig.SOCKET_HOST = "http://localhost:4000";
}
export const socket = io(interfaceConfig.SOCKET_HOST);