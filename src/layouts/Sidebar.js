import { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import images from "~/assets/images";
import Button from "~/components/buttons/Button";
import { privateRouteSideBar } from "~/routes";

function Sidebar() {
    const [hidden, setHidden] = useState(false)

    const onHidden = () => {
        setHidden(!hidden)
    }

    return (
        <div className={`relative transition-all duration-500 ease-in-out ${hidden ? 'w-[50px]' : 'w-[25%]'}  relative text-white bg-[var(--primary)] h-screen mt-[var(--header-height)] shadow-inner pt-10`}>
            <div className="absolute top-0 right-[8px] p-1 rounded-full ">
                <button
                    onClick={onHidden}
                >
                    <TiThMenuOutline></TiThMenuOutline>
                </button>
            </div>

            <div className="flex flex-col ">
                {
                    privateRouteSideBar.map((btn, index) => {
                        const Icon = btn.icon
                        return (
                            <Button
                                key={index}
                                to={btn.path}
                                className="text-[20px] border-b-2 py-2 border-[#efab6b]"
                            >
                                <div className=" flex items-center ">
                                    <p className="mb-1 mx-2 text-[30px]">
                                        {Icon && <Icon></Icon>}
                                    </p>
                                    <p className={`${Icon ?'': 'mx-7'} text-[18px] whitespace-nowrap`}>{!hidden && btn.name}</p>
                                </div>
                            </Button>
                        )
                    })
                }
                <div className="absolute bottom-10 right-1/2 translate-x-1/2">
                <img className="w-full h-full object-fill " alt="null" src={images.logo}></img>

                </div>
            </div>
        </div>
    );
}

export default Sidebar;