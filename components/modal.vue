<template lang="pug">
    .modal(:id="id" role='dialog')
        .modal-dialog.modal-dialog-centered(role='document')
            .modal-content
                .modal-header
                    h5.modal-title.offset-sm-5 {{ name }}
                    button.close(type='button', data-dismiss='modal')
                        i.fas.fa-times
                .modal-body
                    form.needs-validation(:id="formID" @submit="check" novalidate)
                        .form-group
                            label(for='username') User Name
                            input#username.form-control(name='username' v-model="username" required)
                            .invalid-feedback.font-italic.font-weight-bold Please provide a username..
                        .form-group
                            label(for='password') Password
                            input#password.form-control(name='password' v-model="password" type='password' required)
                            .invalid-feedback.font-italic.font-weight-bold Please provide a password..
                        .row.justify-content-end
                            button.btn.btn-secondary.mr-sm-3(type='button', data-dismiss='modal') Close
                            button.btn.btn-primary.mr-sm-3(type='submit') {{ name }}
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    data: function() {
        return{
            username: null,
            password: null
        }
    },
    props:['id','name'],
    computed: {
        ID(){
            return this.id.slice(0,-5)
        },
        formID(){
            return this.ID + "Form"
        }
    },
    methods: {
        check: async function(e) {
            e.preventDefault();
            let form = document.getElementById(this.formID);
            if($(form)[0].checkValidity() === false){
                e.stopPropagation();
                $(form).addClass('was-validated');
            } else {
                $(form).removeClass('was-validated');
                if(this.ID === "login"){
                    this.login();
                } else {
                    this.signup();
                }
            }
        },
        login: async function() {
            let status = null;
            await axios.post('/login', {
                username:this.username,
                password:this.password
            })
            .then(function (res) {
                if(res.status === 200){
                    status = res.status;
                }
            })
            .catch( (error) => {
                alert('username or password was wrong!')
            });

            if(status === 200){
                location.reload();
            }
        },
        signup: async function() {
            let status = null;
            await axios.post('/signup', {
                username:this.username,
                password:this.password
            })
            .then(function (res) {
                if(res.status === 200){
                    status = res.status;
                }
            })
            .catch( (error) => {
                alert('username was used!')
            });

            if(status === 200){
                location.reload();
            }
        },
        ...mapActions ([
            'nuxtServerInit'
        ])
    }
}
</script>

