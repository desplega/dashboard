<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <edit-register-device-form
          data-background-color="blue"
          disable="true"
          @saveDevice="saveDevice($event)"
        >
          <h4 slot="title" class="title">Edit Device</h4>
          <p slot="category" class="category">Edit your device information</p>
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
    saveDevice(device) {
      console.log(device);
    }
  }
};
</script>
