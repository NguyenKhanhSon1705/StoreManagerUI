import { memo, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "~/components/helper/Breadcrumb";
import { createTables, deleteTables, getListTables, updateTables } from "~/store/actions/tablesAction";

import { FaRegEdit } from "react-icons/fa";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import LoadingSkeleton from "~/components/loading/LoadingSkeleton";
import Button from "~/components/buttons/Button";
import DialogCreateTables from "~/components/dialog/DialogCreateTables";
import DialogConfirm from "~/components/dialog/DialogConfirm";
import BoxNotication from "~/components/helper/BoxNotication";


function Tables() {
    const dispatch = useDispatch()
    const { data, loading, update, message } = useSelector(state => state.table)

    const [openDialog, setOpenDialog] = useState(false)
    const [openDelete, setOpenDelete] = useState({ open: false, items: {} })
    const [opentUpdate , setOpenUpdate] = useState({ open: false, items: {} })
    const [noti, setNoti] = useState({ msg: '', open: false })


    useLayoutEffect(() => {
        if (message) setNoti({ msg: message, open: true })

    }, [update, message])

    useEffect(() => {
        dispatch(getListTables())
    }, [dispatch])

    const handleUpdate = (item) => {
        // console.log(item);
        setOpenUpdate({open:true , items:item})
    }

    // create
    const handleOpenCreate = useCallback(() => {
        setOpenDialog(true)
    }, [])

    // delete
    const handleDelete = (id) => {
        setOpenDelete({
            open: true,
            items: id
        })
    }
    const handleSubmitDelete = (items) => {
        dispatch(deleteTables(items))
        setOpenDelete({ open: false })
    }

    const handleCloseDialog = useCallback(() => {
        setOpenDialog(false)
        setOpenUpdate({open: false})
    }, []);
    const handleSubmitValue = useCallback((data) => {
        dispatch(createTables(data))
    }, [dispatch])

    const handleSubmitUpdate = useCallback((data) => {
        dispatch(updateTables(data))
        // setOpenUpdate({ open: false })
        console.log(data);
        
    },[])
    return (
        <div>
            <DialogCreateTables
                title="THÊM PHÒNG BÀN"
                open={openDialog}
                onClose={handleCloseDialog}
                onSubmit={handleSubmitValue}
                
            />
            <DialogCreateTables
                title="CẬP NHẬT PHÒNG BÀN"
                open={opentUpdate.open}
                onClose={handleCloseDialog}
                onSubmit={handleSubmitUpdate}
                items = {opentUpdate.items}
            />

            <DialogConfirm
                title="Bạn muốn xóa bàn này không ?"
                onClose={() => setOpenDelete({ open: false })}
                onSubmit={handleSubmitDelete}
                open={openDelete.open}
                items={openDelete.items}
            />
            <BoxNotication
                handleClose={useCallback(() => setNoti({ ...noti, open: false }), [noti])}
                message={noti.msg}
                open={noti.open}
                type="success"
            />
            <Breadcrumb
                items={[{ name: 'Thông tin phòng bàn', href: '' }]}
            />
            {
                loading
                    ?
                    <LoadingSkeleton />
                    :
                    <div>
                        <div className="flex justify-end text-[18px] mb-2">
                            <Button
                                onClick={handleOpenCreate}
                                rounded={true}
                                leftIcon={<MdAdd />}
                                className="flex items-center bg-[var(--bg-btn-add)] p-2 text-[var(--textlight)] rounded-sm">
                                Thêm
                            </Button>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Khu vực
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Phòng bàn
                                        </th>
                                        <th scope="col" className="px-4 py-3 w-[15%]">
                                            Tính giờ
                                        </th>
                                        <th scope="col" className="px-4 py-3 w-[15%]">
                                            Hoạt động
                                        </th>
                                        <th scope="col" className="px-4 py-3 w-[15%]">
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
                                                    <td className="px-4 py-3">
                                                        {item?.areaName}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {item?.nameTable}
                                                    </td>
                                                    <td className="px-4 py-3 ">
                                                        {item?.hasHourlyRate ? <p className="flex w-1/4 h-5 me-3 ml-2 bg-green-500 rounded-full"></p> : <p className="flex w-1/4 h-5 me-3 ml-2 bg-red-500 rounded-full"></p>}
                                                    </td>
                                                    <td className="px-4 py-3 ">
                                                        {item?.isActive ? <p className="flex w-1/4 h-5 me-3 ml-2 bg-green-500 rounded-full"></p> : <p className="flex w-1/4 h-5 me-3 ml-2 bg-red-500 rounded-full"></p>}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            onClick={() => handleUpdate(item)}
                                                            className="font-medium p-2 text-white rounded-md text-[16px] mr-1 bg-[var(--bg-btn-edit)] hover:opacity-70 "><FaRegEdit /></button>
                                                        <button
                                                            onClick={() => handleDelete(item?.id)}
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

export default memo(Tables);