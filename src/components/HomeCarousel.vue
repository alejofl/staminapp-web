<template>
  <v-carousel cycle interval="4000" hide-delimiter-background delimiter-icon="fitness_center" :show-arrows="false" height="100vh">
    <v-carousel-item v-for="item in images" :key="src">
      <v-img :src="item.src" gradient="0deg, rgba(253,153,0,.5), rgba(253,153,0,.5)"/>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "HomeCarousel",
  data (){
    return {
      images: [
        { src: require('@/assets/gym1.png')},
        { src: require('@/assets/gym2.png')},
        { src: require('@/assets/gym3.png')}
      ]
    }
  }

};
</script>

<style scoped>
  .homeGradient {
    background-image: linear-gradient(0deg, rgba(253,153,0,.5), rgba(253,153,0,.5));
  }
</style>