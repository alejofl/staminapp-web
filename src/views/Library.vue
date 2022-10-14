<template>
  <div class="myContainer pa-8">
    <h1 class="cera-pro">Recientes</h1>
    <v-row>
      <v-col v-for="n in recent_routines" :key="n.id" cols="12" sm="12" md="6" lg="4">
        <RecentCard :id="n.id" :routineName="n.name" :difficulty="n.difficulty" :rating="parseInt(n.score)"></RecentCard>
      </v-col>
    </v-row>
    <h1 class="pt-6 cera-pro">Mi Biblioteca</h1>
    <v-row justify="start">
      <v-col v-for="n in current_routines" :key="n.id" cols="12" sm="12" md="6" lg="3">
        <RoutineCard :id="n.id" :name="n.name" :rating="parseInt(n.score)"></RoutineCard>
      </v-col>
    </v-row>
    <v-btn fab class="customFAB secondary--text ma-4" color="primary" fixed right bottom>
      <v-icon>add</v-icon> Añadir Rutina
    </v-btn>
  </div>
</template>

<script>
import RecentCard from "@/components/RecentCard";
import RoutineCard from "@/components/RoutineCard";
import { mapActions } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";

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
    async getRoutines() {
      try {
        const result = await this.$getCurrentUserRoutines();
        // console.log(result.content[0].user.username)
        this.routines = result.content;
        let aux = []
        for(let i = 0; i < this.routines.length; i++) {
          this.current_routines.push(this.routines[i]);
          aux.push(this.routines[i])
        }
        if(this.current_routines.length <= 3) {
          console.log("Entre al if")
          this.recent_routines = this.current_routines;
          for(let i = 0; i < this.current_routines.length; i++) {
            this.recent_routines.push(this.current_routines[i]);
          }
        } else {
          this.recent_routines = [];
          console.log(aux)
          console.log(this.current_routines);
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
}
.cera-pro {
  font-family: "Cera Pro", sans-serif;
  font-weight: 700;
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
</style>