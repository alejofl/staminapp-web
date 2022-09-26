<template>
  <!--<v-card elevation="2" color="#E1E6EC" v-show="show" width="368px" height="96px" max-height="100%" class="exercise-card">-->
  <v-flex>
    <v-card class="profile-card">
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
            <v-card class="input-card" color=#E1E6EC>
              <v-card-title class="card-name" color="#636363">
                Nombre Completo
                <v-spacer></v-spacer>
                <v-icon color="secondary">
                  person
                </v-icon>
              </v-card-title>
              <v-card-text class="card-info secondary--text">
                Lorem ipsum dolor sit amet, consectetur
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row >
          <v-col md="12">
            <v-card class="input-card" color=#E1E6EC>
              <v-card-title class="card-name" color="#636363">
                E-Mail
                <v-spacer></v-spacer>
                <v-icon color="secondary">
                mail
              </v-icon>
              </v-card-title>
              <v-card-text class="card-info secondary--text">
                Lorem ipsum dolor sit amet, consectetur
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row >
          <v-col md="12">
            <v-card class="input-card" color=#E1E6EC>
              <v-card-title class="card-name" color="#636363">
                Género
                <v-spacer></v-spacer>
                <v-icon color="secondary">
                  expand_more
                </v-icon>
              </v-card-title>
              <v-card-text class="card-info secondary--text">
                Lorem ipsum dolor sit amet, consectetur
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row >
          <v-col  md="12">
            <v-card class="input-card" color=#E1E6EC>
              <v-card-title class="card-name" color="#636363">
                Fecha de Nacimiento
                <v-spacer></v-spacer>
                <v-icon color="secondary">
                  calendar_today
                </v-icon>
              </v-card-title>
              <v-card-text class="card-info secondary--text">
                Lorem ipsum dolor sit amet, consectetur
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-card class="input-card" color=#E1E6EC>
              <v-card-title class="card-name" color="#636363">
                Peso
                <v-spacer></v-spacer>
                <v-icon color="secondary">
                  monitor_weight
                </v-icon>
              </v-card-title>
              <v-card-text class="card-info secondary--text">
                Lorem ipsum dolor sit amet, consectetur
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="6">
            <v-card class="input-card" color=#E1E6EC>
              <v-card-title class="card-name" color="#636363">
                Altura
                <v-spacer></v-spacer>
                <v-icon color="secondary">
                  straighten
                </v-icon>
              </v-card-title>
              <v-card-text class="card-info secondary--text">
                Lorem ipsum dolor sit amet, consectetur
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row align-content="center">
          <v-col align-self="center" md="12">
            <v-btn color="error" width="304px">CERRAR SESIÓN</v-btn>
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
    }
  },
  methods: {
  },
};
</script>

<style>
.profile-card{
  width:328px;
  height: 100%;
}

.input-card{
  elevation: 0;
}

.card-name{
  font-family: 'Cera Pro';
}

.card-info{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: flex-end;
}
</style>