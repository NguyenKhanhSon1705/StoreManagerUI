import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function DialogCreateTables({
    title = "Thông báo",
    open = false,
    onClose,
    onSubmit,
    item = {},
    fields = []
}) {
    const [formData, setFormData] = React.useState({});
    
    

    return (
        <React.Fragment >
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                      event.preventDefault();
                      formData.id = item.id
                      onSubmit(formData)
                      onClose();
                    },
                  }}
                fullWidth
            >
                <DialogTitle textAlign={"center"}>{title}</DialogTitle>
                <DialogContent>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        className='!bg-[var(--primary)] !text-white'
                        type="submit">Gửi</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DialogCreateTables;
