<template>
  <v-card class="" max-width="600px" rounded>
    <div class="d-flex">
      <v-container>
        <v-row no-gutters>
          <v-col no-gutters md="4">
            <v-img src="@/assets/recent_card.jpeg" max-height="200" max-width="200" aspect-ratio="1"></v-img>
          </v-col>
          <v-col md="8">
            <v-container class="py-0">
              <v-row no-gutters class="justify-end pb-10">
                <v-icon size="48" color="error">favorite_border</v-icon>
              </v-row>
              <v-row no-gutters>
                <v-rating class="pl-3" empty-icon="star_outline" color="primary" full-icon="star" half-icon="star_half" half-increments hover length="5" value="3.2" dense size="28"/>
              </v-row>
              <v-row no-gutters>
                <v-card-title class="text-h4 py-2">Pumped Chaos</v-card-title>
              </v-row>
              <v-row no-gutters>
                <v-card-subtitle class="py-0">Dwayne Johnson</v-card-subtitle>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
        <v-row no-gutters class="py-6">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam atque consectetur ipsum nisi temporibus unde? Assumenda explicabo hic ipsa ullam unde? Consectetur illum laboriosam minima molestiae possimus temporibus. Expedita?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam atque consectetur ipsum nisi temporibus unde? Assumenda explicabo hic ipsa ullam unde? Consectetur illum laboriosam minima molestiae possimus temporibus. Expedita?</p>
        </v-row>
        <v-row no-gutters>
          <v-container class="pa-0">
            <v-row no-gutters class="pb-4">
              <v-btn color="secondary" width="100%">EDITAR RUTINA</v-btn>
            </v-row>
            <v-row no-gutters>
              <v-btn color="primary" width="100%">COMPARTIR RUTINA</v-btn>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </div>
<!--      <div class="flex-grow-1">-->
<!--        <v-avatar size="200" tile>-->
<!--        </v-avatar>-->
<!--        <div>-->
<!--          <-->
<!--        </div>-->
<!--      </div>-->
<!--      <div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div>-->

<!--    </div>-->
<!--    <div>-->

<!--    </div>-->
  </v-card>
</template>

<script>
export default {
  name: "RoutineDetailCard"
};
</script>

<style scoped>

</style>