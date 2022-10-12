<template>
  <v-card color=#E1E6EC >
    <v-container>
      <v-card-title class="secondary--text font-weight-bold">
        <div v-if="!edit_cycle" class="d-flex align-center full-width">
          <div>
            {{card_title}}
          </div>
          <v-chip
            class="ma-2 secondary"
            label
          >
            x{{repetitions}}
          </v-chip>
          <div class="ml-auto">{{exercises.length}} ejercicio{{ exercises.length === 1 ? '' : 's' }}</div>
        </div>
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
                <v-dialog v-model="e.edit_dialog" width="500" v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn rounded color="secondary" small v-bind="attrs" v-on="on">Editar Ejercicio</v-btn>
                  </template>
                  <v-card class="mx-auto">
                    <v-card-title>
                      <v-text-field
                        filled
                        label="Nombre"
                        v-model="e.title"
                        background-color="#E1E6EC"
                        color="secondary"
                        append-icon="search"
                        hide-details>
                      </v-text-field>
                    </v-card-title>

                    <v-card-text class="text--secondary text-h5">
                      <v-container>
                        <v-row color="#001833" class="pt-4">
                          <span class="myTitle">Peso</span>
                          <v-spacer></v-spacer>
                          <v-switch v-model="e.has_weight" inset color="secondary" class="ma-0 custom_toggle"></v-switch>
                        </v-row>
                        <v-row v-if="e.has_weight">
                          <v-text-field
                            filled
                            label="Peso (kg)"
                            v-model="e.weight"
                            background-color="#E1E6EC"
                            color="secondary"
                            append-icon="fitness_center"
                            hide-details>
                          </v-text-field>
                        </v-row>
                        <v-row :class="e.has_weight ? 'py-4' : 'pb-4'">
                          <v-divider></v-divider>
                        </v-row>
                        <v-row>
                          <v-btn-toggle mandatory v-model="e.type" color="secondary" rounded class="flex-grow-1">
                            <v-btn class="flex-grow-1" >
                              Repeticiones
                            </v-btn>
                            <v-btn class="flex-grow-1">
                              Tiempo
                            </v-btn>
                            <v-btn class="flex-grow-1">
                              Ambos
                            </v-btn>
                          </v-btn-toggle>
                        </v-row>
                        <v-row class="pt-4">
                          <v-text-field
                            v-if="e.type === 0 || e.type === 2"
                            :class="e.type === 0 ? '' : 'mr-2'"
                            filled
                            label="Repeticiones"
                            v-model="e.reps"
                            background-color="#E1E6EC"
                            color="secondary"
                            append-icon="replay"
                            hide-details>
                          </v-text-field>
                          <v-text-field
                            v-if="e.type === 1 || e.type === 2"
                            filled
                            label="Tiempo (segundos)"
                            v-model="e.time"
                            background-color="#E1E6EC"
                            color="secondary"
                            append-icon="hourglass_bottom"
                            hide-details>
                          </v-text-field>
                        </v-row>
                        <v-row class="pt-8">
                          <v-btn color="error" width="100%" @click="delete_exercise(e);">Eliminar Ejercicio</v-btn>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-list>
        <v-dialog v-model="new_exercise_dialog" width="500" v-if="edit_cycle" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-show="edit_cycle" color="secondary" block v-bind="attrs" v-on="on"><v-icon>add_circle</v-icon></v-btn>
          </template>
          <v-card class="mx-auto">
            <v-card-title>
              <v-text-field
                filled
                label="Nombre"
                v-model="new_exercise.title"
                background-color="#E1E6EC"
                color="secondary"
                append-icon="search"
                hide-details>
              </v-text-field>
            </v-card-title>

            <v-card-text class="text--secondary text-h5">
              <v-container>
                <v-row color="#001833" class="pt-4">
                  <span class="myTitle">Peso</span>
                  <v-spacer></v-spacer>
                  <v-switch v-model="new_exercise.has_weight" inset color="secondary" class="ma-0 custom_toggle"></v-switch>
                </v-row>
                <v-row v-if="new_exercise.has_weight">
                  <v-text-field
                    filled
                    label="Peso (kg)"
                    v-model="new_exercise.weight"
                    background-color="#E1E6EC"
                    color="secondary"
                    append-icon="fitness_center"
                    hide-details>
                  </v-text-field>
                </v-row>
                <v-row :class="new_exercise.has_weight ? 'py-4' : 'pb-4'">
                  <v-divider></v-divider>
                </v-row>
                <v-row>
                  <v-btn-toggle mandatory v-model="new_exercise.type" color="secondary" rounded class="flex-grow-1">
                    <v-btn class="flex-grow-1" >
                      Repeticiones
                    </v-btn>
                    <v-btn class="flex-grow-1">
                      Tiempo
                    </v-btn>
                    <v-btn class="flex-grow-1">
                      Ambos
                    </v-btn>
                  </v-btn-toggle>
                </v-row>
                <v-row class="pt-4">
                  <v-text-field
                    v-if="new_exercise.type === 0 || new_exercise.type === 2"
                    :class="new_exercise.type === 0 ? '' : 'mr-2'"
                    filled
                    label="Repeticiones"
                    v-model="new_exercise.reps"
                    background-color="#E1E6EC"
                    color="secondary"
                    append-icon="replay"
                    hide-details>
                  </v-text-field>
                  <v-text-field
                    v-if="new_exercise.type === 1 || new_exercise.type === 2"
                    filled
                    label="Tiempo (segundos)"
                    v-model="new_exercise.time"
                    background-color="#E1E6EC"
                    color="secondary"
                    append-icon="hourglass_bottom"
                    hide-details>
                  </v-text-field>
                </v-row>
                <v-row class="pt-8">
                  <v-btn color="secondary" width="100%" @click="save_new_exercise();">Guardar Ejercicio</v-btn>
                </v-row>
                <v-row class="pt-4">
                  <v-btn color="error" width="100%" @click="discard_new_exercise();">Cancelar</v-btn>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ExercisesCard",
  data() {
    return {
      edit_cycle: false,
      card_title: "Ejercicio sin nombre",
      repetitions: 0,
      exercises: [
        {title: "Abdominales", id: 1, edit_dialog: false, type: undefined, has_weight: true, weight: 8, reps: null, time: null},
        {title: "Abdominales", id: 2, edit_dialog: false, type: undefined, has_weight: true, weight: 8, reps: null, time: null},
      ],
      new_exercise_dialog: false,
      new_exercise: {title: "", id: undefined, edit_dialog: false, type: undefined, has_weight: false, weight: undefined, reps: undefined, time: undefined}
    }
  },
  methods: {
    save_new_exercise() {
      this.new_exercise_dialog = false;
      this.exercises.push(this.new_exercise);
      this.new_exercise = {title: "", id: undefined, edit_dialog: false, type: undefined, has_weight: false, weight: undefined, reps: undefined, time: undefined}
    },
    discard_new_exercise() {
      this.new_exercise_dialog = false;
      this.new_exercise = {title: "", description: "", id: null, edit_dialog: false, type: undefined, has_weight: false, weight: null, reps: null, time: null}
    },
    delete_exercise(e) {
      let found = false;
      let i;
      for (i = 0; !found && i < this.exercises.length;) {
        if (this.exercises[i].id === e.id) {
          found = true;
        } else {
          i++;
        }
      }
      this.exercises.splice(i, 1);
    }
  },
};
</script>

<style>
.full-width {
  width: 100%;
}
.myTitle {
  color: #001833;
}
.custom_toggle {
}
</style>