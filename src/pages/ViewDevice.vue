<template>
  <div class="content">
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

export default {
  components: {
    ViewTemperature,
    ViewMeshStatus,
    ToggleLed,
    ViewChart
  }
};
</script>
