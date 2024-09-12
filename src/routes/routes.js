import routes from "~/config/routes"

import ForgotPassword from "~/pages/Authen/ForgotPassword"
import Login from "~/pages/Authen/Login"
import Register from "~/pages/Authen/Register"
import Feedback from "~/pages/Feedback"
import Home from "~/pages/Home"

const publicRoute = [
    {path:routes.home , component: Home},
    {path:routes.feedback , component: Feedback},
    {path:routes.login , component: Login , layout:null},
    {path:routes.register , component: Register , layout:null},
    {path:routes.forgotpassword , component: ForgotPassword, layout:null},
]

const privateRouteSideBar = [
    {path:routes.home , component: Home},
    {path:routes.feedback , component: Feedback},
]


const privateRoute = [

]

export {publicRoute , privateRoute , privateRouteSideBar}