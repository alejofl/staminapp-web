<template>
  <v-card rounded @click="">
    <v-responsive aspect-ratio="1" max-height="400px">
      <v-img class="white--text align-end" min-height="400px" max-height="400px" :src="base64Data.picture" v-if="base64Data != null">
        <div class="fill-height bottom-gradient">
          <v-card-title large class="pb-0 routineCardText">
            {{ name }}
          </v-card-title>
          <v-card-text>
            <v-rating empty-icon="star_outline" color="white" full-icon="star" half-icon="star_half" half-increments hover length="5" :value="rating" readonly dense>
            </v-rating>
          </v-card-text>
        </div>
      </v-img>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  props: {id: Number, name: String, rating: Number, base64Data: Object},
  name: "RoutineCard",
  methods: {
  }
};
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
}

.routineCardText {
  color: white;
  font-size: 1.5rem !important;
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: normal !important;
  font-family: "Roboto", sans-serif !important;
}

.img {
  object-fit: cover; /* or object-fit: contain; */
}
</style>