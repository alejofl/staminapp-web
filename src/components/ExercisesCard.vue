<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="368px" transition="dialog-bottom-transition">

      <template v-slot:activator="{ on, attrs }">
        <v-flex>
          <v-card class="exercise-card" color=#E1E6EC outlined rounded="xl" v-bind="attrs" v-on="on">
            <v-card-title class="secondary--text font-weight-bold">
              <div>{{currentExercise.name}}</div>
            </v-card-title>
            <v-card-text class="secondary--text grow">
              <div>{{currentExercise.detail}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </template>

      <v-flex align-self-center>
        <v-card class="exercise-card" color=#E1E6EC outlined rounded="xl">
          <v-container>
          <v-card-title class="secondary--text font-weight-bold">
            <div v-show="!show_editable_exercise_name">{{currentExercise.name}}</div>
            <v-text-field v-model="unsaved_name" v-show="show_editable_exercise_name" color="secondary"></v-text-field>
          </v-card-title>
          <v-card-text class="secondary--text grow">
            <div v-show="!show_editable_exercise_description">{{currentExercise.detail}}</div>
            <v-textarea v-model="unsaved_description" color="secondary" v-show="show_editable_exercise_description"></v-textarea>
          </v-card-text>
            <v-row justify="center" align="center">
              <v-col md="12" align="center">
                <v-btn width="100%" :color="is_editing ? 'green':'secondary'" @click="
                  ;is_editing =! is_editing
                  ;show_editable_exercise_name =! show_editable_exercise_name
                  ;show_editable_exercise_description =! show_editable_exercise_description
                  ;is_editing ? 0:onSavePressed()">
                  {{ is_editing ? 'GUARDAR EJERCICIO' : 'EDITAR EJERCICIO' }}</v-btn>
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-col md="12" align="center">
                <v-btn color="error" @click="dialog=false; onDeletePressed()" width="100%" ref="delete-button">ELIMINAR EJERCICIO</v-btn>
              </v-col>
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
      show_editable_exercise_name:false,
      show_editable_exercise_description:false,
      is_editing:false,
      dialog:false,
      unsaved_name: '',
      unsaved_description: '',
    }
  },
  computed: {
    ...mapState(useExercisesStore, {
      $exercises: state => state.exercises,
    }),
    currentExercise: function() {
      return this.$exercises[this.idx];
    },
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
        console.log(e.code);
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
        console.log(e.code);
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