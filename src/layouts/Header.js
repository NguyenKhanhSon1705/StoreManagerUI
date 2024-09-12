import { useState } from "react";

import { FaRegBell } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";

import images from "~/assets/images";
import Input from "~/components/inputs/Input";

function Header() {
    const [search , setSearch] = useState('')
    console.log('search', search)
    return ( 
        <div className="h-[var(--header-height)] w-full bg-[var(--primary)] px-20">
            <div className="w-full h-full flex items-center justify-between">
                <div className="w-[80px] h-[35px]">
                    <img className="w-full h-full object-fill " alt="null" src={images.logo}></img>
                </div>
                <div className="w-1/4" >
                    <Input 
                    label={'Tìm kiếm'}
                    classDiffLabel={'text-white'}
                    classDiff={'border-white w-full focus:border-white text-white'}
                    value={search}
                    type={'text'}
                    onChange={(e) => {setSearch(e)}}
                    ></Input>
                </div>
                <div className="text-white flex items-center">
                    <p className="mx-3 text-[20px]">
                        <FaRegBell ></FaRegBell>
                    </p>
                    <p className="mx-3 text-[20px]">
                        <IoIosOptions ></IoIosOptions>
                    </p>
                    <div className="ml-3 flex items-center ">
                        <p className="px-2 text-[15px]">Nguyễn Khánh Sơn</p>
                        <img className="w-[50px] h-[50px] rounded-full shadow-lg" src={images.logo} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Header