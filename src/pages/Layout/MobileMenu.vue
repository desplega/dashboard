<template>
  <ul class="nav nav-mobile-menu">
    <li class="dropdown-item">
      <a href="#/user" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">person</i>
        <p>{{ $t("mobile-menu-user-profile") }}</p>
      </a>
    </li>
    <li class="dropdown-item">
      <a
        href="#"
        @click="logout"
        class="dropdown-toggle"
        data-toggle="dropdown"
      >
        <i class="material-icons">logout</i>
        <p>{{ $t("mobile-menu-logout") }}</p>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
