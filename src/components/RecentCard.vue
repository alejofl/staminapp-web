<template>
  <v-btn elevation="2" width="360" height="96">
    <v-card width="360" height="96" class="secondary">
      <v-container fluid class="ma-0 pa-0">
        <v-row no-gutters>
          <v-col no-gutters cols="3">
            <v-img src="@/assets/recent_card.jpeg" height="96"></v-img>
          </v-col>
          <v-col no-gutters cols="9">
            <v-container fluid class="ma-0 pa-0">
              <v-row no-gutters>
                <v-col no-gutters cols="6">
                  <!--                  <div>-->
                  <v-rating
                    background-color="white"
                    color="primary"
                    empty-icon="star_purple500"
                    full-icon="star"
                    readonly
                    size="16"
                    value="3"
                  ></v-rating>
                  <!--                  </div>-->
                </v-col>
                <v-col no-gutters cols="6">
                  <v-chip color="primary">Hola</v-chip>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col no-gutters cols="12" class="white--text">
                  Pumped Chaos
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-btn>
</template>


<script>
export default {
  name: "RecentCard"
}
</script>

<style scoped>

</style>