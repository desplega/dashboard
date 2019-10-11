<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Device macAddress: {{ device.macAddress }}</h4>
            <p class="category">Information on the device</p>
          </md-card-header>
          <md-card-content>
            <p>
              <span class="card-title">Name:</span>
              {{ device.name }}
            </p>
            <p>
              <span class="card-title">Location:</span>
              {{ device.location }}
            </p>
            <p v-if="!hasData" class="no-data">
              <span>No data yet!</span>
            </p>
          </md-card-content>
        </md-card>
      </div>

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-33">
        <stats-card data-background-color="purple">
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
      </div>

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-33">
        <stats-card data-background-color="orange">
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
      </div>

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-33">
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>highlight</md-icon>
          </template>

          <template slot="content">
            <p class="category">LED</p>
            <md-switch v-model="led"></md-switch>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>sync</md-icon>Switch to turn On or Off
            </div>
          </template>
        </stats-card>
      </div>

      <div v-if="hasData" class="md-layout-item md-size-100">
        <chart-card
          header-animation="false"
          :chart-data="colouredLineChart.data"
          :chart-options="colouredLineChart.options"
          chart-type="Line"
          header-icon
          chart-inside-content
          no-footer
          background-color="blue"
        >
          <template slot="chartInsideHeader">
            <div class="card-icon">
              <md-icon>timeline</md-icon>
            </div>
            <h4 class="title">
              Coloured Line Chart
              <small>- Rounded</small>
            </h4>
          </template>
        </chart-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard } from "@/components";
import { ChartCard } from "@/components";
import DeviceService from "@/services/DeviceService.js";
import DataService from "@/services/DataService.js";
import { SocketService } from "@/services/SocketService.js";

export default {
  components: {
    StatsCard,
    ChartCard
  },
  data() {
    return {
      // Data flag
      hasData: false,
      // Device info
      device: {
        id: null,
        macAddress: null,
        name: "Test device",
        location: "Lannister's forest"
      },
      // View mesh status
      status: "Connected",
      // View temperature
      temperature: null,
      updated: null,
      // View chart
      colouredLineChart: {
        data: {
          labels: [
            "'06",
            "'07",
            "'08",
            "'09",
            "'10",
            "'11",
            "'12",
            "'13",
            "'14",
            "'15"
          ],
          series: [[287, 480, 290, 554, 690, 690, 500, 752, 650, 900, 944]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 10
          }),
          axisY: {
            showGrid: true,
            offset: 40
          },
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          showPoint: true,
          height: "300px"
        }
      },
      // Toggle LED
      led: null,
      // Socket
      socket: null
    };
  },
  beforeCreate() {
    // Get device data from ID in the URL
    DeviceService.getDevice(this.$route.params.id).then(response => {
      this.device = response.data;

      // Get data
      DataService.get(this.device.macAddress).then(response => {
        if (response.data.length > 0) {
          this.hasData = true;
          // Mesh status
          //this.status = response.data[0].data.status;
          //TENTATIVE: Use temperature to test both connected and disconnected messages
          this.status =
            response.data[0].data.t > 20 ? "Connected" : "Disconnected";
          console.log(this.status);
          // Temperature
          this.temperature = response.data[0].data.t; // In first position the most recent
          console.log(response.data[0].data.t);
          // Socket to update device data from api-engine
          console.log("Socket init...");
          DataService.get(this.device.macAddress).then(data => {
            console.log("Data received by API call...");
            console.log(data);
          });
          this.socket = new SocketService();
          console.log("Socket subscription to: " + this.device.macAddress);
          this.socket.getData(this.device.macAddress);
        }
      });
    });
  }
};
</script>
<style>
.card-title {
  margin-left: 15px;
}

.no-data {
  text-align: center;
  font-size: large;
}
</style>
