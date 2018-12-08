<template>
  <div>
    <Header/>
    <nuxt/>
  </div>
</template>
<script>
import Header from '~/components/header'

export default {
  head: {
    script: [
    	{ src: '/layout.js'}
    ]
  },
  components: {
    Header
  }  
}
</script>

<style>

</style>
