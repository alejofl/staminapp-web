<template>
  <div class="myContainer pa-8">
    <v-container class="full-width">
      <v-row>
        <v-col cols="4">
          <v-card class="" max-width="600px" rounded>
            <div class="d-flex">
              <v-container>
                <v-row no-gutters>
                  <v-col no-gutters md="4" class="align-center justify-center">
                    <v-hover v-slot="{ hover }" v-if="edit">
                      <v-card @click="handle_image" height="100%" width="100%">
                        <input ref="uploader" class="d-none" type="file" @change="uploadImage">
                        <v-fade-transition>
                          <v-overlay class="overlay-class square-overlay" absolute opacity="0.5" v-if="hover">
                            <v-icon>photo_camera</v-icon>
                          </v-overlay>
                        </v-fade-transition>
                        <v-img :src="routine_data.picture" height="100%" width="100%"></v-img>
                      </v-card>
                    </v-hover>
                    <v-card height="100%" width="100%" v-else>
                      <v-img :src="routine_data.picture" height="100%" width="100%"></v-img>
                    </v-card>
                  </v-col>
                  <v-col md="8">
                    <v-container class="py-0">
                      <v-row no-gutters class="justify-end align-center">
                        <v-icon size="48" color="error" :disabled="user_is_owner || edit" v-if="!favourite" @click="faveRoutine();">favorite_border</v-icon>
                        <v-icon size="48" color="error" :disabled="user_is_owner || edit" v-else @click="unfaveRoutine();">favorite</v-icon>
                      </v-row>
                      <v-row no-gutters class="pl-3 py-2">
                        <v-select label="Dificultad" v-model="routine_data.difficulty" :items="difficulties" append-icon="expand_more" color="secondary" filled background-color="#E1E6EC" hide-details v-if="edit">
                          {{ routine_data.difficulty }}
                        </v-select>
                        <v-chip color="secondary" v-else outlined>{{ routine_data.difficulty }}</v-chip>
                      </v-row>
                      <v-row no-gutters>
                        <v-rating class="pl-3" empty-icon="star_outline" color="primary" full-icon="star" half-icon="star_half" hover length="5" :value="parseInt(routine_data.score)" :readonly="edit" dense size="28" @input="rateRoutine($event)"/>
                      </v-row>
                      <v-row no-gutters>
                        <v-text-field v-if="edit" class="py-2 pl-3" filled label="T??tulo" v-model="routine_data.name" background-color="#E1E6EC" color="secondary" hide-details>
                          {{ routine_data.name }}
                        </v-text-field>
                        <v-card-title v-else class="text-h4 py-2">{{ routine_data.name }}</v-card-title>
                      </v-row>
                      <v-row no-gutters>
                        <v-card-subtitle class="py-0">
                          <router-link :is="edit ? 'span' : 'router-link'" :to="{name: 'user', params: {id: routine_data.author.id}}">
                            {{ routine_data.author.username }}
                          </router-link>
                        </v-card-subtitle>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
                <v-row no-gutters class="py-6">
                  <v-textarea v-if="edit" filled label="Descripci??n" v-model="routine_data.detail" background-color="#E1E6EC" color="secondary" hide-details auto-grow>
                    {{ routine_data.detail }}
                  </v-textarea>
                  <p v-else>{{ routine_data.detail }}</p>
                </v-row>
                <v-row no-gutters>
                  <v-container class="pa-0">
                    <v-row no-gutters class="pb-4" v-if="user_is_owner || is_new_routine">
                      <v-btn v-if="edit" color="success" width="100%" @click="saveChanges();">GUARDAR CAMBIOS</v-btn>
                      <v-btn v-else color="secondary" width="100%" @click="edit = true;">EDITAR RUTINA</v-btn>
                    </v-row>
                    <v-row no-gutters>
                      <v-btn v-if="edit && !is_new_routine" color="error" width="100%" @click="deleteRoutine();">ELIMINAR RUTINA</v-btn>
                      <v-btn v-else :disabled="edit" color="primary" width="100%" @click="shareRoutine();">COMPARTIR RUTINA</v-btn>
                    </v-row>
                  </v-container>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-col>
        <v-col cols="8">
          <h1 class="cera-pro">Ciclos</h1>
          <div v-for="(cycle, index) in routine_data.cycles" :key="index" class="pb-4">
            <CyclesCard :edit_cycle="edit" :idx="index" v-on:apiError="error_snackbar = true"></CyclesCard>
            <v-btn v-if="edit" color="error" width="100%" @click="delete_cycle(cycle)">Borrar Ciclo</v-btn>
          </div>
          <v-btn class="mt-4" text v-show="edit" color="secondary" block @click="new_cycle();"><v-icon class="pr-2">add_circle</v-icon>A??adir Ciclo</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="validation_snackbar" :timeout="timeout" color="error"><strong>Error.</strong> Hay un error en tu rutina, revisala.</v-snackbar>
    <v-snackbar v-model="copied_snackbar" :timeout="timeout" color="success"><strong>??xito.</strong> Enlace copiado al portapapeles.</v-snackbar>
    <v-snackbar v-model="error_snackbar" :timeout="timeout" color="error"><strong>Error.</strong> Ha ocurrido un error inesperado. Por favor, intent?? de nuevo m??s tarde.</v-snackbar>
  </div>
