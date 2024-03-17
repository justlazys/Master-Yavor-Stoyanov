<template>
    <div>
        <div class="row">
            <Message v-if="this.vallidate" severity="error">{{ this.message }}</Message>
            <div class="col-3">
                <label for="">Дата:</label>
                <Calendar showTime v-model="dorm.date" showIcon class="calendar w-100 " />
            </div>
            <div class="col-3">
                <label for="">Общежитие:</label>
                <input type="text" v-model="dorm.building" class="w-100" />
            </div>
            <div class="col-3">
                <label for="">Стая:</label>
                <input v-model="dorm.room" type="text" class="w-100" />
            </div>
            <div class="col-3">
                <label for="">Стойност:</label>
                <input type="text" v-model="dorm.value" class="w-100" />
            </div>
            <div class="col-3">
                <label for="">Дали е на общежитие:</label>
                <input v-model="dorm.isDorm" type="text" class="w-100" />
            </div>
        </div>
        <div class="mt-3">
            <button class="btn btn-sm btn-primary  " @click="addDorm()">Добави</button>
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
                                <font-awesome-icon size="xl" icon="fa fa-trash" style="color: #ed2c2c;" />
                            </button>

                        </div>
                    </span>
                    <span v-else-if="props.column.field === 'date'">
                        <p>{{   this.formatDateTime(props.row.date)  }}</p>
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { UserModel } from '../../models/UserModel';
import { DormModel } from '../../models/DormModel';
import moment from 'moment';
export default {
    name: 'EditDorm',
    data() {
        return {
            user: new UserModel(),
            dorm: new DormModel(),
            vallidate: false,
            rows: [],
            columns: [
                {
                    label: 'Дата',
                    field: 'date',
                },
                {
                    label: 'Общежитие',
                    field: 'building',
                },
                {
                    label: 'Стая',
                    field: 'room',
                },
                {
                    label: 'Стойност',
                    field: 'value',
                },
                {
                    label: 'Дали е на общежитие',
                    field: 'isDorm',
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
        validation(data: DormModel) {
            let msgs: string[] = [];
            if (!data.room) {
                msgs.push("Полето 'Стая' не може да бъде празно");
            }

            if (!data.building) {
                msgs.push("Полето 'Общежитие' не може да бъде празно");
            }
            if (!data.isDorm) {
                msgs.push("Полето 'В общежитие на' не може да бъде празно");
            }
            if (data.value) {
                if (this.isNumber(data.value)) {
                    msgs.push("Полето 'Стойност' приема само цифри");
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
                    this.rows = this.user.dorm
                    console.log(this.user.dorm);
                }
            })
        },
        async removeRow(index) {
            let x = this.rows.splice(index, 1);
            console.log('x', x[0]);
            x[0].userEmail=this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/remove_dorm', x[0]).then(res => {
                console.log('Done', res)
                this.rows.splice(index, 1);
            }).catch(error => {
                console.log(error);
            })
        },
        async addDorm() {
            this.vallidate = false;
            let validationMsgs = this.validation(this.dorm);
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
            this.user.dorm.push(this.dorm)
            this.dorm.userId = this.user.id;
            this.dorm.userEmail=this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/update_dorm', this.dorm).then(res => {
                console.log('executed', res.data)
            }).catch(error => {
                console.log('errore:', error);
            })
            this.dorm = new DormModel();
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