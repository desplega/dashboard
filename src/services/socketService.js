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
  connect() {
    this.socket.on("connect", () => {
      if (process.env.NODE_ENV != "production") console.log("Socket connected");
    });
    this.socket.on("disconnect", () => {
      if (process.env.NODE_ENV != "production")
        console.log("Socket disconnected");
    });
  }
  getData(number, callback) {
    this.socket.on("data:save:" + number, data => {
      if (process.env.NODE_ENV != "production")
        console.log("Socket data received from: " + number);
      callback(data);
    });
  }
  disconnect() {
    this.socket.disconnect(true);
  }
}
