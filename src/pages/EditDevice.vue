<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <div v-if="deviceDataLoaded">
          <edit-register-device-form
            data-background-color="blue"
            :disableNumber="true"
            :device="device"
            @saveDevice="saveDevice($event)"
          >
            <h4 slot="title" class="title">
              {{ $t("edit-device-edit-device") }}
            </h4>
            <p slot="category" class="category">
              {{ $t("edit-device-edit-device-information") }}
            </p>
          </edit-register-device-form>
        </div>
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
  data() {
    return {
      deviceDataLoaded: false, // We need to get device data before rendering the subcomponent
      device: {}
    };
  },
  created() {
    // Get device data from ID from the URL
    DeviceService.getDevice(this.$route.params.id).then(response => {
      this.device = response.data;
      this.deviceDataLoaded = true;
    });
  },
  methods: {
    saveDevice(device) {
      if (process.env.NODE_ENV != "production") console.log(device);
      DeviceService.updateDevice(this.$route.params.id, device);
      this.$router.push("/dashboard");
    }
  }
};
</script>
