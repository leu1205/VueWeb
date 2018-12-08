<template lang="pug">
    #navBar
        nav.navbar.navbar-expand-sm.navbar-light.bg-light.fixed-top
            h2.nav-brand KoaWeb
            button.navbar-toggler(type="button",data-toggler="collapse",data-target="#navbarContent")
                span.navbar-toggler-icon
            .collapse.navbar-collapse.d-flex.justify-content-end
                ul.navbar-nav
                    li(:id="item.id" v-for="item in menuItem1" :key="item.id").nav-item
                        a(:href="'/'+changeHref(item.name)").nav-link {{ item.name }}
                ul(v-if="loginStatus === false").navbar-nav.offset-sm-1
                    li(v-for="item in menuItem2" :key="item").nav-item
                        a.nav-link {{ item }}
</template>
<script>
export default {
    data: function() {
        return {
            imgSrc: "https://cn.vuejs.org/images/logo.png",
            menuItem1: [
                {name:"HOME", id:"menu-item-1"},
                {name:"ABOUT", id:"menu-item-2"},
                {name:"CONTACT", id:"menu-item-3"},
                {name:"STAFF", id:"menu-item-4"},
                {name:"GAME", id:"menu-item-5"},
                {name:"COMMENT", id:"menu-item-6"}
            ],
            menuItem2: ["SIGN UP", "LOG IN"],
            loginStatus: false
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

