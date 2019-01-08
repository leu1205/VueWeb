<template lang="pug">
    .container
        h1.text-center STAFF
        p.lead.text-center Team members
        .card
            .card-body
                .card-title
                    a(href="/employee/create").btn.btn-warning.font-weight-bold 新增員工
                table.table.table-striped
                    thead.thead-dark
                        tr
                            th 編號
                            th 姓名
                            th 性別
                            th 職稱
                            th 操作
                    tbody
                        tr(v-for="item in data")
                            td {{ item.employee_id }}
                            td {{ item.name }}
                            td {{ item.gender }}
                            td {{ item.title }}
                            td
                                nuxt-link(:to="{ name: 'employee-detail', params: { employee_id:item.employee_id } }").btn.btn-primary.text-light.font-weight-bold 細節 
                                |  | 
                                nuxt-link(:to="{ name: 'employee-edit', params: { employee_id:item.employee_id } }").btn.btn-success.text-light.font-weight-bold 編輯 
                                |  | 
                                a(:id="'del'+item.employee_id").btn.btn-danger.text-light.font-weight-bold 刪除
                                
</template>

<script>
import axios from 'axios';

export default {
    head: {
        script:[
            {src: "/javascript/staff.js"}
        ]
    },
    async asyncData(){
        let { data } = await axios.get('http://127.0.0.1:3000/employees');
        return { data: data }
    }
}
</script>

<style scoped>
th,td {
    text-align:center;
}
</style>


