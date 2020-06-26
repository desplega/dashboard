<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <edit-register-device-form
          data-background-color="blue"
          @saveDevice="saveDevice($event)"
        >
          <h4 slot="title" class="title">
            {{ $t("register-device-register-device") }}
          </h4>
          <p slot="category" class="category">
            {{ $t("register-device-add-device-information") }}
          </p>
        </edit-register-device-form>
      </div>
    </div>
  </div>
</template>

<script>
import { EditRegisterDeviceForm } from "@/pages";
import DeviceService from "@/services/deviceService.js";

export default {
  components: {
    EditRegisterDeviceForm
  },
  methods: {
    findDeviceInList(device, devices) {
      for (var i = 0; i < devices.length; i++) {
        if (devices[i].number === device.number) {
          return true;
        }
      }
    },
    saveDevice(device) {
      if (process.env.NODE_ENV != "production") console.log(device);
      // Check whether this device is already added to device list
      DeviceService.get().then(devices => {
        if (this.findDeviceInList(device, devices.data)) {
          // The device is already added in the device list
          this.$notify({
            message: this.$i18n.t("register-device-already-registered"),
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
