<template>
  <stats-card :data-background-color="dataBackgroundColor">
    <template slot="header">
      <md-icon>wb_sunny</md-icon>
    </template>

    <template slot="content">
      <p class="category">Temperature</p>
      <h3 class="title">{{ temperature }} C</h3>
    </template>

    <template slot="footer">
      <div class="stats"><md-icon>update</md-icon>Just updated</div>
    </template>
  </stats-card>
</template>

<script>
import { StatsCard } from "@/components";
import DataService from "@/services/DataService.js";

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
  },
  created() {
    DataService.get(this.$route.params.id).then(response => {
      this.temperature = response.data[0].data.t; // In first position the most recent
      console.log(response.data[0].data.t);
    });
  }
};
</script>
<style></style>
