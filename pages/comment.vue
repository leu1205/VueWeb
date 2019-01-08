<template lang="pug">
    #main.container
        h1.text-center ASK ME ANYTHING
        p.lead.text-center I will reply you as soon as possible.
        #cardTop.card
            .card-body
                form#cmForm.needs-validation(novalidate)
                    .form-group.row
                        label(for="InputName").col-sm-1.col-form-label Name
                        div(v-if="loginStatus === false")
                            input(name = "cName", type="text", placeholder="Name" required)#InputName.form-control.col-sm-9
                            .invalid-feedback.font-italic.font-weight-bold Please choose a username.
                        div(v-else).col-form-label {{ userName }}
                    .form-group
                        label(for="InputText") Content
                        textarea(name = "content", cols="30", rows="4", placeholder="Content" required)#InputText.form-control
                        .invalid-feedback.font-italic.font-weight-bold Please provide a text.
                    button(type="submit").btn.btn-primary.offset-sm-11 submit

        .card
            .card-body
                h6.card-title username
                p.card-text Some quick example text to build on the card title and make up the bulk of the card's content.
                small.offset-sm-10 yyyy-mm-dd hh:mm:ss
</template>

<script>
export default {
    head: {
        script: [
            {src:"javascript/comment.js"}
        ]
    },
    computed: {
        loginStatus() {
            return this.$store.state.loginStatus
        },
        userName() {
            return this.$store.state.userName
        }
    }
}
</script>

<style scoped>
#cardTop{
    margin-top: 1em;
}

.card{
    margin-bottom: 1em;
}
</style>

