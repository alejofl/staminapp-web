<template>
  <v-card color="#E1E6EC" dark>
    <v-container class="ma-0 pa-0">
      <v-row class="px-8 py-4" no-gutters justify="center">
        <h1 style="color: #001833;" >Dentro de rango saludable</h1>
      </v-row>
<!--      <v-row class="px-8 py-4" no-gutters justify="start">-->
<!--        <h3 style="color: #FD9900">EVOLUCIÓN DE IMC</h3>-->
<!--      </v-row>-->
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

ChartJS.register(Title,Tooltip,Legend,LineElement,LinearScale,CategoryScale,PointElement)

export default {
  name: 'IMCCard',
  components: {
    LineChartGenerator
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
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'IMC en el tiempo',
            borderColor: '#FD9900',
            fill: true,
            data: [40, 36.2, 33.1, 30.8, 27.7, 26.5, 25],
          }
        ]
      },
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

</style>