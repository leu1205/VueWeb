<template lang="pug">
    .container
        h1.text-center STAFF
        p.lead.text-center Team members
        .card
            .card-body
                .card-title
                    a(href="/employees/create").btn.btn-primary 新增員工
                table.table.table-striped
                    thead.thead-dark
                        tr
                            th 編號
                            th 姓名
                            th 性別
                            th 職稱
                            th 操作
                    tbody
</template>

<script>
export default {
    head: {
        script:[
            {src: "staff.js"}
        ]
    }
}
</script>

<style scoped>
th,td {
    text-align:center;
}
</style>


