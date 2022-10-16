<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="368px" transition="dialog-bottom-transition">

      <template v-slot:activator="{ on, attrs }">
        <v-flex>
          <v-card class="exercise-card" color=#E1E6EC rounded="xl" v-bind="attrs" v-on="on">
            <v-card-title class="secondary--text font-weight-bold">
              <div>{{currentExercise.name}}</div>
            </v-card-title>
            <v-card-subtitle class="secondary--text grow">
              <div>{{currentExercise.detail}}</div>
            </v-card-subtitle>
          </v-card>
        </v-flex>
      </template>

      <v-flex align-self-center>
        <v-card class="exercise-card">
          <v-container>
            <v-row no-gutters>
              <v-card-title v-if="!show_editable_exercise_name" class="py-2 px-1">{{ currentExercise.name }}</v-card-title>
              <v-text-field v-else class="py-2" filled label="Nombre" v-model="unsaved_name" background-color="#E1E6EC" color="secondary" hide-details></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-card-text v-if="!show_editable_exercise_description" class="grow pa-1">
                {{currentExercise.detail}}
              </v-card-text>
              <v-textarea :rules="max_length" filled label="Descripción" background-color="#E1E6EC" counter auto-grow v-model="unsaved_description" color="secondary" v-else></v-textarea>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-container class="pa-0">
                <v-row no-gutters class="pb-2">
                  <v-btn width="100%" :disabled="disableSaved" :color="is_editing ? 'success':'secondary'" @click="is_editing = !is_editing;
                                                                                                                    show_editable_exercise_name = !show_editable_exercise_name;
                                                                                                                    show_editable_exercise_description = !show_editable_exercise_description;
                                                                                                                    is_editing ? '' : onSavePressed()">
                    {{ is_editing ? 'GUARDAR EJERCICIO' : 'EDITAR EJERCICIO' }}
                  </v-btn>
                </v-row>
                <v-row no-gutters>
                  <v-btn color="error" @click="dialog=false; onDeletePressed()" width="100%" ref="delete-button">ELIMINAR EJERCICIO</v-btn>
                </v-row>
              </v-container>
            </v-row>
          </v-container>
        </v-card>
      </v-flex>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useExercisesStore } from "@/store/ExercisesStore";
import { Exercise } from "@/api/exercises";

export default {
  props: {idx: Number},
  name: "ExercisesCard",
  data() {
    return {
      max_length: [v => v.length <= 200 || 'Hasta 200 caracteres'],

      show_editable_exercise_name:false,
      show_editable_exercise_description:false,
      is_editing:false,
      dialog:false,
      unsaved_name: '',
      unsaved_description: '',
    }
  },
  watch: {
    dialog(newvalue, oldvalue) {
      if (!newvalue && oldvalue) {
        this.unsaved_name = this.currentExercise.name;
        this.unsaved_description = this.currentExercise.detail;
        this.is_editing = false;
      }
    }
  },
  computed: {
    ...mapState(useExercisesStore, {
      $exercises: state => state.exercises,
    }),
    currentExercise: function() {
      return this.$exercises[this.idx];
    },
    disableSaved() {
      return this.unsaved_description.length > 200 || this.unsaved_description.length === 0 || this.unsaved_name.length === 0
    }
  },
  methods: {
    ...mapActions(useExercisesStore, {
      $updateExercise: 'updateExercise',
      $delete_exercise: 'delete_exercise',
    }),
    onDeletePressed(){
      this.deleteExercise(this.currentExercise.id);
    },
    onSavePressed(){
      this.currentExercise.name = this.unsaved_name;
      this.currentExercise.detail = this.unsaved_description;
      this.updateExercise(this.currentExercise.id, this.currentExercise.name, this.currentExercise.detail);
    },
    async updateExercise(exerciseID, exerciseName, exerciseDetail) {
      try{
        const exercise = new Exercise(exerciseName, exerciseDetail,'exercise', null);
        await this.$updateExercise(exerciseID, exercise);
      }
      catch (e) {
        this.$emit('apiError');
      }
    },
    async deleteExercise(exerciseID){
      try {
        await this.$delete_exercise(exerciseID)
        let i = 0
        for(let found = false ; !found && i < this.$exercises.length ; i++){
          if(this.$exercises[i].id === exerciseID){
            found = true
          }
        }
        this.$exercises.splice(i-1,1);
      }
      catch (e) {
        this.$emit('apiError');
      }
    }

  },
  created() {
    this.unsaved_name = this.currentExercise.name;
    this.unsaved_description = this.currentExercise.detail;
  }
};
</script>

<style>
.exercise-card{
  display: flex;
  flex-direction: column;
}
</style>