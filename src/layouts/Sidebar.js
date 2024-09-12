import classNames from "classnames";
import { useState } from "react";
import { FaAlignLeft } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import Button from "~/components/buttons/Button";

function Sidebar() {
    const [hidden , setHidden] = useState(true)

    const onHidden = ()=>{
        setHidden(!hidden)
        console.log(hidden);
    }

    return ( 
        <div className = {classNames("w-[25%] relative text-white bg-[var(--primary)] h-full shadow-inner p-4 pt-10")}>
            <div className=" absolute top-0 right-0 p-1 rounded-full ">
                <button 
                onClick={onHidden}
                >
                    <FaAlignLeft></FaAlignLeft>
                </button>
                </div>
           <div className="">
           <Button to={'/'} className=" flex items-center text-[20px] p-2"><p >Home 1</p> <p className="mb-1 mx-2"><IoHomeOutline></IoHomeOutline></p></Button>
           <Button to={'/feedback'} className=" flex items-center text-[20px] p-2"><p >Home 1</p> <p className="mb-1 mx-2"><IoHomeOutline></IoHomeOutline></p></Button>
            
           </div>
        </div>
     );
}

export default Sidebar;