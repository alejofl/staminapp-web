<template>
  <v-col>
    <v-card class="secondary white--text" max-width="500" max-height="125" rounded @click="">
      <div class="d-flex">
        <v-img src="@/assets/recent_card.jpeg" max-height="125" max-width="125" aspect-ratio="1"></v-img>
        <div class="flex-grow-1">
          <div class="d-flex flex-no-wrap justify-space-between align-center pt-2">
            <v-rating class="pl-4" empty-icon="star_outline" color="white" full-icon="star" half-icon="star_half" half-increments hover length="5" value="3.2" readonly dense size="20"/>
            <div></div>
            <v-chip class="mr-2" color="#3ad6de" outlined>Principiante</v-chip>
          </div>
          <v-card-title class="text-h5">Pumped Chaos</v-card-title>
          <v-card-subtitle>Dwayne Johnson</v-card-subtitle>
        </div>
        <div>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "RecentCard"
}
</script>

<style scoped>

</style>