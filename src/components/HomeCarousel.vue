<template>
  <v-carousel cycle interval="4000" hide-delimiter-background delimiter-icon="fitness_center" :show-arrows="false" height="100vh">
    <v-carousel-item v-for="item in images" :key="item.src">
      <v-img :src="item.src" gradient="0deg, rgba(253,153,0,.5), rgba(253,153,0,.5)" max-height="100%" max-width="100%">
        <v-row
          class="fill-height ml-16"
          align="center"
          justify="start"
        >
          <div class="cera-pro">
            {{ item.text }}
            <br>
            con StaminApp
          </div>
        </v-row>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "HomeCarousel",
  data (){
    return {
      images: [
        { src: require('@/assets/gym1.jpg'), text: "Entrená más fácil" },
        { src: require('@/assets/gym2.jpg'), text: "Cumplí tus objetivos" },
        { src: require('@/assets/gym3.jpg'), text: "Compartí tus rutinas" }
      ]
    }
  }
};
</script>

<style scoped>
.cera-pro {
  font-family: "Cera Pro", sans-serif;
  font-weight: 900;
  font-style: italic;
  color: white;
  font-size: 7em;
  text-transform: uppercase;
  line-height: 1;
}
</style>