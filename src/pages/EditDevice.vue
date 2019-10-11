<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <div v-if="deviceDataLoaded">
          <edit-register-device-form
            data-background-color="blue"
            :disableMacAddress="true"
            :device="device"
            @saveDevice="saveDevice($event)"
          >
            <h4 slot="title" class="title">Edit Device</h4>
            <p slot="category" class="category">Edit your device information</p>
          </edit-register-device-form>
        </div>
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
  data() {
    return {
      deviceDataLoaded: false, // We need to get device data before rendering the subcomponent
      device: {}
    };
  },
  created() {
    // Get device data from ID
    DeviceService.getDevice(this.$route.params.id).then(response => {
      this.device = response.data;
      this.deviceDataLoaded = true;
    });
  },
  methods: {
    saveDevice(device) {
      console.log(device);
      DeviceService.updateDevice(this.$route.params.id, device);
      this.$router.push("/dashboard");
    }
  }
};
</script>
