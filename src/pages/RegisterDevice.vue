<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <edit-register-device-form data-background-color="blue">
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

export default {
  components: {
    EditRegisterDeviceForm
  }
};
</script>
