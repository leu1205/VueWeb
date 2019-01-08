<template lang="pug">
    .container
        .col(v-if="showGame")
            .row.btn.btn-primary(@click="show()") 上一頁
            #game
        .row.card-deck(v-if="!showGame")
            .col-sm-4.card.btn(v-for="item in gameList" @click="show()")
                img.card-img-top(:src="item.imgPath")
                .card-body
                    h5.card-title {{ item.name }}
</template>

<script>
export default {
    head: {
        script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js'},
            //{ src: '/javascript/game.js'}
        ]
    },
    data: function() {
        return{
            gameList:[
                {name:"Flappy Rocket",imgPath:require('~/assets/img/FlappyRocket.jpg')}
            ],
            showGame:false
        }
    },
    methods:{
        show(){
            this.showGame = !this.showGame;
            var script = document.createElement("script");
            script.id="gameJS";
            if(this.showGame){
                script.src='/javascript/game.js';
                document.body.appendChild(script);
            }else{
                document.body.removeChild(document.getElementById('gameJS'));
            }
        }
    },
    computed: {

    }
}
</script>

<style scoped>
    #game{
        height: 70vh;
        padding: 0%;
        margin-top: 5vh;
    }
    .card{
        background-color: transparent;
        border-style: none;
        padding: 0%;
    }
    .card-body{
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left:0px;
        padding-right:0px;
    }
    .container{
        margin-top: 5vh;
    }
</style>

