<template>
    <div>
        <div class="logo">
            <router-link class="navbar-brand" to="/">
                <span class="logo-img"></span>
            </router-link>
        </div>
        <div class="col-12">
            <h2 style="margin-left: 35px;">Информация</h2>
        </div>
        <div>
            <strong> <label>Име: {{ this.user.firstName }} {{ this.user.secondName }} {{ this.user.thirdName }}  Фак. номер: {{ this.user.fakNumber
            }} </label> </strong>
            <button @click="back()" class="back">Назад</button>
        </div>
        <Navigation />

        <router-view></router-view>

    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { UserModel } from '../models/UserModel';
import Navigation from './navigation/Navigation.vue'
export default {
    name: 'StudentInfo',
    components: {
        Navigation
    },
    data() {
        return {
            user:new UserModel()
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw=> {
            //@ts-ignore
            vw.retrieveMethod(from.params)
        })
    },
    methods: {
        back() {
            this.$router.push({ name: 'menu' })
        },
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    console.log(this.user);
                }
            })
        },
    }
}
</script>
<style scoped>
.back {
    background-color: red;
    color: white;
    font-size: 8px;
    margin-left: 10px;
}

.back:hover {
    background-color: #4CAF50;
    /* Green */
    color: red;
}
</style>