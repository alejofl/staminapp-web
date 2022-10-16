<template>
  <v-card color="#E1E6EC" dark>
    <v-container class="ma-0 pa-0">
      <v-row class="px-8 py-4" no-gutters justify="center">
        <h1 class="healthy" v-if="isHealthy">Dentro del rango saludable</h1>
        <h1 class="healthy" v-else>Fuera del rango saludable</h1>
      </v-row>
      <v-row class="px-8 py-4" no-gutters justify="center">
        <LineChartGenerator
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
          :borderColor="borderColor"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {Chart as ChartJS,Title,Tooltip,Legend,LineElement,LinearScale,CategoryScale,PointElement} from 'chart.js'
import { mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";

ChartJS.register(Title,Tooltip,Legend,LineElement,LinearScale,CategoryScale,PointElement)

export default {
  name: 'IMCCard',
  components: {
    LineChartGenerator
  },
  computed: {
    ...mapState(useSecurityStore, {
      $currentUser: state => state.currentUser,
    }),
    chartData() {
      let array = [];
      let label = [];
      for(let i = 0; i < this.$currentUser.weight.length; i++) {
        array.push(parseInt(this.$currentUser.weight[i])/Math.pow(parseInt(this.$currentUser.height[i])/100, 2));
        label.push(`Dato #${i}`);
      }
      return {
        labels: label,
        datasets: [
          {
            label: 'IMC en el tiempo',
            borderColor: '#FD9900',
            fill: true,
            data: array,
          }
        ]
      }
    },
    isHealthy() {
      let currentIMC = parseInt(this.$currentUser.weight.at(-1))/Math.pow(parseInt(this.$currentUser.height.at(-1))/100, 2);
      return currentIMC >= 18.5 && currentIMC <= 25;
    }
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 700
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    },
    borderColor: {
      default: 'red'
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              font: {
                family: "Cera Pro", // Your font family
                size: 16,
                weight: 800,
              },
            },
          },
          x: {
            beginAtZero: false,
            ticks: {
              font: {
                family: "Cera Pro", // Your font family
                size: 16,
                weight: 800,
              },
            },
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
                family: 'Cera Pro',
                weight: 800
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.healthy {
  color: #001833;
}
</style>