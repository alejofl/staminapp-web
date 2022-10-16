<template>
  <v-col class="pa-0">
    <v-card class="secondary white--text" max-height="125" rounded @click="">
      <div class="d-flex">
        <v-img :src="base64Data.picture" max-height="125" max-width="125" aspect-ratio="1"></v-img>
        <div class="flex-grow-1">
          <div class="d-flex flex-no-wrap justify-space-between align-center pt-2">
            <v-rating class="pl-4" empty-icon="star_outline" color="white" full-icon="star" half-icon="star_half"
                      half-increments hover length="5" :value=rating readonly dense size="20"/>
            <div></div>
            <v-chip class="mr-2" color="#3ad6de" outlined>{{ web_difficulty }}</v-chip>
          </div>
          <v-card-title class="text-h5">{{ routineName }}</v-card-title>
        </div>
        <div>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { Difficulty } from "@/assets/default_data";

export default {
  props: {id: Number, routineName: String, difficulty: String, userName: String, rating: Number, base64Data: Object},
  name: "RecentCard",
  data() {
    return {
      web_difficulty: Difficulty.for_web[this.difficulty],
    }
  }
}
</script>

<style scoped>

</style>