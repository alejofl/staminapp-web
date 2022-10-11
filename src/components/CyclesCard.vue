<template>
  <v-card color=#E1E6EC >
    <v-container>
      <v-card-title class="secondary--text font-weight-bold">
        <div v-if="!edit_cycle">{{card_title}}</div>
        <div v-else class="full-width">
          <v-row class="justify-space-between ">
            <v-col md="10">
              <v-text-field
                filled
                label="Título del ciclo"
                v-model="card_title"
                background-color="#E1E6EC"
                color="secondary"
                hide-details>
              </v-text-field>
            </v-col>
            <v-col md="2">
              <v-text-field
                filled
                cols="3"
                label="Repeticiones"
                v-model="repetitions"
                background-color="#E1E6EC"
                color="secondary"
                hide-details>
              </v-text-field>
            </v-col>
          </v-row>
        </div>
        <v-chip
          class="ma-2 secondary"
          label
          v-show="!edit_cycle"
        >x{{repetitions}}
        </v-chip>
        <v-spacer v-show="!edit_cycle"></v-spacer>
        <div v-show="!edit_cycle">{{exercises.length}} ejercicio{{ exercises.length === 1 ? '' : 's' }}</div>
      </v-card-title>
      <v-card-text class="secondary--text grow">
        <v-list color="transparent">
          <template v-for="e in exercises">
            <v-list-item :key="e.id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ e.title }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-if="!edit_cycle">{{ e.description }}</v-list-item-action-text>
                <v-btn rounded color="secondary" v-else small>Editar Ejercicio</v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-list>
        <v-btn text v-show="edit_cycle" color="secondary" block><v-icon>add_circle</v-icon></v-btn>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ExercisesCard",
  data() {
    return {
      edit_cycle: true,
      card_title: "Ejercicio sin nombre",
      repetitions: 0,
      exercises: [
        {title: "Abdominales", description: "50 repeticiones", id: 1},
        {title: "Peso muerto", description: "10 repeticiones | 50 kg", id: 2}
      ],
    }
  },
  methods: {
  },
};
</script>

<style>
.full-width {
  width: 100%;
}
</style>