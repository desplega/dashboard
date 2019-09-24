<template>
  <stats-card :data-background-color="dataBackgroundColor">
    <template slot="header">
      <md-icon>border_clear</md-icon>
    </template>

    <template slot="content">
      <p class="category">Mesh Status</p>
      <h3 class="title">Connected</h3>
    </template>

    <template slot="footer">
      <div class="stats"><md-icon>update</md-icon>Just updated</div>
    </template>
  </stats-card>
</template>

<script>
import { StatsCard } from "@/components";
export default {
  components: {
    StatsCard
  },
  name: "view-mesh-status",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      status: null
    };
  }
};
</script>
<style></style>
