<template>
  <div class="myContainer pa-8">
    <RoutineDetailCard></RoutineDetailCard>
  </div>
</template>

<script>
import RoutineDetailCard from "@/components/RoutineDetailCard";
export default {
  name: "Routine",
  components: { RoutineDetailCard }
};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
  height: 100%;
}
</style>