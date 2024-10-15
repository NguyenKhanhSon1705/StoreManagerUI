import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import images from "~/assets/images";
import Breadcrumb from "~/components/helper/Breadcrumb";
import routes from "~/config/routes";
import { getUserDetails, updateUser } from "~/store/actions/userManageAction";
import formatDate from "~/utils/formatDate";

const TabContent = ({ open, tabCategory, details }) => {
    return (
        <div>
            <div
                className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${open === tabCategory ? "block" : "hidden"
                    } `}>
                {details}
            </div>
        </div>
    );
};

function UserInfoDetails() {
    const [open, setOpen] = useState("Thông tin cá nhân");
    const handleTabOpen = (tabCategory) => {
        setOpen(tabCategory);
    };

    const { userDetails } = useSelector(state => state.userManage);  // Redux state
    const { userId } = useParams();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({}); // Initial state is empty

    // First effect: Dispatch the action to get user details if IDs don't match
    useEffect(() => {
        if (userDetails?.id !== userId) {
            dispatch(getUserDetails(userId));
        }
    }, [dispatch, userId, userDetails?.id]);

    // Second effect: Sync formData when userDetails is updated
    useEffect(() => {
        if (userDetails) {
            setFormData(userDetails); // This ensures formData is updated when userDetails are fetched
        }
    }, [userDetails]);

    const [editable, setEditable] = useState(false); // Editable state
    const [updatedImage, setUpdatedImage] = useState(null); // Image upload

    // Handling input change for form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedImage(URL.createObjectURL(file));
            setFormData({ ...formData, picture: file });
        }
    };

    const handleEdit = () => {
        setEditable(true);
    };

    const handleUpdate = () => {
        console.log(formData);
        dispatch(updateUser(formData))
        setEditable(false); // Turn off edit mode
    };

    return (
        <div>
            <Breadcrumb items={[{ name: 'Quản lý nhân viên', href: routes.list_user }, { name: 'thông tin cá nhân' }]} />
            <section className="dark:bg-dark ">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mb-14 w-full">
                                <div className="flex flex-col flex-wrap rounded-lg border border-[#E4E4E4] px-4 py-3 dark:border-dark-3 sm:flex-row">
                                    <button onClick={() => handleTabOpen("Thông tin cá nhân")} className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${open === "Thông tin cá nhân" ? "bg-[var(--primary)] text-[var(--textlight)]" : "text-body-color hover:bg-primary hover:text-[var(--textdark)] dark:text-dark-6 dark:hover:text-[var(--textdark)]"}`}>
                                        Thông tin cá nhân
                                    </button>
                                    <button onClick={() => handleTabOpen("about")} className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${open === "about" ? "bg-[var(--primary)] text-[var(--textlight)]" : "text-body-color hover:bg-primary hover:text-[var(--textdark)] dark:text-dark-6 dark:hover:text-[var(--textdark)]"}`}>
                                        Phụ thuộc
                                    </button>
                                    <button onClick={() => handleTabOpen("other")} className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${open === "team" ? "bg-[var(--primary)] text-[var(--textlight)]" : "text-body-color hover:bg-primary hover:text-[var(--textdark)] dark:text-dark-6 dark:hover:text-[var(--textdark)]"}`}>
                                        Thêm
                                    </button>
                                </div>
                                <TabContent
                                    details={
                                        <div>
                                            <div className="flex justify-center mb-5">
                                                <img
                                                    src={updatedImage || formData?.picture || images.avt_user_default}
                                                    alt="User"
                                                    className="w-32 h-32 rounded-full object-cover"
                                                />
                                            </div>
                                            {editable && (
                                                <div className="flex justify-center mb-5">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange} />
                                                </div>
                                            )}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block font-medium text-gray-700">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData?.email ?? ""}
                                                        // onChange={handleChange}
                                                        className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block font-medium text-gray-700">Họ & Tên</label>
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={formData?.fullName ?? ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                                                        disabled={!editable}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block font-medium text-gray-700">Số điện thoại</label>
                                                    <input
                                                        type="text"
                                                        name="phoneNumber"
                                                        value={formData?.phoneNumber ?? ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                                                        disabled={!editable}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block font-medium text-gray-700">Địa chỉ</label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={formData?.address ?? ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                                                        disabled={!editable}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block font-medium text-gray-700">Ngày sinh</label>
                                                    <input
                                                        type="date"
                                                        name="birthDay"
                                                        value={formatDate(formData?.birthDay) ?? ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                                                        disabled={!editable}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block font-medium text-gray-700">Giới tính</label>
                                                    <select
                                                        name="gender"
                                                        value={formData?.gender ?? ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                                                        disabled={!editable}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="0">Nữ</option>
                                                        <option value="1">Nam</option>
                                                        <option value="2">Khác</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex justify-end">
                                                {!editable ? (
                                                    <button
                                                        onClick={handleEdit}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                                        Chỉnh sửa
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handleUpdate}
                                                        className="bg-green-500 text-white px-4 py-2 rounded-md">
                                                        Lưu
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    }
                                    open={open}
                                    tabCategory="Thông tin cá nhân"
                                />
                                <TabContent
                                    details={
                                        <div>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block font-medium text-gray-700">Quản lý bởi</label>
                                                    <input
                                                        type="text"
                                                        name="managerName"
                                                        value={formData?.managerName ?? ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                        disabled={!editable}
                                                    />
                                                </div>

                                            </div>

                                        </div>
                                    }
                                    open={open}
                                    tabCategory="about"
                                />
                                <TabContent
                                    details={
                                        <div></div>
                                    }
                                    open={open}
                                    tabCategory="other"
                                />
                                {/* Add other TabContent sections for different tabs */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserInfoDetails;
