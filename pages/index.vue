<template lang="pug">
	#content
		section(v-for="item in section" :id="item.id")
			h1 {{ item.h1 }}
			p.lead {{ item.p }}
			div(v-if="item.id === 'contact'").card.container
				.card-body
					form#contactForm(novalidate).needs-validation
						.form-group
							label(for="InputName") Name
							Input(placeholder="Your Name" required)#InputName.form-control
							.invalid-feedback.font-italic.font-weight-bold Please tell me your name.
						.form-group
							label(for="InputEmail") Email
							Input(type="email", placeholder="Your Email@example.com" required)#InputEmail.form-control
							.invalid-feedback.font-italic.font-weight-bold Please provide your email.
						.form-group
							label(for="InputSubject") Subject
							Input(required)#InputSubject.form-control
							.invalid-feedback.font-italic.font-weight-bold Please provide a subject.
						.form-group
							label(for="InputContent") Content
							textarea(name="content", cols="30", rows="4" required)#InputContent.form-control
							.invalid-feedback.font-italic.font-weight-bold Please provide a message.
						button(type="submit").btn.btn-primary.offset-sm-11 submit
</template>

<script>
export default {
	head: {
    	script: [
    		{ src: 'index.js'}
    	]
  	},
  	data: function() {
    	return {
      		section: [
				{id:"home", h1:"Welcome !", p:"This is my first KoaWeb"},
				{id:"about", h1:"About", p:"This is about my KoaWeb。"},
				{id:"contact", h1:"Contact", p:"This is my contact way。"}
      		]
		}
  	}
}
</script>

<style scoped>
section{
    text-align: center;
    padding-top: 1%;
    
}

section form{
    text-align: left;
}

#home{
    background: url('~assets/img/cat1.jpg') top center;
    background-size: cover;
    padding-bottom: 50%;
}

#about{
    background: url('~assets/img/cat2.jpg') top center;
    background-size: cover;
    padding-bottom: 50%;
}

#contact{
  padding-bottom: 15%;
}
</style>
