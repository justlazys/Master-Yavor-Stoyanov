<template>
    <div>
        <div class="row">
            <Message v-if="this.vallidate" severity="error">{{ this.message }}</Message>
            <div class="col-3">
                <label for="">Дата:</label>
                <Calendar showTime v-model="scholarship.date" showIcon class="calendar w-100 " />
            </div>
            <div class="col-3">
                <label for="">Сума:</label>
                <input type="text" v-model="scholarship.amount" class="w-100" />
            </div>
            <div class="col-3">
                <label for="">Тип стипендия:</label>
                <input type="text" v-model="scholarship.typeScholarship" class="w-100" />
            </div>
            <div class="mt-3">
                <button class="btn btn-sm btn-primary  " @click="addScholarship()">Добави</button>
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
                    <span  v-else-if="props.column.field === 'date'">
                        <p>{{   this.formatDateTime(props.row.date)  }}</p>
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>
<script lang="ts">
import { ScholarshipModel } from '../../models/ScholarshipModel';
import { UserModel } from '../../models/UserModel';
import axios from 'axios';
import moment from 'moment';
export default {
    name: "EditScholarship",
    data() {
        return {
            rows: [],
            vallidate: false,
            columns: [
                {
                    label: 'Дата',
                    field: 'date',
                },
                {
                    label: 'Сума',
                    field: 'amount',
                },
                {
                    label: 'Тип стипендия',
                    field: 'typeScholarship',
                },
                {
                    label: 'Функции',
                    field: 'functions',
                },
            ],
            scholarship: new ScholarshipModel(),
            user: new UserModel(),
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
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    this.rows = this.user.scholarship
                    console.log(this.user.scholarship);
                }
            })
        },
        async removeRow(index) {
            let x = this.rows.splice(index, 1);
            console.log('x', x[0])
            x[0].userEmail=this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/remove_scholarship', x[0]).then(res => {
                console.log('Done', res)
                this.rows.splice(index, 1);
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
        validation(data: ScholarshipModel) {
            let msgs: string[] = [];
            if (!data.amount) {
                msgs.push("Полето 'Сума' не може да бъде празно");
            }
            if (data.amount) {
                if (this.isNumber(data.amount)) {
                    msgs.push("Полето 'Сума' приема само цифри");
                }
            }
            if (!data.typeScholarship) {
                msgs.push("Полето 'Тип стипендия' не може да бъде празно");
            }
            if (data.typeScholarship) {
                if (this.isString(data.typeScholarship)) {
                    msgs.push("Полето 'Тип стипендия' приема само букви");
                }
            }
            if (!data.date) {
                msgs.push("Полето 'Дата' не може да бъде празно");
            }

            return msgs;
        },
        async addScholarship() {
            this.vallidate = false;
            console.log('log')
            let validationMsgs = this.validation(this.scholarship);
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
            this.user.scholarship.push(this.scholarship)
            this.scholarship.userId = this.user.id;
            this.scholarship.userEmail=this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/update_scholarship', this.scholarship).then(res => {
                console.log('executed', res.data)
            }).catch(error => {
                console.log('errore:', error);
            })
            this.scholarship = new ScholarshipModel();
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