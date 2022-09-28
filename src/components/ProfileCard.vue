<template>
  <!--<v-card elevation="2" color="#E1E6EC" v-show="show" width="368px" height="96px" max-height="100%" class="exercise-card">-->
  <v-flex align-self-center>
    <v-card class="profile-card" elevation="5">
      <v-container>
        <v-row justify="center" align="center">
          <v-col align="center">
            <v-btn class="mx-2" fab dark large>
              <v-icon>photo_camera</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row >
          <v-col md="12">
            <v-text-field
            label="Nombre Completo"
            v-model="name"
            append-icon="person">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row >
          <v-col md="12">
            <v-text-field
              label="E-Mail"
              v-model="mail"
              append-icon="mail">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row >
          <v-col md="12">
            <v-select
              label="Género"
              v-model="gender":items="gender_options"
              append-icon="expand_more">
            </v-select>
          </v-col>
        </v-row>
        <v-row >
          <v-col  md="12">
            <v-text-field
              label="Fecha de Nacimiento DD/MM/YYYY"
              v-model="birthdate"
              append-icon="calendar_today">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-text-field
              label="Peso"
              v-model="weight"
              append-icon="monitor_weight">
            </v-text-field>
          </v-col>
          <v-col md="6">
            <v-text-field
              label="Altura"
              v-model="height"
              append-icon="straighten">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row align-content="center">
          <v-col align-self="center" md="12">
            <v-btn color="error" width="304px" @click="logged_in=false">CERRAR SESIÓN</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "ProfileCard",
  data() {
    return {
      name: '',
      mail: '',
      gender:'',
      birthdate:'',
      weight:'',
      height:'',
      gender_options:['Masculino','Femenino','Otro'],
      logged_in:true,
    }
  },
  methods: {
  },
};
</script>

<style>
.profile-card{
  width:328px;
  height: 85%;
}

.input-card{
  height: 40px;
  elevation: 0;
}

.card-name{
  font-family: 'Cera Pro';
  font-size: 10px;
  padding-left: 5px;
  padding-top: 3px;
}

.card-info{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: flex-end;
  padding-left: 5px;
}
</style>