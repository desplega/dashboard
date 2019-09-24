<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <edit-register-device-form
          data-background-color="blue"
        ></edit-register-device-form>
      </div>
    </div>
  </div>
</template>

<script>
import { EditRegisterDeviceForm } from "@/pages";

export default {
  components: {
    EditRegisterDeviceForm
  }
};
</script>
