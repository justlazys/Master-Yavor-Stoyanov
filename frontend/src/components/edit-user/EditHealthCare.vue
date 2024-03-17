<template>
    <div>
        <div class="row">
            <Message v-if="this.vallidate" severity="error">{{ this.message }}</Message>
            <div class="col-3">
                <label for="">Стойност:</label>
                <input type="text" v-model="healthcare.amount" class="w-100" />
            </div>
            <div class="col-3">
                <label for="">Дата деклариране:</label>
                <Calendar v-model="healthcare.dateDeclaration" showTime showIcon class="calendar w-100 " />
            </div>
            <div class="col-3">
                <label for="">От дата:</label>
                <Calendar v-model="healthcare.dateOrigin" showTime showIcon class="calendar w-100 " />
            </div>
            <div class="col-3">
                <label for="">Вид доход:</label>
                <input v-model="healthcare.type" type="text" class="w-100" />
            </div>
            <div class="mt-3">
                <button @click="addAmount()" class="btn btn-sm btn-primary  ">Добави</button>
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
                            <button class="button-cl" @click="removeRow(props.index)">
                                <font-awesome-icon  size="xl" icon="fa fa-trash" style="color: #ed2c2c;" />
                            </button>

                        </div>
                    </span>
                    <span  v-else-if="props.column.field === 'dateOrigin'">
                        <p>{{   this.formatDateTime(props.row.dateOrigin)  }}</p>
                    </span>
                    <span  v-else-if="props.column.field === 'dateDeclaration'">
                        <p>{{   this.formatDateTime(props.row.dateDeclaration)  }}</p>
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>
<script lang="ts">
import { HealthCareModel } from '../../models/HealthCareModel';
import { UserModel } from '../../models/UserModel';
import axios from 'axios';
import moment from 'moment';
export default {
    name: "EditHealthCare",
    data() {
        return {
            user: new UserModel(),
            healthcare: new HealthCareModel(),
            rows: [],
            vallidate: false,
            columns: [
                {
                    label: 'Дата на деклариране',
                    field: 'dateDeclaration',
                },
                {
                    label: 'От дата',
                    field: 'dateOrigin',
                },

                {
                    label: 'Стойност',
                    field: 'amount',
                },

                {
                    label: 'Вид доход',
                    field: 'type',
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
        validation(data: HealthCareModel) {
            let msgs: string[] = [];
            if (!data.amount) {
                msgs.push("Полето 'Стойност' не може да бъде празно");
            }
            if (data.amount) {
                if (this.isNumber(data.amount)) {
                    msgs.push("Полето 'Стойност' приема само цифри");
                }
            }
            if (!data.type) {
                msgs.push("Полето 'Вид доход' не може да бъде празно");
            }
            if (data.type) {
                if (this.isString(data.type)) {
                    msgs.push("Полето 'Вид доход' приема само букви");
                }
            }
            if (!data.dateDeclaration) {
                msgs.push("Полето 'Дата деклариране' не може да бъде празно");
            }
            if (!data.dateOrigin) {
                msgs.push("Полето 'От дата' не може да бъде празно");
            }
            return msgs;
        },
        async addAmount() {
            this.vallidate = false;
            let validationMsgs = this.validation(this.healthcare);
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
            console.log('this.user', this.user)
            this.user.healthcare.push(this.healthcare)
            this.healthcare.userId = this.user.id;
            this.healthcare.userEmail=this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/update_health_care', this.healthcare).then(res => {
                console.log('executed', res.data)
            }).catch(error => {
                console.log('errore:', error);
            })
            this.healthcare = new HealthCareModel();
        },
        async removeRow(index) {
            let x = this.rows.splice(index, 1);
            console.log('x', x[0])
           x[0]=this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/remove_health_care', x[0]).then(res => {
                console.log('Done', res)
                this.rows.splice(index, 1);
            }).catch(error => {
                console.log(error);
            })
        },
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    this.rows = this.user.healthcare
                    console.log(this.user.healthcare);
                }
            })
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
.container {
    width: 800px;
    margin-top: 10px;
}

.calendar {
    height: 30px;
}

.ml-20 {
    margin-left: 20px;
}
</style>