</template>

<script>
import CyclesCard from "@/components/CyclesCard";
import { useRoutinesStore } from "@/store/RoutinesStore";
import { mapActions, mapState } from "pinia";
import { DefaultCycle, DefaultRoutine, Difficulty } from "@/assets/default_data";
import { useSecurityStore } from "@/store/SecurityStore";

export default {
  name: "Routine",
  components: { CyclesCard },
  data() {
    return {
      is_new_routine: this.$route.name === 'new-routine',
      routine_id: this.$route.params.id,

      edit: this.$route.name === 'new-routine',
      favourite: false,
      user_is_owner: false,

      difficulties: Object.values(Difficulty.for_web),

      validation_snackbar: false,
      copied_snackbar: false,
      error_snackbar: false,
      timeout: 2000,
    }
  },
  computed: {
    ...mapState(useRoutinesStore, {
      routine_data: state => state.routine_data,
      deleted_cycles: state => state.deleted_cycles,
      before_change_data: state => state.before_change_data,
    }),
    ...mapState(useSecurityStore, {
      loggedIn: state => state.isLoggedIn,
    })
  },
  methods: {
    ...mapActions(useRoutinesStore, {
      $createRoutine: 'createRoutine',
      $getRoutine: 'get',
      $getFavourites: 'getFavourites',
      $markFavourite: 'markFavourite',
      $unmarkFavourite: 'unmarkFavourite',
      $deleteRoutine: 'delete',
      $updateRoutine: 'update',
      $rateRoutine: 'rate',
      $initializeRoutineStore: 'initialize',
    }),
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
    }),
    new_cycle() {
      let new_cycle = JSON.parse(JSON.stringify(DefaultCycle));
      this.routine_data.cycles.push(new_cycle);
    },
    delete_cycle(c) {
      let found = false;
      let i;
      for (i = 0; !found && i < this.routine_data.cycles.length;) {
        if (this.routine_data.cycles[i] === c) {
          found = true;
        } else {
          i++;
        }
      }
      this.deleted_cycles.push(this.routine_data.cycles[i].id);
      this.routine_data.cycles.splice(i, 1);
    },
    uploadImage(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        let img = new Image()
        img.src = fileReader.result
        img.onload = () => {
          let canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > 200) {
              height *= 200 / width
              width = 200
            }
          } else {
            if (height > 200) {
              width *= 200 / height
              height = 200
            }
          }

          canvas.width = width
          canvas.height = height
          let ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          this.routine_data.picture = canvas.toDataURL('image/png', 0.2);
        }
      };
      fileReader.onerror = (error) => {
        this.error_snackbar = true;
      };
    },
    handle_image(){
      this.$refs.uploader.click();
    },
    validates() {
      let r = this.routine_data;

      let val =  r.name !== '' && r.name !== null && r.name !== undefined;
      val = val && r.detail !== '' && r.detail !== null && r.detail !== undefined;
      val = val && r.difficulty !== '' && r.difficulty !== null && r.difficulty !== undefined;
      val = val && r.cycles.length > 0;

      for (let i = 0; val && i < r.cycles.length; i++) {
        let c = r.cycles[i];
        val = val && c.name !== '' && c.name !== null && c.name !== undefined;
        // val = val && c.order > 0 && c.order < 100 && c.order !== null && c.order !== undefined;
        val = val && c.repetitions > 0 && c.repetitions < 1000 && c.repetitions !== null && c.repetitions !== undefined;
        val = val && c.exercises.length > 0;

        for (let j = 0; val && j < c.exercises.length; j++) {
          let e = c.exercises[j];
          val = val && e.data.id > 0 && e.data.id !== null && e.data.id !== undefined;
          // val = val && e.order > 0 && e.order < 100 && e.order !== null && e.order !== undefined;
          val = val && ((e.repetitions > 0 && e.repetitions < 1000 && e.repetitions !== null && e.repetitions !== undefined) || (e.duration > 0 && e.duration < 1000 && e.duration !== null && e.duration !== undefined));
        }
      }
      return val;
    },
    async saveChanges() {
      if (!this.validates()) {
        this.validation_snackbar = true;
        return;
      }

      try {
        if (this.is_new_routine) {
          let result = await this.$createRoutine();
          await this.$router.push({ name: 'routine', params: { id: result.id } })
          this.$router.go(0);
        } else {
          await this.$updateRoutine();
          this.$router.go(0);
        }
      } catch (e) {
        this.error_snackbar = true;
      }
    },
    async getData() {
      try {
        await this.$getRoutine(this.routine_id);

        let favs = await this.$getFavourites();
        let favourites_ids = [];
        for (let r of favs.content) {
          favourites_ids.push(r.id);
        }
        this.favourite = favourites_ids.includes(parseInt(this.routine_id));

        let usr = await this.$getCurrentUser();
        this.user_is_owner = this.routine_data.author.id === usr.id;
      } catch (e) {
        this.$router.push({name: 'error'});
      }
    },
    async faveRoutine() {
      try {
        await this.$markFavourite(this.routine_id);
        this.favourite = true;
      } catch (e) {
        this.error_snackbar = true;
      }
    },
    async unfaveRoutine() {
      try {
        await this.$unmarkFavourite(this.routine_id);
        this.favourite = false;
      } catch (e) {
        this.error_snackbar = true;
      }
    },
    async rateRoutine(value) {
      try {
        await this.$rateRoutine(this.routine_id, value)
      } catch (e) {
        this.error_snackbar = true;
      }
    },
    async deleteRoutine() {
      try {
        await this.$deleteRoutine(this.routine_id);
        this.$router.push({name: 'library'});
      } catch (e) {
        this.error_snackbar = true;
      }
    },
    shareRoutine() {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copied_snackbar = true;
    },
  },
  beforeMount() {
    if (!this.is_new_routine) {
      this.getData();
    }
  },
  beforeDestroy() {
    this.$initializeRoutineStore();
  }
};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
  height: 100%;
}
.full-width {
  width: 100%;
  max-width: 100%;
}
.cera-pro {
  font-family: "Cera Pro", sans-serif;
  font-weight: 700;
  font-style: italic;
  color: #001833;
  text-transform: uppercase;
}
p {
  white-space: pre-line;
}
.square-overlay {
  border-radius: 0;
}
</style>