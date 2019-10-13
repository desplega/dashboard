import axios from "axios";
import GlobalConstants from "../globalConstants";

export default {
  get() {
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/devices",
      method: "GET"
    });
  },
  getDevice(deviceID) {
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/devices/" + deviceID,
      method: "GET"
    });
  },
  saveDevice(device) {
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/devices/",
      data: device,
      method: "POST"
    });
  },
  updateDevice(deviceID, device) {
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/devices/" + deviceID,
      data: device,
      method: "PUT"
    });
  },
  deleteDevice(deviceID) {
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/devices/" + deviceID,
      method: "DELETE"
    });
  }
};
