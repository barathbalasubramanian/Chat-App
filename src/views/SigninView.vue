<template>
  <div class="free"></div>
  <div class="sign_in">
    <div class="card">SIGN IN</div>
    <form @submit.prevent="signin()">
      <div class="input">
        <input type="text" v-model="form.name" required><br>
        <label>USERNAME</label>
        
      </div>
      <div class="input">
        <input type="email" v-model="form.email" required><br>
        <label>EMAIL</label>
      
      </div>
      <div class="input">
        <input type="password" v-model="form.password" required><br>
        <label>PASSWORD</label>
        <div class="reqfield"></div>
      </div>
      <div class="error"></div>
      <button type="submit">sign in</button>
    </form>
  </div>
</template>

<script>

import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase.js'

export default {
  
  data(){
    return {
      form:{name:'',email:'',password:''}
    }
  },
  methods: {
    signin(){
      console.log('vanthuten')
      signInWithEmailAndPassword(auth, this.form.email, this.form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.messagebox()
      })
      .catch((error) => {
        let err = document.querySelector('.reqfield')
        err.innerHTML = 'E-mail or Password is incorrect'
      });
    },
    messagebox(){
      let loc = window.location.href 
      window.location.href = loc + '/chat'
    }
  },

}
</script>

<style scoped>
  .free {
    background-image:url('@/assets/bg3.svg');
    height: 125px;
  }
  .sign_in {
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
    height: 35.25em;
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
    color:white;
    width: 30em;
    outline: none;
    border-radius: 10px;
    padding: .80em 1.75em;
    background-color: #002233;
    border: 1px solid gray;
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
  label {
    position: absolute;
    font-size: .8em;
    padding: .3em 0 0 .7em;
    color: gray;
    margin-left: .5em;
  }
  input:focus {
    border: 1px solid #0066FF;
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
    .sign_in {
      margin-top: -10px;
      height: 33.5em;
    }

  }
</style>