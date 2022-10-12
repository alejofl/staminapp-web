<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="368px"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-flex>
          <v-card class="exercise-card" color=#E1E6EC outlined rounded="xl" v-bind="attrs" v-on="on" v-show="show_card">
            <v-card-title class="secondary--text font-weight-bold">
              <div>{{saved_exercise_name}}</div>
            </v-card-title>
            <v-card-text class="secondary--text grow">
              <div>{{saved_exercise_description}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
      <v-flex align-self-center>
        <v-card class="exercise-card" color=#E1E6EC outlined rounded="xl" v-bind="attrs" v-on="on" v-show="show_card">
          <v-container>
          <v-card-title class="secondary--text font-weight-bold">
            <div v-show="!show_editable_exercise_name">{{saved_exercise_name}}</div>
            <v-text-field v-model="unsaved_exercise_name" v-show="show_editable_exercise_name" color="secondary"></v-text-field>
          </v-card-title>
          <v-card-text class="secondary--text grow">
            <div v-show="!show_editable_exercise_description">{{saved_exercise_description}}</div>
            <v-textarea color="secondary" v-model="unsaved_exercise_description" v-show="show_editable_exercise_description"></v-textarea>
          </v-card-text>
            <v-row justify="center" align="center">
              <v-col md="12" align="center">
                <v-btn width="100%" :color="is_editing ? 'green':'secondary'" @click="
                is_editing ? saved_exercise_description=unsaved_exercise_description:0
                ;is_editing ? saved_exercise_name=unsaved_exercise_name:0
                ;is_editing=!is_editing
                ;show_editable_exercise_name=!show_editable_exercise_name
                 ;show_editable_exercise_description=!show_editable_exercise_description">
                  {{ is_editing ? 'GUARDAR EJERCICIO' : 'EDITAR EJERCICIO' }}</v-btn>
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-col md="12" align="center">
                <v-btn color="error" @click="show_card=false;dialog=false" width="100%">ELIMINAR EJERCICIO</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-flex>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props:{saved_exercise_name: String,saved_exercise_description: String,unsaved_exercise_name:String,unsaved_exercise_description:String},
  name: "ExercisesCard",
  data() {
    return {
      show_card:true,
      show_editable_exercise_name:false,
      show_editable_exercise_description:false,
      is_editing:false,
      dialog:false,
    }
  },
  methods: {
  },
};
</script>

<style>
.exercise-card{
  display: flex;
  flex-direction: column;
  /*width: 368px;*/
}
</style>