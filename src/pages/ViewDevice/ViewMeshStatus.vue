<template>
  <stats-card :data-background-color="dataBackgroundColor">
    <template slot="header">
      <md-icon>border_clear</md-icon>
    </template>

    <template slot="content">
      <p class="category">Mesh Status</p>
      <h3 class="title">{{ status }}</h3>
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
  },
  created: function() {
    DataService.get(this.$route.params.id).then(response => {
      //this.status = response.data[0].data.status;
      //TENTATIVE: Use temperature to test both connected and disconnected messages
      this.status = response.data[0].data.t > 20 ? "Connected" : "Diconnected";
      console.log(response.data[0].data.t);
    });
  }
};
</script>
<style></style>
