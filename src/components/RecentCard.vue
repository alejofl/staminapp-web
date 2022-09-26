<template>
<!--  <v-card>-->
<!--    <v-card-actions>-->
<!--      <v-menu absolute>-->
<!--        <v-card class="portrait"-->
<!--                img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"-->
<!--                height="300"-->
<!--                width="600"-->
<!--                v-bind="attrs"-->
<!--                v-on="on"></v-card>-->
<!--      </v-menu>-->
<!--    </v-card-actions>-->
<!--  </v-card>-->
<!--  <v-menu absolute ">-->
<!--     <template v-slot:activator="{ on, attrs }">-->
<!--       <v-row dense>-->
<!--         <v-col>-->
<!--           <v-card class="portrait" img="https://cdn.vuetifyjs.com/images/cards/girl.jpg" height="300" width="300" v-bind="attrs" v-on="on"></v-card>-->
<!--         </v-col>-->
<!--         <v-col>-->
<!--           <v-card class="portrait"  height="300" width="300" v-bind="attrs" v-on="on">hola</v-card>-->
<!--         </v-col>-->
<!--       </v-row>-->
<!--    </template>-->
<!--  </v-menu>-->
  <v-card>
    <v-card-actions>
      <v-btn absolute>
          hola aleh
      </v-btn>
    </v-card-actions>

    <v-avatar
      class="ma-3"
      size="125"
      tile
    >
      <v-img max-height="150" max-width="250" src="@/assets/logo.svg"></v-img>
    </v-avatar>
  </v-card>
</template>

<script>
export default {
  name: "RecentCard"
}
</script>

<style scoped>

</style>