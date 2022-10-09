<template>
  <v-card color="#E1E6EC" dark>
    <v-container class="ma-0 pa-0">
      <v-row class="px-8 py-4" no-gutters justify="center">
        <h1 style="color: #001833;" >Actividad Semanal (minutos)</h1>
      </v-row>
      <v-row class="px-8 py-4" no-gutters justify="center">
        <Bar
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "ActivityCard",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 800
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
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        labels: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado'
        ],
        datasets: [
          {
            label: 'Actividad Diaria (Minutos)',
            backgroundColor: '#FD9900',
            data: [120, 100, 90, 80, 70, 60, 50]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
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
};
</script>

<style scoped>

</style>