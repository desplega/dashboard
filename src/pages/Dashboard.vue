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

export default {
  components: {
    DeviceTable
  },
  data() {
    return {
      devices: []
    };
  },
  created() {
    DeviceService.get().then(response => {
      this.devices = [];
      for (var i = 0, len = response.data.length; i < len; i++) {
        let device = {};
        device.macAddress = response.data[i].macAddress;
        device.name = response.data[i].name;
        device.location = "Not specified";
        let date = response.data[i].updatedAt;
        device.updated = date.substr(0, 10) + " " + date.substr(11, 8);
        device.status = "ok"; // Otherwise "fail"
        this.devices.push(device);
      }
    });
  },
  methods: {
    deleteDevice: function(macAddress) {
      //TODO: add functionality to delete/unregister the device
      for (var i = 0; i < this.devices.length; i++) {
        if (this.devices[i].macAddress === macAddress) {
          this.devices.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>
