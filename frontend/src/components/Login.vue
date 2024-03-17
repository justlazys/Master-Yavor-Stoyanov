<template>
  <div>
    <div class="logo">
      <router-link class="navbar-brand" to="/">
        <span class="logo-img"></span>
      </router-link>
    </div>
    <div class="col-12">
      <h2>Университетска Информационна Система - Студент</h2>
    </div>
    <Message v-if="this.error" severity="error">Акаунта не може да бъде намерен</Message>
    <div class=" container" v-if="number == false">
      <div class="row">
        <div class="col-12 mt-2">
          <label for="">ЕГН/ЛНЧ:</label>
          <input type="text" class="ml-25" v-model="this.user.egn" placeholder="ЕГН" />
        </div>
        <div class="col-12">
          <label for="">Фак. номер:</label>
          <input type="text" class="ml-10 mt-2" v-model="this.user.fakNumber" placeholder="Фак. номер" />
        </div>

        <div class="col-9  ml-65">
          <router-link to="/forgot-number" class="ml-65">Забравен Фак. номер</router-link>

        </div>

        <div class="col-8 mt-1 mb-2 ml-120">
          <button @click="enter()" class="btn btn-sm btn-primary">Вход</button>
          <button style="margin-left: 15px;" @click="register()" class="btn btn-sm btn-primary">Регистрация</button>
          <button style="margin-left: 15px;" @click="logingProfessor()" class="btn btn-sm btn-primary">Вход
            Преподател</button>
        </div>
        <div class="col-2 w-100 m-3">
          <h2>Технически Университет София</h2>
        
        </div>
      </div>


    </div>
    <div class=" container" v-else>
      <div class="col-12 mt-2">
        <label for="">Емайл:</label>
        <input type="text" v-model="this.user.email" class="ml-25" placeholder="Емайл" />
      </div>
      <div class="col-8 mt-2 mb-2 ml-100">
        <button @click="enterWithEmail()" class="btn btn-sm btn-primary">Вход</button>
        <button style="margin-left: 15px;" @click="returnBack()" class="btn btn-sm btn-primary">Назад</button>

      </div>

    </div>
  </div>
</template>
<script lang="ts">
import axios from 'axios';
import { UserModel } from '../models/UserModel'
export default {
  name: "Login",
  data() {
    return {
      number: false,
      user: new UserModel(),
      error: false
    }
  },
  methods: {

    returnBack() {
      this.$router.push("/")
    },
    async enter() {
      console.log(this.user)
      await axios.post('http://localhost:8081/login', this.user
      ).then(res => {
        console.log(res.data);
        if (res.data != 'Empty') {
          this.$store.commit('getId', {
            value: res.data.id
          })
          console.log('id', this.$store.getters.retrieveId)
          this.$store.commit('setMail', { value: res.data.email })
          this.$store.dispatch('addFacultyNumber', { value: res.data.fakNumber })
          this.$store.commit("addRole", { value: res.data.type })
          this.$store.commit('addName', {
            firstName: res.data.firstName,
            secondName: res.data.secondName,
            thirdName: res.data.thirdName,
          })
          this.$router.push("/menu")
        } else {
          this.error = true;
          setTimeout(() => {
            if (this.error == true) {
              this.error = false;
            }
          }, 2000)
        }
      }).catch(error => {
        console.log(error);
      })

    },
    register() {
      this.$router.push({ name: 'register' })
    },
    async enterWithEmail() {
      await axios.post('http://localhost:8081/login_email', this.user
      ).then(res => {
        console.log(res.data);
        if (res.data != 'Empty') {
          this.$store.commit('getId', {
            value: res.data.id
          })
          this.$store.commit('setMail', { value: res.data.email })
          this.$store.dispatch('addFacultyNumber', { value: res.data.fakNumber })
          this.$store.commit("addRole", { value: res.data.type })
          this.$store.commit('addName', {
            firstName: res.data.firstName,
            secondName: res.data.secondName,
            thirdName: res.data.thirdName,
          })
          this.$router.push("/menu")
        } else {
          this.error = true;
          setTimeout(() => {
            if (this.error == true) {
              this.error = false;
            }
          }, 2000)
        }
      }).catch(error => {
        console.log(error);
      })
    },
    logingProfessor() {
      this.$router.push({ name: 'professor' })
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vw => {
      console.log('here')
      if (to.path == '/forgot-number') {
        //@ts-ignore
        vw.number = true
        //@ts-ignore
        console.log(vw.number)
      }
      else {
        //@ts-ignore
        vw.number = false;
        //@ts-ignore
        console.log(vw.number)
      }
    })
  }
}
</script>
<style scoped>
.ml-25 {
  margin-left: 25px;
}

.ml-65 {
  margin-left: 65px;
}

.ml-120 {
  margin-left: 120px;
}

.ml-100 {
  margin-left: 100px;
}

.ml-10 {
  margin-left: 10px;
}

.container {
  display: inline-block;
  border: 1px thin black;
  width: 500px;
  border-width: thin;
  border-color: black;

}
</style>