
import { FaRegUserCircle } from "react-icons/fa";
import routes from "~/config/routes"
import { MdOutlineFeedback } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaChartArea } from "react-icons/fa6";
import { FaTable } from "react-icons/fa";


import ForgotPassword from "~/pages/Authen/ForgotPassword"
import Login from "~/pages/Authen/Login"
import Register from "~/pages/Authen/Register"
import Feedback from "~/pages/Feedback"
import Home from "~/pages/Home"
import CreateShop from "~/pages/shop/CreateShop"
import Shop from "~/pages/shop/Shop"
import UpdateShop from "~/pages/shop/ShopDetails"
import UserInfoDetails from "~/pages/user/UserInfoDetails"
import UserManage from "~/pages/user/UserManage"
import ShopDetails from "~/pages/shop/ShopDetails";
import Areas from "~/pages/shop/Areas";
import { Table } from "@mui/material";
import Tables from "~/pages/shop/Tables";

const publicRoute = [
    
    {name: "Đăng nhập", path:routes.login , component: Login , layout:null},
    {name: "Đăng ký", path:routes.register , component: Register , layout:null},
    {name: "Quên mật khẩu",path:routes.forgotpassword , component: ForgotPassword, layout:null},
]

const privateRouteSideBar = [
    {name:"Home", icon:MdOutlineHome , path:routes.home , component: Home},
    {name:"Feedback", icon:MdOutlineFeedback, path:routes.feedback , component: Feedback},
    {name:"Quản lý nhân viên", icon:FaRegUserCircle, path:routes.list_user , component: UserManage},
    {name:"Chọn cửa hàng", icon:CiShop, path:routes.shop , component: Shop, layout: null},
    {name:"Thông tin cửa hàng", icon:IoIosInformationCircleOutline, path:routes.shop_detail , component: ShopDetails},
    {name:"Khu vực", icon:FaChartArea, path:routes.areas , component: Areas},
    {name:"Phòng bàn", icon:FaTable, path:routes.tables , component: Tables},
]


const privateRoute = [
    // routes liên quan đến người dùng
    {name:"Thông tin cá nhân", path:routes.user_detail , component: UserInfoDetails},
    
    // routes liên liên quan đến cửa hàng
    {name:"Cửa hàng", path:routes.shop , component: Shop , layout: null},
    {name:"Thêm cửa hàng", path:routes.create_shop , component: CreateShop , layout: null},
    {name:"Thông tin cửa hàng", path:routes.update_shop , component: UpdateShop},

    


]

export {publicRoute , privateRoute , privateRouteSideBar}