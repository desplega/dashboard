<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <edit-register-device-form
          data-background-color="blue"
          @saveDevice="saveDevice($event)"
        >
          <h4 slot="title" class="title">Register Device</h4>
          <p slot="category" class="category">
            Add your new device information
          </p>
        </edit-register-device-form>
      </div>
    </div>
  </div>
</template>

<script>
import { EditRegisterDeviceForm } from "@/pages";
import DeviceService from "@/services/DeviceService.js";

export default {
  components: {
    EditRegisterDeviceForm
  },
  methods: {
    findDeviceInList(device, devices) {
      for (var i = 0; i < devices.length; i++) {
        if (devices[i].macAddress === device.macAddress) {
          return true;
        }
      }
    },
    saveDevice(device) {
      console.log(device);
      // Check whether this device is already added to device list
      DeviceService.get().then(devices => {
        if (this.findDeviceInList(device, devices.data)) {
          // The device is already added in the device list
          this.$notify({
            message: "This device is already added in your device list",
            icon: "add_alert",
            horizontalAlign: "right",
            verticalAlign: "bottom",
            type: "danger"
          });
        } else {
          // Add the device to the device list
          DeviceService.saveDevice(device);
          this.$router.push("/dashboard");
        }
      });
    }
  }
};
</script>
