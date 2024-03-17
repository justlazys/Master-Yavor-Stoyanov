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
    <div class="row">
      <div class="container">
        <div class="col-12 mt-2">
          <label for="">Емайл:</label>
          <input type="text" class="ml-25" v-model="this.user.email" placeholder="Емайл" />
        </div>

        <div class="col-8 mt-2 mb-2 ml-100">
          <button @click="enter()" class="btn btn-sm btn-primary">Вход</button>
          <button style="margin-left: 15px;" @click="returnBack()" class="btn btn-sm btn-primary">Назад</button>

        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from 'axios';
import { UserModel } from '../models/UserModel'
export default {
  name: 'LoginProfessor',
  data() {
    return {
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
      await axios.post('http://localhost:8081/login_teacher', this.user
      ).then(res => {
        console.log(res.data);
        if (res.data != 'Empty') {
          this.$store.commit('getId', {
            value: res.data.id
          })
          this.$store.commit('setMail',{value:res.data.email})
          this.$store.dispatch('addFacultyNumber', { value: res.data.fakNumber })
          this.$store.commit("addRole",{value:res.data.type})
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
  }
}
</script>
<style scoped>
.container {
  display: inline-block;
  border: 1px thin black;
  width: 500px;
  border-width: thin;
  border-color: black;

}

.ml-25 {
  margin-left: 25px;
}

.ml-100 {
  margin-left: 100px;
}
</style>