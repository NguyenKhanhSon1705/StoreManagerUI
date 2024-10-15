import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from '~/components/inputs/Input';
import Button from "~/components/buttons/Button";
import routes from "~/config/routes";
import { login } from "~/store/actions/authAction";
import BoxNotication from "~/components/helper/BoxNotication";
import LoadingSyncLoader from "~/components/helper/LoadingSyncLoader";
import Cookies from "js-cookie";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let {loading, message } = useSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabelBtn, setDisabelBtn] = useState(true);
    const [open, setOpen] = useState({ message: '', open: false, type: 'error' });
    
    // Chuyển đổi giá trị logined từ chuỗi thành boolean
    const logined = Cookies.get(process.env.REACT_APP_LOGINED) === "true";

    useEffect(() => {
        (email !== '' && password !== '') ? setDisabelBtn(false) : setDisabelBtn(true);
    }, [email, password]);

    useEffect(() => {
        if (message) {
            setOpen({ message: message, open: true, type: 'error' });
        }
    }, [navigate, message]);

    // Điều hướng về trang home nếu đã đăng nhập (logined === true)
    useEffect(() => {
        if (logined) {
            navigate(routes.shop);
        }
    }, [logined, navigate]);


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen({ message: '', open: false, type: 'error' });
    };

    return (
        <form className="min-h-screen flex items-center justify-center">
            {loading && <LoadingSyncLoader></LoadingSyncLoader>}
            <BoxNotication
                handleClose={handleClose}
                open={open.open}
                timeout={4000}
                type={open.type}
                message={open.message}
            />
            <div className=" bg-[rgba(255,255,255,0.9)] backdrop-blur-lg rounded-xl py-10 px-4 shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold mb-6 text-center">Đăng nhập</h2>
                <div className="space-y-6">
                    <div className="relative">
                        <Input
                            label={"Email"}
                            type={'email'}
                            rule={'email'}
                            value={email}
                            onChange={e => { setEmail(e) }}
                        />
                    </div>
                    <div className="relative">
                        <Input
                            label={"Mật khẩu"}
                            type={'password'}
                            rule={'empty'}
                            value={password}
                            onChange={e => setPassword(e)}
                        />
                    </div>
                    <Button
                        href={routes.forgotpassword}
                        classDiff={'!px-0 !py-0 !justify-start underline hover:text-red-600 !mt-2'}
                    >Quên mật khẩu
                    </Button>
                    <Button
                        to={''}
                        disabled={disabelBtn}
                        onClick={e => handleLogin(e)}
                        primary={true}
                        rounded={true}
                        large={true}
                    >
                        Đăng nhập
                    </Button>
                </div>
                <p className=" text-center text-sm p-5">Hoặc đăng nhập với</p>
                <div className="w-full flex justify-center ">
                    <Button
                        classDiff={'text-white bg-blue-600 hover:bg-blue-700 '}
                        large={true}
                        rounded={true}
                        leftIcon={<FaFacebook />}
                    >
                        Facebook
                    </Button>
                </div>

                <p className=" text-center mt-6 text-sm ">
                    Bạn chưa có tài khoản
                    <Button href={routes.register} className=" font-bold hover:underline pl-1">Đăng ký</Button>
                </p>
            </div>
        </form>
    );
};

export default Login;
