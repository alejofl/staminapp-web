<template>
  <div class="myContainer pa-8">
    <v-row class="pa-3">
      <v-chip-group v-model="selected_tags" multiple class="text--secondary" active-class="secondary white--text" value="selected_tags" @change="getRoutinesByDifficulty()">
        <v-chip v-for="tag in tags" :key="tag" filter class="myChip">
          <strong>{{ tag.toUpperCase() }}</strong>
        </v-chip>
      </v-chip-group>
    </v-row>
    <v-row justify="start">
      <v-col v-for="n in current_routines" :key="n.id" cols="12" sm="12" md="6" lg="3">
        <router-link :to="{name: 'routine', params: {id: n.id}}">
          <RoutineCard :id="n.id" :name="n.name" :rating="parseInt(n.score)" :base64-data="n.metadata"></RoutineCard>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RoutineCard from "@/components/RoutineCard";
import { mapActions } from "pinia";
import { useRoutinesStore } from "@/store/RoutinesStore";
import { Difficulty } from "@/assets/default_data";

export default {
  name: "Explore",
  components: { RoutineCard },
  data: () => {
    return {
      tags: Object.values(Difficulty.for_web),
      selected_tags: [],
      current_routines: [],
      routines: []
    }
  },
  methods: {
    ...mapActions(useRoutinesStore, {
      $getRoutinesForDifficulty : 'getRoutinesForDifficulty',
      $getAll : 'getAll'
    }),
    async getRoutines() {
      try {
        const result = await this.$getAll();
        this.routines = result.content;
        this.current_routines = this.routines;
      } catch(e) {
        console.log(e);
      }
    },
    getRoutinesByDifficulty() {
      if (this.selected_tags.length === 0) {
        this.current_routines = this.routines;
        return;
      }
      let current_tags = [];
      for(let i of this.selected_tags) {
        current_tags.push(Difficulty.for_explore[i]);
      }
      this.current_routines = this.routines.filter(r => current_tags.includes(r.difficulty));
    }
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
.myChip{
  background: #E1E6EC !important;
}
a {
  text-decoration: none;
}
</style>