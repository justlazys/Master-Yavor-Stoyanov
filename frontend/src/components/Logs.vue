<template>
    <div>
        <div class="row">
            <button class="w-100" @click="back()">Назад</button>
            <vue-good-table class="mt-2" :columns="columns" :rows="this.rows" :pagination-options="{
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
                    <span v-if="props.column.field === 'date'">
                        <p>{{ this.formatDateTime(props.row.date) }}</p>
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { LogModel } from '../models/LogsModel';
import moment from 'moment';
export default {
    name: 'Logs',
    data() {
        return {
            logs: new LogModel(),
            columns: [
                {
                    label: "Имейл на потребител",
                    field: "user"
                },
                {
                    label: "Стъпка",
                    field: "step"
                },
                {
                    label: "Дата",
                    field: "date"
                },
                {
                    label: "IP",
                    field: "ip"
                },
            ],
            rows: []
        }
    },
    methods: {
        formatDateTime(dateTime) {
            return moment(dateTime).format('DD.MM.YYYY');
        },
        async retrieveLog() {
            await axios.post('http://localhost:8081/load_logs', this.logs).then(res => {
                this.rows = res.data;
                console.log('res', this.rows)
            })
        },
        back() {
            this.$router.back();
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
            //@ts-ignore
            vw.retrieveLog();
        })
    }
}
</script>
<style scoped>
button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}

button {
    background-color: #f9f9f9;
}
</style>