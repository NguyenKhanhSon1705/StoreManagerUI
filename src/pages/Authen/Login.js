
import { useEffect, useState } from "react";

import { FaFacebook } from "react-icons/fa6";

import request from "~/utils/request";

import Input from '~/components/inputs/Input';
import Button from "~/components/buttons/Button";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabelBtn, setDisabelBtn] = useState(true)

    useEffect(() => {
        (email !== '' && password !== '') ? setDisabelBtn(false) : setDisabelBtn(true)

    }, [email, password])

    const handleLogin = () => {
        let ob = {
            "email": email,
            "password": password
        }
        console.log('ob', ob)
        request.post('/Authen/login', {
            params:ob
        })
        .then(res => console.log('res', res))
        .catch(error => {
            if (error.response) {
              // Request made and server responded with a status code
              // that falls out of the range of 2xx
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('Request data:', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error message:', error.message);
            }})
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--primary)]">
            <div className=" bg-[rgba(255,255,255,0.9)] backdrop-blur-lg rounded-xl p-4 shadow-2xl w-full max-w-md">
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
                        classDiff={'!px-0 !py-0 underline hover:text-red-600 !mt-2'}
                    >Quên mật khẩu
                    </Button>
                    <Button
                        to={''}
                        disabled={disabelBtn}
                        onClick={handleLogin}
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
                    <Button className=" font-bold hover:underline pl-1">Đăng ký</Button>
                </p>
            </div>
        </div>
    );
}

export default Login