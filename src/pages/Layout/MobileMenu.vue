<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <a href="#/user" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">person</i>
        <p>User Profile</p>
      </a>
    </li>
    <li>
      <a
        href="#"
        @click="logout"
        class="dropdown-toggle"
        data-toggle="dropdown"
      >
        <i class="material-icons">logout</i>
        <p>Logout</p>
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
