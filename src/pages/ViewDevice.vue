<template>
  <div class="content">
    <span style="margin: 15px">Device ID: {{ $route.params.id }}</span>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <view-mesh-status data-background-color="green"></view-mesh-status>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <view-temperature data-background-color="orange"></view-temperature>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <toggle-led data-background-color="purple"></toggle-led>
      </div>
      <div class="md-layout-item md-size-100">
        <view-chart background-color="blue"></view-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { ViewTemperature } from "@/pages";
import { ViewMeshStatus } from "@/pages";
import { ToggleLed } from "@/pages";
import { ViewChart } from "@/pages";
import DataService from "@/services/DataService.js";
import { SocketService } from "@/services/SocketService.js";

export default {
  components: {
    ViewTemperature,
    ViewMeshStatus,
    ToggleLed,
    ViewChart
  },
  data() {
    return {
      socket: null
    };
  },
  created() {
    console.log("Socket init...");
    DataService.get(this.$route.params.id).then(data => {
      console.log("Data received by API call...");
      console.log(data);
    });
    this.socket = new SocketService();
    console.log("Socket subscription to: " + this.$route.params.id);
    this.socket.getData(this.$route.params.id);
  }
};
</script>
