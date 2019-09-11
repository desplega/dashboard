<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">Log in</h4>
        <p slot="description" class="description">Welcome!</p>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email...</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Password...</label>
          <md-input v-model="password"></md-input>
        </md-field>
        <md-button slot="footer" class="md-simple md-success md-lg"
          >Lets Go!!</md-button
        >
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
export default {
  components: {
    LoginCard
  },
  data() {
    return {
      email: null,
      password: null
    };
  }
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>
