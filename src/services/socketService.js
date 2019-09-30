import * as io from "socket.io-client";
import GlobalConstants from "../globalConstants";

export class SocketService {
  constructor() {
    this.socket = io(GlobalConstants.BASE_API_URL, {
      query: {
        token: localStorage.getItem(GlobalConstants.API_AUTH_TOKEN) || ""
      }
    });
  }
  getData(macAddress) {
    this.socket.on("data:save:" + macAddress, data => {
      console.log("Socket data received:");
      console.log(data);
    });
    this.socket.on("connect", () => {
      console.log("Socket connected");
    });
    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }
}
