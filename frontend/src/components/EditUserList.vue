<template>
    <div>
        <h2>Редакция на потребител</h2>
        <div class="row mt-2">
            <div class="col-10">
                <div class="container-student mt-3">
                    <label class="labelTwo">Студент:</label>
                    <input @change="reset()" type="radio" v-model="type" value="student">
                    <label class="labelThree">Преподавател:</label>
                    <input @change="reset()" type="radio" v-model="type" value="teacher">
                </div>

            </div>
            <div v-if="type == 'student'">
                <div class="container-student mt-3">
                    <div class="col-12">
                        <label>Фак.номер:</label>
                        <input class="ml-12" v-model="this.user.fakNumber" type="text" />
                        <button style="margin-left:20px" @click="search()" class="btn btn-sm btn-primary">
                            <label>Търсене</label>
                        </button>
                    </div>

                </div>
                <div class="mt-2">
                    <vue-good-table :columns="columns" :rows="rows" :pagination-options="{
                        enabled: true,
                        mode: 'records',
                        perPage: 5,
                        position: 'top',
                        perPageDropdown: [5, 10, 15],

                        nextLabel: 'Напред',
                        prevLabel: 'Назад',
                        rowsPerPageLabel: 'Елементи на страница',
                        ofLabel: 'от',
                        pageLabel: 'page', // for 'pages' mode
                        allLabel: 'All',

                    }">
                    
                        <template #table-row="props">
                            <span v-if="props.column.field === 'function'">
                                <div style="text-align: center;">
                                    <router-link :to="'/edit-user/' + props.row.id">
                                        <font-awesome-icon size="xl" icon="fa-solid fa-pencil" />
                                    </router-link>
                                </div>

                            </span>
                            <span v-else-if="props.column.field === 'gender'">
                                <p v-if="props.row.gender=='Male'">Мъж</p>
                                <p v-else>Жена</p>
                            </span>
                            <span v-else-if="props.column.field ==='faculty'">
                                <p>{{ this.translateFaculty(props.row.faculty) }}</p>
                            </span>
                            <span v-else-if="props.column.field ==='major'">
                                <p>{{ this.translateMajor(props.row.major) }}</p>
                            </span>
                        </template>

                    </vue-good-table>

                </div>
            </div>
            <div v-if="type == 'teacher'">
                <div class="container-teacher mt-2">
                    <div class="row">

                        <div class="col-3">
                            <label>Титла:</label>
                            <select class="w-100 select" v-model="this.user.degree">
                                <option value="assistant">
                                    Асистент
                                </option>
                                <option value="main-assistant">
                                    Главен асистент
                                </option>
                                <option value="docent">
                                    Доцент
                                </option>
                                <option value="Professor">
                                    Професор
                                </option>
                            </select>
                        </div>
                        <div class="col-3">
                            <label>Име:</label>
                            <input class="w-100" v-model="this.user.firstName" type="text" />
                        </div>
                        <div class="col-3">
                            <label>Презиме:</label>
                            <input class="w-100" v-model="this.user.secondName" type="text" />
                        </div>
                        <div class="col-3">
                            <label>Фамилия:</label>
                            <input class="w-100" v-model="this.user.thirdName" type="text" />
                        </div>
                        <div class="mt-3">
                            <button style="margin-left:20px" @click="search()" class="btn btn-sm btn-primary ">
                                <label>Търсене</label>
                            </button>
                        </div>

                    </div>

                </div>
                <div class="mt-2">
                    <vue-good-table :columns="columnsTeacher" :rows="rows" :pagination-options="{
                        enabled: true,
                        mode: 'records',
                        perPage: 5,
                        position: 'top',
                        perPageDropdown: [5, 10, 15],

                        nextLabel: 'Напред',
                        prevLabel: 'Назад',
                        rowsPerPageLabel: 'Елементи на страница',
                        ofLabel: 'от',
                        pageLabel: 'page', // for 'pages' mode
                        allLabel: 'All',

                    }">>
                        <template #table-row="props">
                            <span v-if="props.column.field === 'function'">
                                <div style="text-align: center;">
                                    <router-link :to="'/edit-teacher/' + props.row.id">
                                        <font-awesome-icon size="xl" icon="fa-solid fa-pencil" />
                                    </router-link>
                                </div>

                            </span>
                            <span v-else-if="props.column.field === 'degree'">
                            <div>
                                <span>{{ translateDegree(props.row.degree) }}</span>
                            </div>
                        </span>

                        </template>

                    </vue-good-table>

                </div>
            </div>
            <button class=" mt-3 button-cl" @click="back()">Назад</button>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { UserModel } from '../models/UserModel';
