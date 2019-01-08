<template lang="pug">
    div
        #navBar
            nav.navbar.navbar-expand-sm.navbar-light.bg-light.fixed-top
                h2.nav-brand VueWeb
                img(:src="imgSrc" height="40" width="40")
                button.navbar-toggler(type="button",data-toggler="collapse",data-target="#navbarContent")
                    span.navbar-toggler-icon
                .collapse.navbar-collapse.d-flex.justify-content-end
                    ul.navbar-nav
                        li(:id="item.id" v-for="item in menuItem1" :key="item.id").nav-item
                            a(:href="'/'+changeHref(item.name)").nav-link {{ item.name }}
                    ul(v-if="loginStatus === false").navbar-nav.offset-sm-1
                        li(v-for="item in menuItem2" :key="item.id" :id="item.id").nav-item
                            a.nav-link(v-bind="item.attr") {{ item.name }}
                    ul(v-else).navbar-nav.offset-sm-1
                        li(v-for="item in menuItem3" :key="item.id" :id="item.id").nav-item
                            a.nav-link(@click="item.method") {{ item.name }}
</template>
<script>
import axios from "axios";

export default {
    data: function() {
        return {
            imgSrc: "https://cn.vuejs.org/images/logo.png",
            menuItem1: [
                {name:"HOME", id:"menu-item-1"},
                {name:"ABOUT", id:"menu-item-2"},
                {name:"CONTACT", id:"menu-item-3"},
                {name:"STAFF", id:"menu-item-4"},
                {name:"BLOG", id:"menu-item-5"},
                {name:"COMMENT", id:"menu-item-6"}
            ],
            menuItem2: [
                {name:"SIGH UP", id:"menu-item-7", attr:{'data-toggle':"modal", 'data-target':"#signupModal"}},
                {name:"LOG IN", id:"menu-item-8", attr:{'data-toggle':"modal", 'data-target':"#loginModal"}}
            ],
            menuItem3: [
                {name:this.$store.state.userName, id:"menu-item-7"},
                {name:"LOG OUT", id:"menu-item-8", method:this.logout}
            ]
        }
    },
    methods: {
        changeHref: function(name) {
            switch(name){
                case "HOME":
                    return "#" + name.toLowerCase()
                case "ABOUT":
                    return "#" + name.toLowerCase()
                case "CONTACT":
                    return "#" + name.toLowerCase()
                default:
                    return name.toLowerCase()
            }
        },
        logout: async function() {
            await axios.get('/logout');
            location.reload();
        },
    },
    computed: {
        loginStatus() {
            return this.$store.state.loginStatus
        }
    }
}
</script>
<style>
body{
    padding-top: 62.4px;
    background-color: whitesmoke;
}

.header-fixed{
    position: fixed;
    width: 100%;
}
</style>

