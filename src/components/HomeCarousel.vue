<template>
  <v-carousel :show-arrows="false" height="100vh">
    <v-carousel-item v-for="item in images" :key="src">
      <v-img dark :src="item.src"></v-img>
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

</style>