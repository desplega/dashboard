<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Device Status</h4>
            <p class="category">List of available connected devices</p>
          </md-card-header>
          <md-card-content>
            <device-table
              table-header-color="green"
              :devices="devices"
              @deleteDevice="deleteDevice($event)"
            ></device-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { DeviceTable } from "@/components";
import DeviceService from "@/services/deviceService";
import DataService from "@/services/dataService";
import { SocketService } from "@/services/socketService.js";
import mixin from "@/mixins/dateTime.js";

export default {
  components: {
    DeviceTable
  },
  mixins: [mixin],
  data() {
    return {
      devices: [],
      socket: undefined
    };
  },
  created() {
    return DeviceService.get()
      .then(response => {
        this.devices = [];
        for (var i = 0, len = response.data.length; i < len; i++) {
          let device = { info: {}, data: {} };
          device.info.id = response.data[i]._id; // Database internal id
          device.info.number = response.data[i].number;
          device.info.name = response.data[i].name;
          device.info.location = response.data[i].location;
          device.data.updated = null; // To be read from the device
          device.data.mesh = null;
          this.devices.push(device);
        }
      })
      .then(() => {
        // Create socket and subscribe to each device to receive the updated status
        this.socket = new SocketService();
        this.socket.connect();
        // Get mesh status of each device
        for (var i = 0; i < this.devices.length; i++) {
          this.getMeshStatus(i);
          if (process.env.NODE_ENV != "production")
            console.log(
              "Socket subscription to: " + this.devices[i].info.number
            );
          this.socket.getData(this.devices[i].info.number, socketData => {
            let device = this.devices.find(
              obj => obj.info.number === socketData.number
            );
            let deviceIndex = this.devices.indexOf(device);
            // Updated
            this.devices[deviceIndex].data.updated = this.formatDate(
              socketData.createdAt
            );
            // Mesh status
            this.devices[deviceIndex].data.mesh = socketData.data.m;
            // Device is sending
            this.devices[deviceIndex].data.deviceNotSending = false;
          });
        }
      });
  },
  destroyed() {
    this.socket.disconnect();
  },
  methods: {
    deleteDevice: function(id) {
      // Delete/unregister the device
      for (var i = 0; i < this.devices.length; i++) {
        if (this.devices[i].info.id === id) {
          // Call to API to delete the device
          DeviceService.deleteDevice(this.devices[i].info.id).then(response => {
            if (response.status == 204) {
              this.$notify({
                message: "Device " + this.devices[i].info.number + " deleted",
                icon: "add_alert",
                horizontalAlign: "right",
                verticalAlign: "bottom",
                type: "success"
              });
              this.devices.splice(i, 1); // Update view
            }
          });
          break;
        }
      }
    },
    getMeshStatus: function(deviceIndex) {
      // Get the mesh status for the specified device
      DataService.get(this.devices[deviceIndex].info.number).then(response => {
        // Confirm there is data to display
        if (response.data.length > 0) {
          // Get the most recent data
          let lastData = response.data[0];
          // If last update time is older than some minutes show a warning (device might be Off)
          this.devices[deviceIndex].data.deviceNotSending = this.isOldDate(
            lastData.createdAt
          )
            ? "1"
            : "0";
          // Updated
          this.devices[deviceIndex].data.updated = this.formatDate(
            lastData.createdAt
          );
          // Mesh status
          this.devices[deviceIndex].data.mesh = lastData.data.m;
        }
      });
    }
  }
};
</script>
