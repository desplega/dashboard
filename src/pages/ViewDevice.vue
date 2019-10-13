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

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-50">
        <stats-card data-background-color="purple">
          <template slot="header">
            <md-icon>border_clear</md-icon>
          </template>
          <template slot="content">
            <p class="category">Mesh Status</p>
            <h3 class="title">{{ status }}</h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Updated at {{ updatedAt }}
            </div>
          </template>
        </stats-card>
      </div>

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-50">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>wb_sunny</md-icon>
          </template>
          <template slot="content">
            <p class="category">Temperature</p>
            <h3 class="title">{{ temperature }} C</h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Updated at {{ updatedAt }}
            </div>
          </template>
        </stats-card>
      </div>

      <div v-if="hasData" class="md-layout-item md-size-100">
        <chart-card
          :chart-data="temperatureChart.data"
          :chart-options="temperatureChart.options"
          chart-type="Line"
          header-icon
          no-footer
          background-color="blue"
          :update-chart="updateChart"
          @chartUpdated="chartUpdated($event)"
        >
          <template slot="chartInsideHeader">
            <div class="card-icon">
              <md-icon>timeline</md-icon>
            </div>
            <h4 class="title">
              Temperature
              <small>- Updated at {{ updatedAt }}</small>
            </h4>
          </template>
        </chart-card>
      </div>

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-100">
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
        macAddress: "",
        name: "",
        location: ""
      },
      // View mesh status
      status: "Connected",
      // View temperature
      temperature: null,
      updated: null,
      // View chart
      chartData: [],
      temperatureChart: {
        data: {
          labels: [],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 10
          }),
          axisX: {
            showGrid: false
          },
          axisY: {
            showGrid: true,
            offset: 40
          },
          low: -10,
          high: 40,
          showPoint: true,
          height: "300px"
        }
      },
      updateChart: false,
      // Updated time
      updatedAt: "",
      // Toggle LED
      led: "0",
      // Socket
      socket: null
    };
  },
  created() {
    // Get device data from ID in the URL
    DeviceService.getDevice(this.$route.params.id).then(response => {
      this.device = response.data;

      // Get data
      DataService.get(this.device.macAddress).then(response => {
        // Confirm there is data to display
        if (response.data.length > 0) {
          this.hasData = true;

          // Updated time
          this.updatedAt = this.formatDate(response.data[0].createdAt);

          // Mesh status
          //this.status = response.data[0].data.status;
          //TENTATIVE: Using temperature to test both connected and disconnected messages
          this.status =
            response.data[0].data.t > 20 ? "Connected" : "Disconnected";

          // Temperature
          this.temperature = response.data[0].data.t; // In first position the most recent

          // LED
          this.led = response.data[0].data.l === "1" ? true : false;

          // Temperature chart
          this.chartData = response.data.reverse();
          this.genChart();

          // Socket to update device data from api-engine
          console.log("Socket subscription to: " + this.device.macAddress);
          this.socket = new SocketService();
          this.socket.getData(this.device.macAddress, this.updateData);
        }
      });
    });
  },
  methods: {
    updateData(socketData) {
      this.updatedAt = this.formatDate(socketData.createdAt);
      this.temperature = socketData.data.t;
      this.led = socketData.data.l === "1" ? true : false;
      this.chartData.splice(0, 1); // Remove the oldest record, the first one
      this.chartData.push(socketData); // Add the new one
      this.genChart();
      // Chart needs to be updated because it is not readtive by default
      this.updateChart = true; // This will inform the child that chart needs to be updated
    },
    genChart() {
      // Most recent data should be the last in the chart
      for (let i = 0; i < this.chartData.length; i++) {
        if (i % 3 == 1) {
          // Show only one of every X labels to fit in responsive devices
          this.temperatureChart.data.labels[i] = this.formatTime(
            this.chartData[i].createdAt
          );
        }
        this.temperatureChart.data.series[0][i] = this.chartData[i].data.t;
      }
    },
    chartUpdated() {
      this.updateChart = false;
    },
    formatDate(originalTime) {
      var d = new Date(originalTime);
      var dateString =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        " " +
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2);
      return dateString;
    },
    formatTime(originalTime) {
      var d = new Date(originalTime);
      var dateString =
        ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      return dateString;
    },
    toggleLED() {
      // To toggle the LED we resend the last received data
      let data = {
        macAddress: this.device.macAddress,
        data: {
          t: this.chartData[this.chartData.length - 1].data.t,
          h: this.chartData[this.chartData.length - 1].data.h,
          l: this.led ? "1" : "0"
        },
        topic: "led"
      };
      DataService.saveData(data);
    }
  },
  watch: {
    led() {
      this.toggleLED();
    }
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

.ct-label.ct-label.ct-horizontal.ct-end {
  position: relative;
  justify-content: flex-end;
  text-align: right;
  transform-origin: 100% 0;
  transform: translate(-100%) rotate(-45deg);
  white-space: nowrap;
}
</style>
