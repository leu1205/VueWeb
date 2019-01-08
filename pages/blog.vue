<template lang="pug">
    .container
        .card(v-for="article in articles" @click="divClick($event)")
            .row
                .col-sm-1.text-center
                    .fas.fa-angle-up(@click.stop="upClick")
                    p {{ article.like }}
                    .fas.fa-angle-down(@click.stop="downClick")
                .col
                    small 
                        span(@click.stop="categoryClick") {{ article.category }}
                        span ．Posted by 
                        span(@click.stop="post_idClick") {{ article.post_id }} 
                        span {{ article.post_date }}
                    h5(@click.stop="titleClick") {{ article.title }}
                    .row
                        div(@click.stop="commentClick")
                            .fas.fa-comment-dots
                            span {{ article.comments }} Comments
                        div(@click.stop="shareClick")
                            .fas.fa-share
                            span share
                        div(@click.stop="saveClick")
                            .fas.fa-bookmark
                            span save
                        div(@click.stop="otherClick")
                            .fas.fa-ellipsis-h
</template>
<script>
export default {
    head:function(){
        return{
            link: [
                { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css' }
            ]
        }
    },
    data:function(){
        return{
            articles:[
                {category:"reddit",title:"fake1",post_id:"somebody",post_date:"2019-01-06 20:06",like:200,comments:2000},
                {category:"reddit",title:"fake2",post_id:"somebody",post_date:"2019-01-06 20:30",like:300,comments:2000}
            ]
        }
    },
    methods: {
        divClick: function(event){
            alert(event.currentTarget.tagName);
        },
        upClick: function(event){
            alert(event.target.className);
        },
        downClick: function(event){
            alert(event.target.className);
        },
        categoryClick: function(){
            alert('category');
        },
        post_idClick: function(){
            alert('post_id');
        },
        titleClick: function(){
            alert('title');
        },
        commentClick: function(){
            alert('comment');
        },
        shareClick: function(){
            alert('share');
        },
        saveClick: function(){
            alert('save');
        },
        otherClick: function(){
            alert('other');
        }
    },
    computed: {
        userName() {
            return this.$store.state.userName
        },
        loginStatus() {
            return this.$store.state.loginStatus
        }
    }
}
</script>
<style scoped>
.card:hover{
    border-color: rgb(165, 165, 165);
    cursor: pointer;
}
.container,.card{
    margin-top: 1%;
}
.container .card .row .col .row div {
    display: inline-flex;
    align-items: flex-end;
    padding: 0%;
    margin-left: 8px;
}
.container .card .row .col .row div span{
    font-size: 13px;
    margin-left: 4px;
}
.card .row .col-sm-1.text-center{
    padding-right: 0%;
}
.card .row .col-sm-1.text-center p{
    margin-bottom: 0%;
}
</style>
