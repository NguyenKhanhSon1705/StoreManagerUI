import { Alert, Snackbar } from "@mui/material";
import { memo } from "react";
function BoxNotication({ message, type = 'error', handleClose , open  = false, timeout = 5000, cofig }) {
    return (
      <div>
        <Snackbar open={open} autoHideDuration={timeout} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={type}
            variant="filled"
            sx={{ position: 'fixed' , top: '80px' , right: '30px' , maxWidth: '400px' , minWidth: '200px' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
      
}

export default memo(BoxNotication);