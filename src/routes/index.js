import Vue from 'vue'
import Router from 'vue-router'

import HospitalRoutes from "./hospitalRoutes/router"
import AdminRoutes from "./adminRoutes/router"

import Auth from "../views/Auth"
import Login from "../components/authComponents/Login"
import SignUp from "../components/authComponents/SignUp"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Auth,
      children: [
        {
          path: "",
          component: Login
        },
        {
          path: "signup",
          component: SignUp
        },
      ]
    },
    ...HospitalRoutes,
    ...AdminRoutes
  ]
})
