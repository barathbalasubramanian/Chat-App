<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div class="container">
        <div class="chatbox">
            <div>CHAT BOX</div>
            <div class="logout"><router-link to='/'><div>Logout</div></router-link><router-view/></div>
        </div>
        <div class="freee"></div>
        <div class="allmessage">
            <div class="message" v-for="(data,index) in this.messages" :key="index">
                <div :class="data.name == this.currentUser ? 'user' : 'unknown'">{{data.message}}
                    <span>{{data.email}}</span>
                </div>
            </div>
        </div>
        <div class='free'></div>
        <div class="message-bar">
            <form @submit.prevent='send()'>
                <input type="text" class="input" v-model="form.message">
                <button type="submit"><span class="material-symbols-outlined">send</span></button>
            </form>
        </div>
    </div>
</template>

<script>
import { db , auth , insert_message  } from '@/firebase.js'
import { collection , getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {

     data(){
        return{
            form:{ name:'',message:'' },
            messages:[],
            dataid:[],
            currentUser : ''
        }
    },
    computed: {
        
    },
    mounted: function() {
        this.getuser()
        this.chatbox()
    },

    methods: {
        async send(){
            const data = await insert_message( { ...this.form } )
                this.form['name'] = ''
                this.form['message'] = ''
                this.chatbox()
                this.getuser()
        },

        async chatbox() 
        {
          this.messages = []
          const querySnapshot = await getDocs(collection(db, "message"));
          querySnapshot.forEach((doc) => {
                this.messages.push(Object(doc.data()))
            });    
        },

        getuser(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  const uid = user.email;
                  this.currentUser = uid
                  this.form.name = uid
                } else {
                  console.log('else part')
                }
            });
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    body {
        padding: 0;
        margin: 0;
    }
    *{
        font-family:'Poppins', sans-serif;
    }
    .container {
        margin: 0 15em;
    }
    .user , .unknown {
        padding: 2px 16px 3px 10px;
        border-radius: 10px 0 20px 10px;
        width: -moz-max-content;
        max-width: 20em;
        font-size: 14px;
        overflow: auto;
        width: fit-content;
    }
    .allmessage .user {
        padding: 2px 16px 6px 16px;
        border-radius: 10px 0 20px 10px;
        width: -moz-max-content;
        overflow: auto;
        max-width: 7em;
        float: right;
        background-color: #0066FF;
        color: white;

    }
    .allmessage .unknown {
        color: white;
        background-color: gray;
    }
    .chatbox {
        color: #002233;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2em 0 0.5em 0;
        background-image: url('@/assets/bg1.svg');
    }
    .allmessage {
        max-height: 24.5em;
        min-height: 24.5em;
        padding: 30px;
        display: flex;
        flex-direction: column;
        font-size: 18px;
        gap: .2em;
        overflow-y: auto;
        margin-top: -10px;
        background-color: #002233;
    }
    .message-bar {
        display: flex;
        flex-direction: column;
        background-color: #0066FF;
        position: fixed;
        bottom: 0;
        padding: 10px;
        text-align: center;
        width: -webkit-fill-available;
        margin: 0 15em 0 0 ;
    }

    form {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    input {
        padding: .3em .5em;
        border: none;
        border-radius:10px;
        outline: none;
        width: 40em;
    }
    button {
        border: none;
        background: none;
        color: white;
        margin-left: 10px;
    }
    .free {
        background-color: #002233;
        height: 30px;
        margin-top: -1px;
}
    .freee {
        height: 100px;
        background-image: url('@/assets/bg4.svg');
        margin-top: -10px;
    }    
    
    .logout {
        position: absolute;
        top: 0;
        right: 0;
        padding: 20px;
    }
    a {
        text-decoration: none;
        color: white;
    }
     ::-webkit-scrollbar {
    display: none;
    }
    @media only screen and (max-width:900px) {
    
    .container {
        margin: 0;
    }

    .allmessage {
        min-height: 27.5em; 
        margin-top: -11px;
    }
    .user .unknown {
        max-width: 7em;
    }
    .freee {
        height: 50px;
        background-image: url('@/assets/bg2.svg');
        margin-top: -10px;
    }    
    .message-bar {
        margin: 0;
    }
    input {
        width: 22em;
    }
    }
</style>
