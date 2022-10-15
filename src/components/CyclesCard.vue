<template>
  <v-card color=#E1E6EC>
    <v-container>
      <v-card-title class="secondary--text font-weight-bold">
        <div v-if="!edit_cycle" class="d-flex align-center full-width">
          <div>
            {{ cycle_data.name }}
          </div>
          <v-chip
            class="ma-2 secondary"
            label
          >
            x{{ cycle_data.repetitions }}
          </v-chip>
          <div class="ml-auto">{{ cycle_data.exercises.length }} ejercicio{{ cycle_data.exercises.length === 1 ? '' : 's' }}</div>
        </div>
        <div v-else class="full-width">
          <v-row class="justify-space-between ">
            <v-col md="10">
              <v-text-field
                filled
                label="Título del ciclo"
                v-model="cycle_data.name"
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
                v-model="cycle_data.repetitions"
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
          <template v-for="e in cycle_data.exercises">
            <v-list-item :key="e.order">
              <v-list-item-content>
                <v-list-item-title>
                  {{ e.data.name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-if="!edit_cycle">{{ get_description(e) }}</v-list-item-action-text>
                <v-dialog v-model="e.edit_dialog" width="500" v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn rounded color="secondary" small v-bind="attrs" v-on="on">Editar Ejercicio</v-btn>
                  </template>
                  <v-card class="mx-auto">
                    <v-card-title class="pb-4">
                      <v-autocomplete
                        filled
                        label="Nombre"
                        v-model="e.data"
                        :items="exercise_list"
                        item-text="name"
                        item-value="name"
                        :item-disabled="checkItemDisabled"
                        background-color="#E1E6EC"
                        color="secondary"
                        append-icon="arrow_drop_down"
                        return-object
                        hide-details
                      ></v-autocomplete>
                    </v-card-title>

                    <v-card-text class="text--secondary text-h5">
                      <v-container>
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
                            v-model="e.repetitions"
                            background-color="#E1E6EC"
                            color="secondary"
                            append-icon="replay"
                            hide-details>
                          </v-text-field>
                          <v-text-field
                            v-if="e.type === 1 || e.type === 2"
                            filled
                            label="Tiempo (segundos)"
                            v-model="e.duration"
                            background-color="#E1E6EC"
                            color="secondary"
                            return-object
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
              <v-autocomplete
                filled
                label="Nombre"
                v-model="new_exercise.data"
                :items="exercise_list"
                item-text="name"
                item-value="name"
                :item-disabled="checkItemDisabled"
                background-color="#E1E6EC"
                color="secondary"
                append-icon="arrow_drop_down"
                return-object
                hide-details
              ></v-autocomplete>
            </v-card-title>

            <v-card-text class="text--secondary text-h5">
              <v-container>
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
                    v-model="new_exercise.repetitions"
                    background-color="#E1E6EC"
                    color="secondary"
                    append-icon="replay"
                    hide-details>
                  </v-text-field>
                  <v-text-field
                    v-if="new_exercise.type === 1 || new_exercise.type === 2"
                    filled
                    label="Tiempo (segundos)"
                    v-model="new_exercise.duration"
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
import { mapActions, mapState } from "pinia";
import { useRoutinesStore } from "@/store/RoutinesStore";
import { DefaultCycleExercise } from "@/assets/default_data";
import { useExercisesStore } from "@/store/ExercisesStore";

export default {
  name: "ExercisesCard",
  props: {
    edit_cycle: {
      type: Boolean,
      default: false
    },
    idx: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      new_exercise_dialog: false,
      new_exercise: JSON.parse(JSON.stringify(DefaultCycleExercise)),

      exercise_list: [],

      last_order: 1
    }
  },
  computed: {
    ...mapState(useRoutinesStore, {
      routine_data: state => state.routine_data,
      deleted_exercises: state => state.deleted_exercises,
    }),

    cycle_data: function () {
      return this.routine_data.cycles[this.idx];
    },

    used_exercises: function () {
      let u = [];
      for (let x of this.cycle_data.exercises) {
        u.push(x.data.id);
      }
      return u;
    }
  },
  methods: {
    ...mapActions(useExercisesStore, {
      $getSavedExercises: 'getSavedExercises'
    }),
    save_new_exercise() {
      this.new_exercise_dialog = false;
      this.new_exercise.order = this.last_order++;
      this.cycle_data.exercises.push(this.new_exercise);

      // Si estaba en eliminados, lo saco de eliminados
      let i;
      let found = false;
      for (i = 0; i < this.deleted_exercises.length;) {
        if (this.deleted_exercises[i].exercise === this.new_exercise.data.id && this.deleted_exercises[i].cycle === this.cycle_data.id) {
          found = true;
        } else {
          i++;
        }
      }
      if (found) {
        this.deleted_exercises.splice(i, 1);
      }

      this.new_exercise = JSON.parse(JSON.stringify(DefaultCycleExercise));
    },
    discard_new_exercise() {
      this.new_exercise_dialog = false;
      this.new_exercise = JSON.parse(JSON.stringify(DefaultCycleExercise));
    },
    delete_exercise(e) {
      let found = false;
      let i;
      for (i = 0; !found && i < this.cycle_data.exercises.length;) {
        if (this.cycle_data.exercises[i] === e) {
          found = true;
        } else {
          i++;
        }
      }
      this.deleted_exercises.push({cycle: this.cycle_data.id, exercise: this.cycle_data.exercises[i].data.id});
      this.cycle_data.exercises.splice(i, 1);
    },
    get_description(e) {
      let string = '';
      let reps = `${e.repetitions} repeticiones`;
      let time = `${e.duration} segundos`;
      if (e.type === 0) {
        string += reps
      } else if (e.type === 1) {
        string += time
      } else {
        string += `${reps} | ${time}`
      }
      return string
    },
    async get_all_exercises() {
      try {
        let result = await this.$getSavedExercises();
        for (let ex of result.content) {
          this.exercise_list.push({id: ex.id, name: ex.name})
        }
      } catch (e) {
        console.log(e);
      }
    },
    checkItemDisabled(item) {
      return this.used_exercises.includes(item.id);
    },
  },
  beforeMount() {
    this.get_all_exercises();
  }
};
</script>

<style>
.full-width {
  width: 100%;
}
.myTitle {
  color: #001833;
}
</style>