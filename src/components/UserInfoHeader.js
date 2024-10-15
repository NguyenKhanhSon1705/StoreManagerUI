import { FaRegBell } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";
import { useDispatch } from "react-redux";
import images from "~/assets/images";
import Button from "./buttons/Button";
import { logout } from "~/store/actions/authAction";

function UserInfoHeader({email, fullName, picture}) {
    const dispatch = useDispatch();
    // const {  } = useSelector(state => state.currentUser.currentUser);

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="text-white flex items-center">
            <p className="mx-3 text-[20px]">
                <FaRegBell ></FaRegBell>
            </p>
            <p className="mx-3 text-[20px]">
                <IoIosOptions ></IoIosOptions>
            </p>
            <div className="ml-3 flex items-center ">
                <p className="px-2 text-[15px]">{fullName || email}</p>
                <img className="w-[50px] h-[50px] rounded-full shadow-lg bg-white" src={picture || images.avt_user_default} alt=""></img>
            </div>
            <Button

            primary = {true}
            onClick={()=>handleLogout()}
             >
                Đăng xuất
            </Button>
        </div>
    );
}

export default UserInfoHeader;