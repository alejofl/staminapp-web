<template>
  <v-card color="#E1E6EC" dark max-width="750" max-height="448">
    <v-container class="ma-0 pa-0">
      <v-row class="px-8 py-4" no-gutters justify="start">
        <h1 style="color: #001833;" >Dentro de rango saludable</h1>
      </v-row>
      <v-row class="px-8 py-4" no-gutters justify="start">
        <h3 style="color: #FD9900">EVOLUCIÓN DE IMC</h3>
      </v-row>
      <v-row class="px-8 py-4" no-gutters justify="start">
        <v-sparkline :value="value" color="primary" height="100" padding="10" stroke-linecap="round" smooth>
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "IMCCard",
  data: () => ({
    value: [
      1000,
      446,
      675,
      510,
      590,
      610,
      760,
    ],
  }),
};
</script>

<style scoped>
/* The parent element */
.css-chart {
  /* The chart borders */
  border-bottom: 1px solid;
  border-left: 1px solid;
  /* The height, which is initially defined in the HTML */
  height: var(--widget-size);
  /* A little breathing room should there be others items around the chart */
  margin: 1em;
  /* Remove any padding so we have as much space to work with inside the element */
  padding: 0;
  position: relative;
  /* The chart width, as defined in the HTML */
  width: var(--widget-size);
}

  /* The unordered list holding the data points, no list styling and no spacing */
.line-chart {
  list-style: none;
  margin: 0;
  padding: 0;
}
  /* Each point on the chart, each a 12px circle with a light border */
.data-point {
  background-color: white;
  border: 2px solid lightblue;
  border-radius: 50%;
  height: 12px;
  position: absolute;
  width: 12px;
}
</style>