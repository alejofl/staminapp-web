<template>
  <v-card rounded @click="">
    <v-responsive aspect-ratio="1">
      <v-img class="white--text align-end" height="100%" src="https://as01.epimg.net/deporteyvida/imagenes/2018/03/14/portada/1521050434_557929_1521050572_noticia_normal_recorte1.jpg">
        <div class="fill-height bottom-gradient">
          <v-card-title large class="pb-0 text-h5">
            Pumped Chaos
          </v-card-title>
          <v-card-text>
            <v-rating empty-icon="star_outline" color="white" full-icon="star" half-icon="star_half" half-increments hover length="5" value="3.2" readonly dense>
            </v-rating>
          </v-card-text>
        </div>
      </v-img>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  name: "RoutineCard"
};
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
}
</style>