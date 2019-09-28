import axios from "axios";
import GlobalConstants from "../globalConstants";

export default {
  get() {
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/devices",
      method: "GET"
    });
  },
  getDevice(device) {
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/devices/" + device,
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
  deleteDevice(device) {
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/devices/" + device,
      method: "DELETE"
    });
  }
};
