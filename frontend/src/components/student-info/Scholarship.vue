<template>
    <div>
        <div class="row">
            <label><strong> Вашите стипендии:</strong></label>
            <label v-if="rows.length < 1" class="mt-2"> Вие не сте в общежитие:</label>
        </div>
        <div class="container">
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
    <span  v-if="props.column.field === 'date'">
                        <p>{{   this.formatDateTime(props.row.date)  }}</p>
                    </span>
                    <span  v-else-if="props.column.field === 'amount'">
                        <p>{{   props.row.amount  }} лв.</p>
                    </span>
</template>
</vue-good-table>
            </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import moment from 'moment';
export default{
    name:"Scholarship",
    data(){
        return{
            rows:[],
            columns:[
                {
                    label: 'Вид стипендия',
                    field: 'typeScholarship',
                },
                {
                    label: 'Дата',
                    field: 'date',
                },
                {
                    label: 'Размер',
                    field: 'amount',
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
    methods:{
        formatDateTime(dateTime) {
            return moment(dateTime).format('DD.MM.YYYY');
        },
        async  retrieveMethod(id){
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.rows=res.data.scholarship
                    console.log( res.data.scholarship);
                }
            })
        }
    }

}
</script>
<style scoped>
.container{
    width: 900px;
    margin-top: 10px;
}
</style>