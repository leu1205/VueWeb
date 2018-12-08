<template lang="pug">
    .container
        h1.text-center STAFF
        p.lead.text-center Team members
        .card.mx-auto(style="width: 28em;")
            .card-body
                dl.row
                    dt.col-sm-3 ID：
                    dd #{employee_id}
</template>

<script>
export default {
    head: {
        script: [
            {src:"detail.js"}
        ]
    }
}
</script>
