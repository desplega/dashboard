<template>
  <chart-card
    header-animation="false"
    :chart-data="colouredLineChart.data"
    :chart-options="colouredLineChart.options"
    chart-type="Line"
    header-icon
    chart-inside-content
    no-footer
    :background-color="BackgroundColor"
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
</template>

<script>
import { ChartCard } from "@/components";
export default {
  components: {
    ChartCard
  },
  name: "view-chart",
  props: {
    BackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
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
      }
    };
  }
};
</script>
<style></style>
