import io from "socket.io-client";

if (interfaceConfig.SOCKET_HOST === undefined) {
    interfaceConfig.SOCKET_HOST = "https://socketlink.dreampotential.org";
}
export const socket = io(interfaceConfig.SOCKET_HOST);