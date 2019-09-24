<template>
  <stats-card :data-background-color="dataBackgroundColor">
    <template slot="header">
      <md-icon>wb_sunny</md-icon>
    </template>

    <template slot="content">
      <p class="category">Temperature</p>
      <h3 class="title">24,24 C</h3>
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
  name: "view-temperature",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      temperature: null,
      updated: null
    };
  }
};
</script>
<style></style>