export default {
    name: 'EditUserList',
    data() {
        return {
            type: "",
            user: new UserModel(),
            result: false,
            columnsTeacher: [
                {
                    label: 'Титла',
                    field: 'degree',
                },
                {
                    label: 'Име',
                    field: 'firstName',
                },
                {
                    label: 'Презиме',
                    field: 'secondName',
                },
                {
                    label: 'Фамилия',
                    field: 'thirdName',
                },
                {
                    label: 'Функции',
                    field: 'function',
                }
            ],
            columns: [
                {
                    label: 'Име',
                    field: 'firstName',
                },

                {
                    label: 'Презиме',
                    field: 'secondName',

                },

                {
                    label: 'Фамилия',
                    field: 'thirdName',

                },

                {
                    label: 'Емайл',
                    field: 'email',

                },

                {
                    label: 'Фак.номер',
                    field: 'fakNumber',

                },

                {
                    label: 'Пол',
                    field: 'gender',

                },

                {
                    label: 'Факултет',
                    field: 'faculty',

                },

                {
                    label: 'Специалност',
                    field: 'major',

                },

                {
                    label: 'Функция',
                    field: 'function',

                },

            ],
            rows: [],
        }
    },
    methods: {
        
        reset() {
            this.rows = [];
        },
        back() {
            this.$router.push({ name: 'menu' });
        },
        async search() {
            if (this.type == 'student') {
                this.result = false;
                if (this.user.fakNumber == '') {
                    this.user.fakNumber = null;
                }
                this.user.userEmail = this.$store.getters.retrieveEmail
                await axios.post('http://localhost:8081/get_edit_users', this.user)
                    .then(res => {
                        if (res.data != 0) {
                            this.rows = res.data;
                            console.log(res.data);

                        } else {
                            this.result = true;
                        }
                    })
            } else if (this.type == 'teacher') {
                this.result = false;
                if (this.user.firstName == '') {
                    this.user.firstName = null;
                } else if (this.user.secondName == '') {
                    this.user.secondName = null;
                }
                else if (this.user.thirdName == '') {
                    this.user.thirdName = null;
                }
                this.user.userEmail = this.$store.getters.retrieveEmail
                await axios.post('http://localhost:8081/get_edit_teacher', this.user)
                    .then(res => {
                        if (res.data != 0) {
                            this.rows = res.data;
                            console.log(this.rows);

                        } else {
                            this.result = true;
                        }
                    })
            }
        },
        translateFaculty(param) {
            if (param == '01') {
                return "ФАГИОПМ"
            } else if (param == '02') {
                return "ФАИО"
            } else {
                return "ЦПМ"
            }
        },
        translateDegree(row) {
            if (row == 'assistant') {
                return 'Асистент'
            } else if (row == 'main-assistant') {
                return 'Главен асистент'
            } else if (row == 'docent') {
                return 'Доцент'
            } else {
                return 'Професор'
            }
        },
        translateMajor(param) {
            if (param == '01') {
                return "КСТ"
            } else if (param == '02') {
                return "СИ"
            } else if (param == '03') {
                return "МИТ"
            } else {
                return "ОМ"
            }
        },
    }
}
</script>
<style scoped>
.button-cl {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: border-color 0.25s;
}

.labelTwo {
    margin-left: 80px;
    margin-right: +5px;
}

.labelThree {
    margin-left: +30px;
    margin-right: +5px;
}

.container-student {
    width: 600px;
    margin: auto;
    display: inline-block;
}

.container-teacher {
    width: 800px;
    margin: auto;
    display: inline-block;
}

.ml-12 {
    margin-left: 30px;
}

.col-12 input {
    height: 25px;
    ;
}

select {
    width: 185px;
    height: 30px;
    ;
}
</style>