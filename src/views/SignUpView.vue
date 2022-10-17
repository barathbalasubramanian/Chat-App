<template>
  <div class="free"></div>
  <div class="sign_up">
    <div class="card">SIGN UP</div>
    <form @submit.prevent='signup()' autocomplete="off">
      <div class="input" >
        <input class="field" type="text" v-model="form.name" pattern="[a-zA-Z]{3,}" min="3" required><br>
        <label class="label">USERNAME</label>
        <div class="req0"></div>
      </div>
      <div class="input">
        <input class="field" type="email" v-model="form.email" autocomplete="off" required><br>
        <label class="label">EMAIL</label>
        <div class="req1"></div>
      </div>
      <div class="input">
        <input class='field' type="password" v-model="form.pass1" pattern=".{8,}" required><br> 
        <label class="label">PASSWORD</label>
        <div class="req2"></div>
      </div>
      <div class="input">
        <input class="field" type="password" v-model="form.pass2" pattern=".{8,}" required><br>
        <label class="label">CONFORM PASSWORD</label>
        <div class="req3"></div>
      </div>
      <div class="btn">
        <button type="submit">Signup</button>
        <router-link to='/signin'><button type="submit">Sign in</button></router-link>
      </div>
    </form>
  </div>
  
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase.js'

export default {

  data() {
    return {
      form:{name:'',email:'',pass1:'',pass2:''}
    }
  },
  methods: {
    signup() {
      let fields = document.querySelectorAll('.field')
      let reqdiv = ['req0','req1','req2','req3']
      for ( let i =0 ; i< fields.length ; i++) {
        let values = fields[i].value
        if (values === '') {
          let reqfield = '.'+reqdiv[i]
          let req = document.querySelector(reqfield)
          req.classList.add('reqfield')
          req.innerHTML = 'This field is required !!!'
          return
        } 
    }
    for ( let i =0 ; i< reqdiv.length ; i++) 
    {
        let req_field = '.'+reqdiv[i]
        let req = document.querySelector(req_field)
        req.innerHTML = null
    }
    this.signupsave()
    },

    signupsave()
    { 
    console.log('hi')
    if (this.form.pass1 == this.form.pass2) {
      
      createUserWithEmailAndPassword(auth, this.form.email, this.form.pass1)
      .then((userCredential) => {
        const user = userCredential.user;
        let loc = window.location.href 
        window.location.href = loc + 'signin'
      })
      .catch((error) => {
        let req  = document.querySelector('.req3')
        req.innerHTML = "This E-mail id already registered"
        req.classList.add('reqfield')
      });
    }
    else {
      let req  = document.querySelector('.req3')
      req.innerHTML = "Password didn't match "
      req.classList.add('reqfield')
      return
    }
    },
  }

}
</script>

<style scoped>
  .free {
    background: url('@/assets/bg3.svg');
    height: 125px;
  }
  .sign_up {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    row-gap: 1em;
    margin: auto;
    padding: 2em;
    width: auto;
    height: fit-content;
    background-color: #002233;
    height:35.25em
  }
  .card {
    font-size: 3em;
    color: #0066FF;
    margin-bottom: 1em;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input{
    width: 30em;
    outline: none;
    border-radius: 10px;
    padding: .80em 1.75em;
    background-color: #002233;
    border: 1px solid gray;
    color: white;
  }
  .btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  button {
    border: none;
    padding: 10px 20px;
    font-size: 1.3em;
    text-decoration: none;
    background-color: #0066FF;
  }
  .input {
    display: flex;
    flex-direction: column;
  }
  input:focus {
    border: 1px solid #0066FF;
  }
  label {
    position: absolute;
    font-size: .8em;
    padding: .3em 0 0 .7em;
    color: gray;
    margin-left: .5em;
  }
  input:focus ~ label,input:valid ~ label
  {
    color: #0066FF;
    padding: 0 .5em;
    transform: translateX(10px) translateY(-10px);
    background-color: #002233;
    letter-spacing: .1em;
    transition: .5s;
    border-left:1px solid #0066FF ;
    border-right:1px solid #0066FF ;
  }
  .reqfield {
    color:red;
    height: 10%;
    margin-top: -10px;
    margin-left: 10px;
    margin-bottom: 20px;
  }

  @media only screen and (max-width:600px) {
    input {
      width: 20em;
    }
    .sign_up {
      margin-top: -10px;
      height: 30.5em;
    }

  }

</style>
