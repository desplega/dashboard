import axios from "axios";
import GlobalConstants from "../globalConstants";

export default {
  saveData(data) {
    // Not used, because it is used by the api-engine
    // when data is received from devices.
    return axios({
      url: GlobalConstants.BASE_API_URL + "api/v1/data/",
      data: data,
      method: "POST"
    });
  },
  get(id) {
    return axios({
      url:
        GlobalConstants.BASE_API_URL +
        "api/v1/data/" +
        id +
        "/" +
        GlobalConstants.DATA_LIMIT,
      method: "GET"
    });
  }
};
