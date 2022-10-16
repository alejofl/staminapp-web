<template>
  <div class="myContainer pa-8">
    <h1 class="cera-pro" style="color: #001833">{{ username }}</h1>
    <v-row justify="start" class="pt-6">
      <v-col v-for="n in routines" :key="n.id" cols="12" sm="12" md="6" lg="3">
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
import { useSecurityStore } from "@/store/SecurityStore";

export default {
  name: "User",
  components: { RoutineCard },
  data: () => {
    return {
      username: '',
      routines: []
    }
  },
  methods: {
    ...mapActions(useRoutinesStore, {
      $getRoutinesForOtherUser: 'getRoutinesForOtherUser',
    }),
    ...mapActions(useSecurityStore, {
      $getUserInfo: 'getUserInfo',
    }),
    async retrieveData() {
      let id = this.$route.params.id;
      try {
        const user_result = await this.$getUserInfo(id);
        this.username = user_result.username;
        const routines_result = await this.$getRoutinesForOtherUser(id);
        this.routines = routines_result.content;
      } catch (e) {
        this.$router.push({name: 'error'});
      }
    }
  },
  beforeMount() {
    this.retrieveData();
  }
};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
  height: 100%;
}
a {
  text-decoration: none;
}
</style>