<template lang="pug">
    .container
        h1.text-center STAFF
        p.lead.text-center Team members
        .card.mx-auto(style="width: 28em;")
            .card-body
                dl.row(v-for="(item,key) in dataFilter")
                    dt.col-sm-3 {{ key }}
                    dd {{ item }}
                hr
                a.btn.btn-primary.offset-sm-7(href="/staff") Back List
                nuxt-link(:to="{ name: 'employee-edit', params: { employee_id:$route.params.employee_id } }").btn.btn-success.ml-sm-2 Edit
</template>

<script>
import axios from 'axios';

export default {
    head: {
        script: [
            //{src:"/javascript/employees/detail.js"}
        ]
    },
    async asyncData({ params }){
        let { data } = await axios.get(`http://127.0.0.1:3000/employees/${params.employee_id}`);
        let dataFilter = {ID:data.employee_id,Name:data.name,Gender:data.gender,Title:data.title,Content:data.content}
        return { dataFilter }
    }
}
</script>
<style scoped>
.container{
    padding-top: 1%;
}
</style>

