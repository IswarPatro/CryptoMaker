import { Snackbar } from '@material-ui/core';
import React from 'react'
import { CryptoState } from '../CryptoContext'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = () => {
    const {alert,setAlert}=CryptoState();    

    const handleClose=(event,reason)=>{
        if(reason==='clickaway'){
            return;
        }
        setAlert({open:false});
    };
  return (
    <Snackbar
        autoHideDuration={3000}
        open={alert.open}        
        onClose={handleClose}
        
    >
        <MuiAlert
            onClose={handleClose}
            elevation={10}
            variant="filled"
            severity={alert.type}
        >
            {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}

export default Alert