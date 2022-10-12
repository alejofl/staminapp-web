<template>
  <div class="container">
    <div class="center">
      <SignInCard></SignInCard>
    </div>
  </div>
</template>

<script>
import SignInCard from "@/components/SignInCard";
export default {
  name: "SignIn",
  components: { SignInCard }
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