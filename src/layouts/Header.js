import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import images from "~/assets/images";
import { useSelector } from "react-redux";
import Button from "~/components/buttons/Button";
import routes from "~/config/routes";
import Cookies from "js-cookie";
import UserInfoHeader from "~/components/UserInfoHeader";
function Header() {
    const { currentUser } = useSelector(state => state.currentUser);
    const logined = Cookies.get(process.env.REACT_APP_LOGINED);
    const navigate = useNavigate()

    useEffect(() => {
        if (!logined) {
            navigate(routes.login)
        }
    }, [logined, currentUser.email, navigate]);

    return (
        <div className="h-[var(--header-height)] w-full bg-[var(--primary)] px-20 fixed z-20">

            <div className="w-full h-full flex items-center justify-between">
                <div className="w-[60px] h-[60px] relative">
                    <div className={`absolute right-0 top-0 w-[20px] h-[20px] rounded-full ${currentUser.isActive ? 'bg-green-400' : 'bg-red-500'}   `}> </div>
                    <img className="w-full h-full rounded-full object-fill " alt="null" src={currentUser.shopLogo || images.avt_user_default}></img>
                </div>

                <div className="w-1/4" >
                    <h2 className="text-[var(--textlight)] font-bold	 ">{currentUser.shopName}</h2>
                </div>
                {
                    logined ?
                        <UserInfoHeader
                            email={currentUser.email}
                            fullName={currentUser.fullName}
                            picture={currentUser.picture}
                        />
                        :
                        <div className="text-white flex items-center">
                            <Button
                                to={routes.login}
                                outline={true}
                                rounded={true}

                            >Đăng nhập</Button>
                            <Button
                                to={routes.register}

                            >Đăng Ký</Button>
                        </div>
                }
            </div>
        </div>
    );
}

export default Header