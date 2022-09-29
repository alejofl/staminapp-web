<template>
  <!--<v-card elevation="2" color="#E1E6EC" v-show="show" width="368px" height="96px" max-height="100%" class="exercise-card">-->
  <v-flex>
    <v-card class="cycles-card" color=#E1E6EC v-if="!edit_cycle" outlined>
      <v-container>
        <v-card-title class="secondary--text font-weight-bold">
          <div >{{card_title}}</div>
          <v-chip
            class="ma-2 secondary"
            label
          >X{{repetitions}}
          </v-chip>
          <v-spacer></v-spacer>
          <div >{{exercises_qty}} ejercicios</div>
        </v-card-title>
        <v-card-text class="secondary--text grow">
          <v-list color="#E1E6EC">
            <v-list-item>
              <v-icon>check</v-icon>
              Ejercicio 1
              <v-spacer></v-spacer>
              <div class="secondary--text font-weight-bold">descripcion</div>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-card-text>
      </v-container>
    </v-card>
    <v-card class="cycles-card" color=#E1E6EC v-else outlined>
      <v-container>
        <v-card-title class="secondary--text font-weight-bold">
          <v-text-field v-model="card_title"></v-text-field>
          <v-chip
            class="ma-2 font-weight-bold"
            label
            color="#E1E6EC"
          >X{{repetitions}}
          </v-chip>
          <v-spacer></v-spacer>
          <div >{{exercises_qty}} ejercicios</div>
        </v-card-title>
        <v-card-text class="secondary--text grow">
          <v-list color="#E1E6EC">
            <v-list-item>
              <v-icon>check</v-icon>
              Ejercicio 1
              <v-spacer></v-spacer>
              <v-chip
              color="secondary"
              text-color="#E1E6EC"
              >EDITAR EJERCICIO</v-chip>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-card-text>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "ExercisesCard",
  data() {
    return {
      edit_cycle:false,
      card_title: "Ejercicio sin nombre",
      repetitions: 0,
      exercises_qty : 0,
    }
  },
  methods: {
  },
};
</script>

<style>
.cycles-card{
  display: flex;
  flex-direction: column;
  width: 675px;
}
</style>