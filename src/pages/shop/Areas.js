import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdAdd } from "react-icons/md";

import { createArea, deleteArea, getListAreas, updateArea } from "~/store/actions/areasAction";
import LoadingSkeleton from "~/components/helper/LoadingSkeleton";
import DialogCustom from "~/components/dialog/DialogCustom";
import DialogConfirm from "~/components/dialog/DialogConfirm";
import Breadcrumb from "~/components/helper/Breadcrumb";
import Button from "~/components/buttons/Button";

const fields = [
    {
        name: "areaName",
        label: "Khu vực",
        type: "text",
        required: true,
        autoFocus:true,
    }
];

function Areas() {

    const dispatch = useDispatch()
    const { data, loading, update } = useSelector(state => state.area)
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogConfim, setOpenDialogConfim] = useState(false)
    const [openDialogCreate, setOpenDialogCreate] = useState(false)

    const [details, setDetails] = useState({})

    useEffect(() => {
        dispatch(getListAreas())
    }, [dispatch, update])

    const handleGetDetails = (item) => {
        setDetails(item)
        setOpenDialog(true)
    }

    const handleDialogSubmitCreate = (item) =>{
        console.log(item);
        dispatch(createArea(item))
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
        setOpenDialogCreate(false)
    }
    const handleDialogConfirm = () => {
        setOpenDialogConfim(false)
    }
    const handleDialogSubmit = (data) => {
        dispatch(updateArea(data))
    }
    // delete
    const handleGetDelete = (id) => {
        setDetails(id)
        setOpenDialogConfim(true)
    }
    const handleDialogSubmitDelete = (items) => {
       
        dispatch(deleteArea(items))
        setOpenDialogConfim(false)

    }
    return (
        <div>
            <DialogConfirm
                title="Bạn có chắc chắn muốn xóa không ?"
                open={openDialogConfim}
                items={details}
                onClose={handleDialogConfirm}
                onSubmit={handleDialogSubmitDelete}
            />

            <DialogCustom
                open={openDialog}
                handleClose={handleDialogClose}
                onSubmit={handleDialogSubmit}
                item={details}
                fields={fields}
            />

            <DialogCustom
                open={openDialogCreate}
                handleClose={handleDialogClose}
                onSubmit={handleDialogSubmitCreate}
                item={{areaName: ''}}
                fields={fields}
            />

            <div>
                <Breadcrumb
                    items={[{ name: 'Thông tin khu vực', href: '' }]}
                />
            </div>
            {
                loading
                    ?
                    <LoadingSkeleton />
                    :
                    <div>
                        <div className="flex justify-end text-[18px] mb-2">
                            <Button
                                
                                onClick={() => setOpenDialogCreate(true)}
                                rounded={true}
                                leftIcon={<MdAdd />}
                                className="flex items-center bg-[var(--bg-btn-add)] p-2 text-[var(--textlight)] rounded-sm">
                                Thêm khu vực
                            </Button>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Khu vực
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[15%] ">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.length > 0 && data.map((item, index) => {
                                            return (
                                                <tr key={item?.id} className="odd:bg-gray-200 even:bg-white border-b ">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        {index += 1}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {item?.areaName}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => handleGetDetails(item)}
                                                            className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-edit)] hover:opacity-70 "><FaRegEdit /></button>
                                                        <button
                                                            onClick={() => handleGetDelete(item?.id)}
                                                            className="font-medium p-2 text-white rounded-md text-[16px]  ml-1 bg-[var(--bg-btn-delete)] hover:opacity-70"><MdDeleteOutline /></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Areas;