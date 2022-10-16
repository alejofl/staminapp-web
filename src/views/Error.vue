<template>
  <div class="myContainer pa-8">
    <div class="error-container">
      <div class="error-centered">
        <div class="graphics"></div>
        <h1>¡Uh! Hubo un problema.</h1>
        <h2>La página que querés acceder no existe.</h2>
        <p>No encontramos la información a la que querés acceder en nuestros servidores. Por favor, verificá el enlace o intentá acceder más tarde.</p>
        <img src="@/assets/logo_alt.svg" alt="StaminApp" width="200px">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
  height: 100%;
}
.error-container {
  position: relative;
  height: 100%;
  box-sizing: unset;
}

.error-container .error-centered {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.error-centered {
  max-width: 560px !important;
  width: 100%;
  padding-left: 160px;
  line-height: 1.1
}

.error-centered .graphics {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  width: 140px;
  height: 140px;
  background-image: url(@/assets/emoji.webp);
  background-size: cover
}

.error-centered .graphics:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(2.4);
  border-radius: 50%;
  background-color: #E1E6EC;
  z-index: -1
}

.error-centered h1 {
  font-family: 'Cera Pro', sans-serif;
  font-size: 65px;
  font-weight: 900;
  margin-top: 0;
  margin-bottom: 10px;
  color: #FD9900;
  text-transform: uppercase
}

.error-centered h2 {
  font-family: 'Cera Pro', sans-serif;
  font-size: 21px;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  color: #001833
}

.error-centered p {
  font-family: 'Cera Pro', sans-serif;
  color: #001833;
  font-weight: 300;
  margin: 16px 0;
}
</style>