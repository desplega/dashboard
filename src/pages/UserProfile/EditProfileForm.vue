<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">{{ $t("edit-profile-form-edit-profile") }}</h4>
        <p class="category">{{ $t("edit-profile-form-complete-profile") }}</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>{{ $t("edit-profile-form-user-name") }}</label>
              <md-input v-model="username" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>{{ $t("edit-profile-form-email-address") }}</label>
              <md-input v-model="emailadress" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>{{ $t("edit-profile-form-first-name") }}</label>
              <md-input v-model="firstname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>{{ $t("edit-profile-form-last-name") }}</label>
              <md-input v-model="lastname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>{{ $t("edit-profile-form-password") }}</label>
              <md-input v-model="password" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <md-button class="md-raised md-primary" disabled>{{
              $t("edit-profile-form-update-profile")
            }}</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      username: null,
      password: null,
      emailadress: null,
      lastname: null,
      firstname: null
    };
  }
};
</script>
<style></style>
