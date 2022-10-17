import { createRouter, createWebHashHistory } from 'vue-router'
import SignUpView from '../views/SignUpView.vue'
import SigninView from '../views/SigninView.vue'
import chatView from '../views/chatView.vue'

const routes = [
  {
    path: '/',
    component : SignUpView
  },
  {
    path: '/signin',
    component : SigninView
  },
  {
    path: '/signin/chat',
    name: 'chat',
    component : chatView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
