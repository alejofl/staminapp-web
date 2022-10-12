<template>
  <div class="container">
    <div class="center">
      <RegisterCard></RegisterCard>
    </div>
  </div>
</template>

<script>
import RegisterCard from "@/components/RegisterCard";
export default {
  name: "SignUp",
  components: { RegisterCard }
};
</script>

<style scoped>
.container {
  height: 100%;
  max-width: 100%;
  position: relative;
  background-color: #FD9900;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>