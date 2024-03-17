<template>
    <div>
        <div class="row">
            <Message v-if="this.vallidate" severity="error">{{ this.message }}</Message>
            <div class="col-3">
                <label for="">Преподавател:</label>
                <input type="text" v-model="this.sport.teacherName" class="w-100" />
            </div>
            <div class="col-3">
                <label for="">Тип спорт:</label>
                <input type="text" v-model="this.sport.typeSport" class="w-100" />
            </div>
            <div class="col-3">
                <label for="">Часове:</label>
                <input type="text" v-model="this.sport.hoursSport" class="w-100" />
            </div>
            <div class="col-3">
                <label for="">Дата:</label>
                <Calendar showTime v-model="this.sport.date" showIcon class="calendar w-100 " />
            </div>
        </div>
        <div class="mt-3">
            <button class="btn btn-sm btn-primary  " @click="addSport()">Добави</button>
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
                            <button class="button-cl" @click="removeRow(props.index)">
                                <font-awesome-icon  size="xl" icon="fa fa-trash" style="color: #ed2c2c;" />
                            </button>

                        </div>
                    </span>
                    <span v-else-if="props.column.field==='date'">
                        <div>
                            <p>{{ this.formatDateTime(props.row.date) }}</p>
                        </div>
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { UserModel } from '../../models/UserModel';
import { SportModel } from '../../models/SportModel';
import moment from 'moment';
export default {
    name: "EditSport",
    data() {
        return {
            rows: [],
            user: new UserModel(),
            sport: new SportModel(),
            vallidate: false,
            columns: [
                {
                    label: 'Преподавател',
                    field: 'teacherName',
                },
                {
                    label: 'Тип спорт',
                    field: 'typeSport',
                },
                {
                    label: 'Часове',
                    field: 'hoursSport',
                },
                {
                    label: 'Дата',
                    field: 'date',
                },
                {
                    label: 'Функции',
                    field: 'functions',
                }
            ]
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
            console.log('from.params', from.params)
            //@ts-ignore
            vw.retrieveMethod(from.params)
        })
    },
    methods: {
        formatDateTime(dateTime) {
            return moment(dateTime).format('DD.MM.YYYY');
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
        validation(data: SportModel) {
            let msgs: string[] = [];
            if (!data.teacherName) {
                msgs.push("Полето 'Преподавател' не може да бъде празно");
            }
            if (data.teacherName) {
                if (this.isString(data.teacherName)) {
                    msgs.push("Полето 'Стойност' приема само букви");
                }
            }
            if (!data.typeSport) {
                msgs.push("Полето 'Тип спорт' не може да бъде празно");
            }
            if (data.typeSport) {
                if (this.isString(data.typeSport)) {
                    msgs.push("Полето 'Тип спорт' приема само букви");
                }
            }
            if (!data.hoursSport) {
                msgs.push("Полето 'Часове' не може да бъде празно");
            }
            if (data.hoursSport) {
                if (this.isNumber(data.hoursSport)) {
                    msgs.push("Полето 'Часове' приема само цифри");
                }
            }
            if (!data.date) {
                msgs.push("Полето 'Дата' не може да бъде празно");
            }

            return msgs;
        },
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    this.rows = this.user.sport
                    console.log(this.user.sport);
                }
            })
        },
        async removeRow(index) {
            let x = this.rows.splice(index, 1);
            console.log('x', x[0])
            x[0].userEmail=this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/remove_sport', x[0]).then(res => {
                console.log('Done', res)
                this.rows.splice(index, 1);
            }).catch(error => {
                console.log(error);
            })
        },
        async addSport() {
            this.vallidate = false;
            let validationMsgs = this.validation(this.sport);
            if (validationMsgs.length > 0) {
                this.vallidate = true;
                this.message = `${validationMsgs.join(', ')} !`
                setTimeout(() => {
                    if (this.vallidate == true) {
                        this.vallidate = false;
                    }
                }, 3000)
                return
            }
            this.user.sport.push(this.sport)
            this.sport.userId = this.user.id;
            this.sport.userEmail=this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/update_sport', this.sport).then(res => {
                console.log('executed', res.data)
            }).catch(error => {
                console.log('errore:', error);
            })
            this.sport = new SportModel();
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

.container {
    width: 800px;
    margin-top: 10px;
}
</style>