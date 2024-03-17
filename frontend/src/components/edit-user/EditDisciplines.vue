<template>
    <div>
        <div class="row">
            <Message v-if="this.vallidate==true" severity="error">{{ this.message }}</Message>
            <div class="col-3">
                <label for="">Дата:</label>
                <Calendar v-model="this.grade.date" showTime showIcon class="calendar w-100 " />
            </div>

            <div class="col-3">
                <label>Дисциплина:</label>
                <select class="w-100" v-model="this.grade.disc">
                    <option v-for="f of filterCode(user.faculty)" :value="f.code">
                        {{ f.name }}
                    </option>

                </select>
            </div>
            <div class="col-3">
                <label>Тип:</label>
                <select class="w-100" v-model="this.grade.type">
                    <option value="exam">
                        Изпит
                    </option>
                    <option value="grade">
                        Текуща оценка
                    </option>
                    <option value="project">
                        Курсов проект
                    </option>
                    <option value="assigment">
                        Курсова работа
                    </option>
                </select>
            </div>
            <div class="col-3">
                <label for="">Оценка:</label>
                <input type="text" class="w-100" v-model="this.grade.note" />
            </div>
            <div class="col-3 mt-2">
                <label for="">Преподавател на Лекции:</label>
                <input type="text" class="w-100" v-model="this.grade.lecUser" />
            </div>
            <div class="col-3 mt-2">
                <label for="">Преподавател на Лаб. упр.:</label>
                <input type="text" class="w-100" v-model="this.grade.labUser" />
            </div>
            <div class="col-3 mt-2">
                <label for="">Преподавател на Сем.упр.:</label>
                <input type="text" class="w-100" v-model="this.grade.semUser" />
            </div>
            <div class="col-3 mt-2">
                <label>Семестър:</label>
                <select class="w-100" v-model="this.grade.semester">
                    <option value="I">
                        I
                    </option>
                    <option value="II">
                        II
                    </option>
                    <option value="III">
                        III
                    </option>
                    <option value="IV">
                        IV
                    </option>
                </select>
            </div>
            <div class="mt-3">
                <button button class="btn btn-sm btn-primary" @click="addGrade()">Добави</button>
            </div>
        </div>
        <div class="container mt-3">
            <vue-good-table v-if="rows.length != 0" :columns="columns" :rows="rows" :pagination-options="{
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

                    <span v-if="props.column.field === 'functions'">
                        <div>

                            <button class="button-cl" @click="editRow(props.index)">
                                <font-awesome-icon size="xl" icon="fa-solid fa-pencil" style="color: blue;" />
                            </button>
                            <button class="button-cl mt-2" @click="removeRow(props.index)">
                                <font-awesome-icon size="xl" icon="fa fa-trash" style="color: #ed2c2c;" />
                            </button>

                        </div>
                    </span>
                    <span v-else-if="props.column.field === 'control'">
                        <div>
                            <p>
                                {{ translateDisc(props.row.disc, user.faculty) }} Тип: {{ this.translateType(props.row.type)
                                }}, Оценка:{{ props.row.note }} от {{ props.row.fromUser }} на {{ this.formatDateTime(props.row.date) }} семестър
                                {{ props.row.semester }}
                            </p>
                        </div>
                    </span>
                    <span v-else-if="props.column.field === 'lecture'">
                        <div v-if="props.row.lecUser">
                            <font-awesome-icon size="xl" icon="fa-solid fa-check" style="color: #1ca62c;" />
                            <p class="mt-2"> От {{ props.row.lecUser }} на {{ this.formatDateTime(props.row.dateUser) }}</p>
                        </div>
                    </span>
                    <span v-else-if="props.column.field === 'laboratory'">
                        <div v-if="props.row.labUser">
                            <font-awesome-icon size="xl" icon="fa-solid fa-check" style="color: #1ca62c;" />
                            <p class="mt-2"> От {{ props.row.labUser }} на {{ this.formatDateTime(props.row.dateUser) }}</p>
                        </div>
                    </span>
                    <span v-else-if="props.column.field === 'seminar'">
                        <div v-if="props.row.semUser">
                            <font-awesome-icon size="xl" icon="fa-solid fa-check" style="color: #1ca62c;" />
                            <p class="mt-2"> От {{ props.row.semUser }} на {{ this.formatDateTime(props.row.dateUser) }}</p>
                        </div>
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from '../../models/UserModel';
import { GradeModel } from '../../models/GradeModel';
import { NomDisc } from '../../models/NomDisc';
import axios from 'axios';
import moment from 'moment';
export default {
    name: "EditDisciplines",
    data() {
        return {
            user: new UserModel(),
            grade: new GradeModel(),
            nom: [],
            vallidate: false,
            rows: [],
            columns: [
                {
                    label: 'Дисциплина (форма на контрол)',
                    field: 'control',
                },
                {
                    label: 'Лекции',
                    field: 'lecture',
                },
                {
                    label: 'Лаб. упр.',
                    field: 'laboratory',
                },
                {
                    label: 'Сем. упр.',
                    field: 'seminar',
                },

                {
                    label: 'Функции',
                    field: 'functions',
                },
            ]
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
            console.log('from.params', from.params)
            //@ts-ignore
            vw.retrieveMethod(from.params)
            //@ts-ignore
            vw.loadNom();
        })
    },
    methods: {
        formatDateTime(dateTime) {
            return moment(dateTime).format('DD.MM.YYYY');
        },
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    this.rows = this.user.grade
                    console.log(this.user.grade);
                }
            })
        },
        async removeRow(index) {
            let x = this.rows.splice(index, 1);
            console.log('x', x[0])
            await axios.post('http://localhost:8081/remove_grade', x[0]).then(res => {
                console.log('Done', res)
                this.rows.splice(index, 1);
            }).catch(error => {
                console.log(error);
            })
        },
        async editRow(index) {
            let x = this.rows.splice(index, 1);
            console.log('x', x[0])
            await axios.post('http://localhost:8081/edit_grade', x[0]).then(res => {
                console.log('Done', res)
                this.grade = res.data;
                console.log('this.grade', this.grade)
            }).catch(error => {
                console.log(error);
            })
        },
        isNumber(data) {
            let regex = /^[a-zA-Z]+$/;
            if (regex.test(data)) {
                return true
            }
        },
        isString(data) {
            let regex = /^[a-zA-Z]+$/;
            if (!regex.test(data)) {
                return true
            }
        },
        validation(data: GradeModel) {
            let msgs: string[] = [];

            if (data.note) {
                if (this.isNumber(data.note)) {
                    msgs.push("Полето 'Оценка' приема само цифри");
                }
            }
            if (!data.date) {
                msgs.push("Полето 'Дата' не може да бъде празно");
            }
            if (data.lecUser) {
                if (this.isString(data.lecUser)) {
                    msgs.push("Полето 'Преподавател на Лекции' приема само букви");
                }
            }
            if (data.labUser) {
                if (this.isString(data.labUser)) {
                    msgs.push("Полето 'Преподавател на Лаб. упр' приема само букви");
                }
            }
            if (data.labUser) {
                if (this.isString(data.labUser)) {
                    msgs.push("Полето 'Преподавател на Сем.упр.' приема само букви");
                }
            }
            return msgs;
        },
        async addGrade() {
            this.vallidate = false;
            let validationMsgs = this.validation(this.grade);
            if (validationMsgs.length > 0) {
                this.vallidate = true;
                console.log('here', validationMsgs)
                console.log('vallidate', this.vallidate)
                this.message = `${validationMsgs.join(', ')} !`
                setTimeout(() => {
                    if (this.vallidate == true) {
                        this.vallidate = false;
                    }
                }, 3000)
                return
            }
            this.user.grade.push(this.grade)
            this.grade.userId = this.user.id;
            this.grade.fromUser = this.$store.getters.getName;
            if ((this.grade.lecUser || this.grade.labUser || this.grade.semUser) && !this.grade.dateUser) {
                this.grade.dateUser = new Date();
            }
            await axios.post('http://localhost:8081/update_grade', this.grade).then(res => {
                console.log('executed', res.data)
            }).catch(error => {
                console.log('errore:', error);
            })
            this.grade = new GradeModel();
        },
        filterCode(user: any) {
            console.log('this.nom',this.nom)
            let list: any[] = [];
            for (let i of this.nom) {
                if (i.mainCode == user) {
                    list.push(i);
                }
            }
            console.log('list', list);
            return list;
        },
        async loadNom() {
            await axios.post('http://localhost:8081/nom_disc').then(res => {
                this.nom = res.data;
                console.log('noms',this.nom);
            })
        },
        translateDisc(type: any, user: any) {
            for (let x of this.nom) {
                if (x.code == type && x.mainCode == user) {
                    return x.name;
                }
            }
        },
        translateType(type) {
            if (type == 'exam') {
                return 'Изпит'
            } else if (type == 'grade') {
                return 'Текуща оценка'

            }
            else if (type == 'project') {
                return 'Курсов проект'

            }
            else if (type == 'assigment') {
                return 'Курсова работа'

            }

        }
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
.calendar {
    height: 30px;
}

select {
    width: 185px;
    height: 30px;
    ;
}

.container {
    width: 800px;
    margin-top: 10px;
}
</style>