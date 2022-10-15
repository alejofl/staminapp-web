<template>
  <div class="myContainer pa-8">
    <h1 class="cera-pro">Recientes</h1>
    <v-row >
      <v-col v-for="n in recent_routines" :key="n.id" cols="12" sm="12" md="6" lg="4" v-if="routines.length !== 0">
        <router-link :to="{name: 'routine', params: {id: n.id}}">
          <RecentCard :id="n.id" :routineName="n.name" :difficulty="n.difficulty" :rating="parseInt(n.score)" :base64-data="n.metadata"></RecentCard>
        </router-link>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4" v-if="routines.length === 0">
        <h3 class="cera-pro-light">Todavía no tienes rutinas.</h3>
      </v-col>
    </v-row>
    <h1 class="pt-6 cera-pro">Mi Biblioteca</h1>
    <v-row justify="start">
      <v-col v-for="n in current_routines" :key="n.id" cols="12" sm="12" md="6" lg="3" v-if="routines.length !== 0">
        <router-link :to="{name: 'routine', params: {id: n.id}}">
          <RoutineCard :id="n.id" :name="n.name" :rating="parseInt(n.score)" :base64-data="n.metadata"></RoutineCard>
        </router-link>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4" v-if="routines.length === 0">
        <h3 class="cera-pro-light">Todavía no tienes rutinas.</h3>
      </v-col>
    </v-row>
    <router-link :to="{name: 'new-routine'}">
      <v-btn fab class="customFAB secondary--text ma-4" color="primary" fixed right bottom>
        <v-icon>add</v-icon> Añadir Rutina
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import RecentCard from "@/components/RecentCard";
import RoutineCard from "@/components/RoutineCard";
import { mapActions } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { useRoutinesStore } from "@/store/RoutinesStore";
export default {
  name: "Library",
  components: { RoutineCard, RecentCard},
  data: () => {
    return {
      current_routines: [],
      routines: [],
      recent_routines: [],
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUserRoutines : 'getCurrentUserRoutines',
    }),
    ...mapActions(useRoutinesStore, {
      $getFavourites : 'getFavourites',
    }),
    async getRoutines() {
      try {
        let userRoutines = await this.$getCurrentUserRoutines();
        let favouriteRoutines = await this.$getFavourites();
        const result = userRoutines.content.concat(favouriteRoutines.content);

        this.routines = result;
        console.log(this.routines)
        for(let i = 0; i < this.routines.length; i++) {
          if(this.routines[i].metadata != null) {
            console.log("Se cumple la condicion")
            console.log(this.routines[i].metadata.picture)
          }
        }
        let aux = []
        for(let i = 0; i < this.routines.length; i++) {
          this.current_routines.push(this.routines[i]);
          aux.push(this.routines[i])
        }
        if(this.current_routines.length <= 3) {
          console.log("Entre al if")
          for(let i = 0; i < this.current_routines.length; i++) {
            this.recent_routines.push(this.current_routines[i]);
          }
        } else {
          this.recent_routines = [];
          let i = 0;
          let index = 0;
          let min = aux[i];
          for(i = 1; i < aux.length; i++) {
            if(aux[i].date < min) {
              min = aux[i];
              index = i;
            }
          }
          this.recent_routines.push(aux[index]);
          aux.splice(index, 1);
          i = 0;
          min = aux[i];
          for(i = 1; i < aux.length; i++) {
            if(aux[i].date < min) {
              min = aux[i];
              index = i;
            }
          }
          this.recent_routines.push(aux[index]);
          aux.splice(index, 1);
          i = 0;
          min = aux[i];
          for(i = 1; i < aux.length; i++) {
            if(aux[i].date < min) {
              min = aux[i];
              index = i;
            }
          }
          this.recent_routines.push(aux[index]);
        }
      } catch(e) {
        console.log("Tengo errores");
        console.log(e);
      }
    },
  },
  beforeMount() {
    this.getRoutines();
  }
};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
  height: 100%;
}
.cera-pro {
  font-family: "Cera Pro", sans-serif;
  font-weight: 700;
  font-style: italic;
  color: #001833;
  text-transform: uppercase;
}
.cera-pro-light {
  font-family: "Cera Pro", sans-serif;
  font-weight: 300;
  font-style: italic;
  color: #001833;
  text-transform: uppercase;
}
.customFAB {
  font-weight: 700;
  width: fit-content;
  border-radius: 25px;
  padding: 32px 24px 32px 24px;
}
a {
  text-decoration: none;
}
</style>