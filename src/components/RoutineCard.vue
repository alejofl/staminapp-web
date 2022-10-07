<template>
  <v-card class="mx-auto" rounded max-width="400" @click="">
    <v-responsive aspect-ratio="1">
      <v-img class="white--text align-end" height="100%" src="https://static3.abc.es/media/bienestar/2020/12/03/gym-box-kCDD--1024x512@abc.jpg">
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