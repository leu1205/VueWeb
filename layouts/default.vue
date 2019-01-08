<template>
  <div>
    <Header/>
    <Modal id="signupModal" name="SIGN UP"/>
    <Modal id="loginModal" name="LOG IN"/>
    <nuxt/>
  </div>
</template>
<script>
import Header from '~/components/header'
import Modal from '~/components/modal'

export default {
  head: {
    script: [
    	{ src: '/javascript/layout.js'}
    ]
  },
  components: {
    Header,
    Modal
  }  
}
</script>

<style>

</style>
