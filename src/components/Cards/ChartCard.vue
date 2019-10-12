<template>
  <md-card class="md-card-chart">
    <md-card-header
      :class="[
        { [getClass(backgroundColor)]: true },
        { 'md-card-header-text': headerText },
        { 'md-card-header-icon': headerIcon }
      ]"
    >
      <slot name="chartInsideHeader"></slot>
    </md-card-header>

    <md-card-content>
      <div :update-chart="updateChart" :id="chartId" class="ct-chart"></div>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions md-alignment="left" v-if="!noFooter">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  name: "chart-card",
  props: {
    headerText: Boolean,
    headerIcon: Boolean,
    noFooter: Boolean,
    updateChart: {
      type: Boolean,
      default: false
    },
    chartType: {
      type: String,
      default: "Line" // Line | Pie | Bar
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    chartResponsiveOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartAnimation: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          series: []
        };
      }
    },
    backgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chart: null,
      chartId: "no-id"
    };
  },
  methods: {
    getClass: function(backgroundColor) {
      return "md-card-header-" + backgroundColor + "";
    },
    /***
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart() {
      var chartIdQuery = `#${this.chartId}`;
      this.chart = this.$Chartist[this.chartType](
        chartIdQuery,
        this.chartData,
        this.chartOptions,
        this.chartAnimation
      );
    },
    /***
     * Assigns a random id to the chart
     */
    updateChartId() {
      var currentTime = new Date().getTime().toString();
      var randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  mounted() {
    this.updateChartId();
    this.$nextTick(this.initChart);
  },
  watch: {
    updateChart() {
      this.chart.update();
      this.$emit("chartUpdated");
    }
  }
};
</script>
