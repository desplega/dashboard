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
import DeviceService from "@/services/DeviceService";
import DataService from "@/services/DataService";
import { SocketService } from "@/services/SocketService.js";

export default {
  components: {
    DeviceTable
  },
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
          let device = {};
          device.id = response.data[i]._id; // Database internal id
          device.number = response.data[i].number;
          device.name = response.data[i].name;
          device.location = response.data[i].location;
          let date = response.data[i].updatedAt;
          device.updated = date.substr(0, 10) + " " + date.substr(11, 8);
          device.mesh = false; // This information needs to be got from the device status
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
          console.log("Socket subscription to: " + this.devices[i].number);
          this.socket.getData(this.devices[i].number, socketData => {
            let device = this.devices.find(
              obj => obj.number === socketData.number
            );
            let deviceIndex = this.devices.indexOf(device);
            this.devices[deviceIndex].mesh = socketData.data.m;
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
        if (this.devices[i].id === id) {
          // Call to API to delete the device
          DeviceService.deleteDevice(this.devices[i].id).then(response => {
            if (response.status == 204) {
              this.$notify({
                message: "Device " + this.devices[i].number + " deleted",
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
      DataService.get(this.devices[deviceIndex].number).then(response => {
        // Confirm there is data to display
        if (response.data.length > 0) {
          // Get the most recent data
          let lastData = response.data[0];

          /*
          // Updated time (last value is the most recent)
          var last = new Date(lastData.createdAt);

          // If last update time is older than 30 minutes show a warning (device might be Off)
          let today = new Date();

          // If last measurement is older than 20 minutes it means the device is not currently sending new data
          if (today.getTime() - last.getTime() > 1200000) {
            this.devices[deviceIndex].deviceNotSending = true;
          } else {
            this.devices[deviceIndex].deviceNotSending = false;
          }
          */

          // Mesh status
          this.devices[deviceIndex].mesh = lastData.data.m;

          // PENDING
          // Socket to update device data from api-engine
          //console.log("Socket subscription to: " + this.device.number);
          //this.socket = new SocketService();
          //this.socket.getData(this.device.number, this.updateData);
        }
      });
    }
  }
};
</script>
