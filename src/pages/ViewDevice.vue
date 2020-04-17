<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">{{ $t("view-device-device-number") }} {{ device.number }}</h4>
            <p class="category">{{ $t("view-device-information-on-device") }}</p>
          </md-card-header>
          <md-card-content>
            <p>
              <span class="card-title">{{ $t("view-device-name") }}</span>
              {{ device.name }}
            </p>
            <p>
              <span class="card-title">{{ $t("view-device-location") }}</span>
              {{ device.location }}
            </p>
            <p v-if="!hasData" class="no-data">
              <span>{{ $t("view-device-no-data-yet") }}</span>
            </p>
            <p v-if="deviceNotSending" class="no-data">
              <span>{{ $t("view-device-device-not-sending") }}</span>
              <md-icon class="warning">warning</md-icon>
            </p>
          </md-card-content>
        </md-card>
      </div>

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-33">
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>border_clear</md-icon>
          </template>
          <template slot="content">
            <p class="category">{{ $t("view-device-harp-status") }}</p>
            <h3 class="title">{{ harp ? $t("view-device-harp-connected") : $t("view-device-harp-not-connected") }}</h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              {{ $t("view-device-updated-at") }} {{ updatedAt }}
            </div>
          </template>
        </stats-card>
      </div>

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-33">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>wb_sunny</md-icon>
          </template>
          <template slot="content">
            <p class="category">{{ $t("view-device-temperature-external") }}</p>
            <h3 class="title">{{ t0 }} C</h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              {{ $t("view-device-updated-at") }} {{ updatedAt }}
            </div>
          </template>
        </stats-card>
      </div>

      <div v-if="hasData" class="md-layout-item md-medium-size-100 md-size-33">
        <stats-card data-background-color="purple">
          <template slot="header">
            <md-icon>home</md-icon>
          </template>
          <template slot="content">
            <p class="category">{{ $t("view-device-temperature-internal") }}</p>
            <h3 class="title">{{ t1 }} C</h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              {{ $t("view-device-updated-at") }} {{ updatedAt }}
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
              {{ $t("view-device-temperatures") }}
              <small>- {{ $t("view-device-updated-at") }} {{ updatedAt }}</small>
            </h4>
          </template>
        </chart-card>
      </div>

      <!-- LED DISABLED
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
      -->
    </div>
  </div>
</template>

<script>
import { StatsCard } from "@/components";
import { ChartCard } from "@/components";
import DeviceService from "@/services/deviceService.js";
import DataService from "@/services/dataService.js";
import { SocketService } from "@/services/socketService.js";
import mixin from "@/mixins/dateTime.js";

export default {
  components: {
    StatsCard,
    ChartCard
  },
  mixins: [mixin],
  data() {
    return {
      // Data flag
      hasData: false,
      // Device not sending
      deviceNotSending: false,
      // Device info
      device: {
        id: null,
        number: "",
        name: "",
        location: ""
      },
      // View harp status
      harp: true,
      // View temperatures
      t0: null,
      t1: null,
      updated: null,
      // View chart
      chartData: [],
      temperatureChart: {
        data: {
          labels: [],
          series: [[], []] // Two temperatures on the same chart
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
      DataService.get(this.device.number).then(response => {
        // Confirm there is data to display
        if (response.data.length > 0) {
          this.hasData = true;

          // Get the most recent data
          let lastData = response.data[0];

          // If last update time is older than 30 minutes show a warning (device might be Off)
          this.deviceNotSending = this.isOldDate(lastData.createdAt);

          // Updated time (last value is the most recent)
          this.updatedAt = this.formatDate(lastData.createdAt);

          // Harp status
          this.harp = lastData.data.h === "1" ? true : false;

          // Temperature
          this.t0 = lastData.data.t0;
          this.t1 = lastData.data.t1;

          // LED
          this.led = lastData.data.l === "1" ? true : false;

          // Temperature chart
          this.chartData = response.data.reverse(); // Last value is the most recent
          this.genChart();

          // Socket to update device data from api-engine
          if (process.env.NODE_ENV != "production")
            console.log("Socket subscription to: " + this.device.number);
          this.socket = new SocketService();
          this.socket.connect();
          this.socket.getData(this.device.number, this.updateData);
        }
      });
    });
  },
  destroyed() {
    this.socket.disconnect();
  },
  methods: {
    updateData(socketData) {
      this.updatedAt = this.formatDate(socketData.createdAt);
      this.t0 = socketData.data.t0;
      this.t1 = socketData.data.t1;
      this.harp = socketData.data.h === "1" ? true : false;
      this.led = socketData.data.l === "1" ? true : false;
      this.chartData.splice(0, 1); // Remove the oldest record, the first one
      this.chartData.push(socketData); // Add the new one
      this.genChart();
      // Chart needs to be updated because it is not readtive by default
      this.updateChart = true; // This will inform the child that chart needs to be updated
      // Device is sending
      this.deviceNotSending = false;
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
        this.temperatureChart.data.series[0][i] = this.chartData[i].data.t0;
        this.temperatureChart.data.series[1][i] = this.chartData[i].data.t1;
      }
    },
    chartUpdated() {
      this.updateChart = false;
    },
    toggleLED() {
      // To toggle the LED we resend the last received data to force an MQTT message
      let data = {
        number: this.device.number,
        data: {
          t0: this.chartData[this.chartData.length - 1].data.t0,
          t1: this.chartData[this.chartData.length - 1].data.t1,
          h: this.harp ? "1" : "0",
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

.md-icon.warning {
  color: orange !important;
}
</style>
