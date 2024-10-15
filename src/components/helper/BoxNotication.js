import { Alert, Snackbar } from "@mui/material";
function BoxNotication({ message, type = 'error', handleClose , open  = false, timeout = 3000, cofig }) {
    
    return (
      <div>
        <Snackbar open={open} autoHideDuration={timeout} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={type}
            variant="standard"
            sx={{ position: 'fixed' , top: '40px' , right: '30px' , maxWidth: '400px' , minWidth: '200px' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
      
}

export default BoxNotication;