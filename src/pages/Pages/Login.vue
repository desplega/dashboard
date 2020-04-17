<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">{{ $t("login-login") }}</h4>
        <p slot="description" class="description">{{ $t("login-welcome") }}</p>
        <md-field slot="inputs">
          <md-icon>email</md-icon>
          <label>{{ $t("login-email") }}</label>
          <md-input
            v-model="email"
            type="email"
            @keyup.enter="login()"
          ></md-input>
        </md-field>
        <md-field slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>{{ $t("login-password") }}</label>
          <md-input
            type="password"
            v-model="password"
            @keyup.enter="login()"
          ></md-input>
        </md-field>
        <md-button
          slot="footer"
          class="md-simple md-success md-lg"
          @click="login()"
          >{{ $t("login-lets-go") }}</md-button
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
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          // Go to dashboard as logged user
          this.$router.push("/");
        })
        .catch(err => {
          if (process.env.NODE_ENV != "production") console.log(err);
          // Show message
          let msg = "Email and password don't match...";
          if (email === "" || password === "")
            msg = "Please fill email and password to login...";
          this.$notify({
            message: msg,
            icon: "add_alert",
            horizontalAlign: "right",
            verticalAlign: "bottom",
            type: "danger"
          });
        });
    }
  }
};
</script>

<style>
.text-center {
  text-align: center;
}

.md-button {
  top: 0px;
}
</style>
