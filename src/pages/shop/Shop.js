import images from "~/assets/images";
import { FaPlusCircle } from "react-icons/fa"
import { FaAngleDoubleRight } from "react-icons/fa";
import Button from "~/components/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listShop } from "~/store/actions/shopAction";
import LoadingShopCardSkeleton from "~/components/loading/LoadingShopCardSkeleton";
import routes from "~/config/routes";
import { getCurrentUser } from "~/store/actions/currentUserAction";
import { useNavigate } from "react-router-dom";
export default function Shop() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data, loading } = useSelector(state => state.shop)

    useEffect(() => {
        dispatch(listShop())
    }, [dispatch])


    const handleGotoShop = (id) => {
        dispatch(getCurrentUser(id));
        navigate(routes.home)
    }


    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-6 text-center mt-10">Danh sách cửa hàng</h1>
            {
                loading ? <LoadingShopCardSkeleton /> :
                    (data?.length > 0
                        ?
                        <div className="flex items-center justify-center ">
                            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {
                                    data?.map((item) => {
                                        return (
                                            <div key={item.id} className="relative text-[18px] flex shadow-md  border-2 p-4 max-w-64 rounded-xl justify-center flex-col items-center">
                                                <p className={`absolute top-1 right-2 w-[30px] h-[30px] rounded-full ${item.isActive ? 'bg-green-500' : 'bg-red-600'} `}></p>
                                                <img src={item.shopLogo || images.test} alt="" className="object-cover w-[100px] shadow-2xl h-[100px] rounded-full" />
                                                <div className="flex flex-col items-start ">
                                                    <h1 className="text-center text-[20px] py-2 font-semibold">{item.shopName}</h1>
                                                    {/* <p className="text-gray-600 py-2 text-center"><span className={`${item.isActive ? 'bg-green-500' : 'bg-red-600'} text-white p-2 rounded-md my-2`}>{item.isActive ? 'Open' : 'Close'}</span></p> */}
                                                    <p className="text-gray-600 py-2 text-center">{item.shopPhone || 'N/A'}  </p>
                                                    <p className="text-gray-600 py-2 text-center">{item.shopAddress || 'N/A'}</p>
                                                </div>
                                                <Button
                                                    rounded={true}
                                                    primary={true}
                                                    classDiff={"mt-2"}
                                                    onClick={() => handleGotoShop(item.id)}
                                                >Đi tới <FaAngleDoubleRight />
                                                </Button>
                                            </div>
                                        )
                                    })
                                }
                                <Button
                                    to={routes.create_shop} className="flex shadow-md border-2 p-2 rounded-xl justify-center flex-col items-center">
                                    <span className="text-[70px] text-[var(--primary)]"><FaPlusCircle /></span>
                                </Button>
                            </div>
                        </div>
                        :
                        <div className="flex items-center justify-center ">
                            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Button
                                    to={routes.create_shop} className="flex shadow-md border-2 p-2 rounded-xl justify-center flex-col items-center">
                                    <span className="text-[70px] text-[var(--primary)]"><FaPlusCircle /></span>
                                </Button>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}