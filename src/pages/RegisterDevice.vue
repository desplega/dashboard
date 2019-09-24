<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
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
