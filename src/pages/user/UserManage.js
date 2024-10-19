import { CiLock } from "react-icons/ci";
import { Box } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import React, { useEffect } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import Button from '~/components/buttons/Button';
import LoadingSkeleton from '~/components/loading/LoadingSkeleton';
import { getUserOfTree, getUserOfTreeById, lockUser } from '~/store/actions/userManageAction';
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import Breadcrumb from "~/components/helper/Breadcrumb";
import DialogConfirm from "~/components/dialog/DialogConfirm";

const colors = [
    '#f8f9f9',
    '#d7dbdd',
    '#a6acaf',
    '#626567',
];
export default function UserManage() {
    const [openDialog, setOpenDialog] = React.useState({open: false, item:{}})
    const userManage = useSelector(state => state.userManage)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserOfTree())
    }, [dispatch])

    const handleClickViewUser = (id) => {
        navigate(routes.user_detail)
    }
    const handleLookUser = (id) => {
        // console.log(id);
        setOpenDialog({open: true , items:id});
    }

    const renderTreeItems = (nodes, level = 0) => {
        const handleClick = (e, id) => {
            const cellWidth = e.currentTarget.offsetWidth;
            const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
            if (clickX < cellWidth / 2) {
                dispatch(getUserOfTreeById(id))
            }
        };
        
        const backgroundColor = colors[level % colors.length];

        return (
            <TreeItem
                key={nodes.id}
                itemId={nodes.id}
                label={
                    <div
                        className='p-2 rounded-lg flex justify-around items-center'
                        onClick={(e) => handleClick(e, nodes.id)} // Add click handler here
                        style={{ backgroundColor }} // Apply background color
                    >
                        <div className='w-[60px] bg-white flex justify-center rounded-lg'>
                            <img
                                style={{
                                    width: '50px',    // Set the fixed width to 50px
                                    height: 'auto',   // Maintain aspect ratio
                                    maxHeight: '50px', // Set a max height if necessary to prevent overflow
                                    objectFit: 'cover' // Ensures the image covers the area without distortion
                                }}

                                src={nodes.picture || images.avt_user_default} alt={nodes.email} />
                        </div>
                        <b className='w-1/4 border-r-2 px-2 overflow-hidden text-ellipsis whitespace-nowrap'>{nodes.email}</b>
                        <p className=" w-1/4 border-r-2 px-2 overflow-hidden text-ellipsis whitespace-nowrap">{nodes.fullName || "..."}</p>
                        <p className='w-1/4 border-r-2 px-2'>{nodes.phone || "..."}</p>
                        <p className='w-1/4 border-r-2 px-2'>{nodes.roles || "..."}</p>
                    
                        <div className="flex pl-2">
                            <Button
                                to={routes.user_detail.replace(':userId', nodes.id)}
                                primary={true}
                                rounded={true}
                                onClick={() => handleClickViewUser(nodes.id)}
                                classDiff={"mr-2"}
                            >
                                <FaRegUserCircle />
                            </Button>
                            <Button
                                primary={false}
                                rounded={true}
                                outline={false}
                                classDiff={"bg-orange-400 text-white"}
                                onClick={() => handleLookUser(nodes.id)}
                            >
                                <CiLock />

                            </Button>
                        </div>
                    </div>
                }
            >
                {Array.isArray(nodes.children)
                    ? nodes.children.map((childNode) => renderTreeItems(childNode, level + 1)) // Increment level for child nodes
                    : null}
            </TreeItem>
        );
    };

    const handleCloseDialog = ()=>{
        setOpenDialog({open: false})
    }
    const handleSubmitLookUser = (item) =>{
        dispatch(lockUser(item))
        setOpenDialog({open: false})
    }
    return (
        <div>
            <DialogConfirm
                title="Bạn có muốn khóa tài khoản này không ?"
                open={openDialog.open}
                onClose={handleCloseDialog}
                onSubmit={handleSubmitLookUser}
                items = {openDialog.items}
            />
            <div>
                <Breadcrumb
                    items={[{ name: 'Thông tin nhân viên', href: '' }]}
                />
            </div>
            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <SimpleTreeView>
                    {
                        userManage?.listUser?.length > 0
                            ? userManage?.listUser.map((node) => renderTreeItems(node)) // Render tree nodes when data is loaded
                            : <LoadingSkeleton />} {/* Loading indicator */
                    }
                </SimpleTreeView>
            </Box>
        </div>
    );
}
