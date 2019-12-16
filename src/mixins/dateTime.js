export default {
  methods: {
    formatDate(originalTime) {
      var d = new Date(originalTime);
      var dateString =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        " " +
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2);
      return dateString;
    },
    formatTime(originalTime) {
      var d = new Date(originalTime);
      var dateString =
        ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      return dateString;
    },
    isOldDate(lastUpdateTime) {
      // If last update time is older than 35 minutes return true
      var last = new Date(lastUpdateTime);
      let today = new Date();
      return today.getTime() - last.getTime() > 2100000 ? true : false;
    }
  }
};
