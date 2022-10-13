<template>
  <div class="myContainer pa-8">
    <v-container class="full-width">
      <v-row>
        <v-col cols="4">
          <RoutineDetailCard :is_new_routine="is_new_routine" :routine_id="parseInt(routine_id)" v-on:edit_toggle="update_edit"></RoutineDetailCard>
        </v-col>
        <v-col cols="8">
          <h1 class="cera-pro">Ciclos</h1>
          <div v-for="cycle in cycles" :key="cycle.id" class="pb-4">
            <CyclesCard :edit_cycle="edit" :data="cycle"></CyclesCard>
            <v-btn v-if="edit" color="error" width="100%" @click="delete_cycle(cycle)">Borrar Ciclo</v-btn>
          </div>
          <v-btn class="mt-4" text v-show="edit" color="secondary" block @click="new_cycle();"><v-icon class="pr-2">add_circle</v-icon>Añadir Ciclo</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RoutineDetailCard from "@/components/RoutineDetailCard";
import CyclesCard from "@/components/CyclesCard";
export default {
  name: "Routine",
  components: { RoutineDetailCard, CyclesCard },
  data() {
    return {
      edit: this.$route.name === 'new-routine',
      is_new_routine: this.$route.name === 'new-routine',
      routine_id: this.$route.params.id,
      cycles: [{}, {}, {}]
    }
  },
  methods: {
    update_edit(value) {
      this.edit = value
    },
    new_cycle() {
      this.cycles.push({});
    },
    delete_cycle(c) {
      let found = false;
      let i;
      for (i = 0; !found && i < this.cycles.length;) {
        if (this.cycles[i].id === c.id) {
          found = true;
        } else {
          i++;
        }
      }
      this.cycles.splice(i, 1);
    }
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
</style>