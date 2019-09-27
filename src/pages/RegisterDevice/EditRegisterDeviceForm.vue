<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <slot name="title"></slot>
        <slot name="category"></slot>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Name</label>
              <md-input v-model="name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field maxlength="12">
              <label>ID</label>
              <md-input v-model="id" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>Location</label>
              <md-input v-model="location" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <slot name="button"></slot>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-register-device-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      name: null,
      id: null,
      location: null
    };
  }
};
</script>
<style></style>
