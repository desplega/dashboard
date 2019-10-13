import axios from "axios";
import GlobalConstants from "../globalConstants";

export default {
  saveData(data) {
    // Used when LED is toggled
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
