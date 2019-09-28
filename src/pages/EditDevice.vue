<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <edit-register-device-form data-background-color="purple">
          <h4 slot="title" class="title">Edit Device</h4>
          <p slot="category" class="category">Edit your device information</p>
          <md-button slot="button" class="md-button md-primary">
            Save
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
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
