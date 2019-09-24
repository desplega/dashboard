<template>
  <stats-card :data-background-color="dataBackgroundColor">
    <template slot="header">
      <md-icon>highlight</md-icon>
    </template>

    <template slot="content">
      <p class="category">LED</p>
      <md-switch v-model="led"></md-switch>
    </template>

    <template slot="footer">
      <div class="stats"><md-icon>sync</md-icon>Switch to turn On or Off</div>
    </template>
  </stats-card>
</template>

<script>
import { StatsCard } from "@/components";
export default {
  components: {
    StatsCard
  },
  name: "toggle-led",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      temperature: null,
      updated: null,
      led: null
    };
  }
};
</script>
<style></style>
