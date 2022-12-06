import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles=makeStyles(()=>({
  selectbutton: {
    border: "1px solid #97CFD5",
    borderRadius: 5,
    padding: 10,
    textAlign:"center",
    fontFamily: "Montserrat",
    cursor: "pointer",
    width: "22%",    
  },
}));

const SelectButton = ({children,selected,onClick}) => {
  
  
  const classes=useStyles();
  return (
    <span 
    onClick={onClick} 
    style={{
      backgroundColor: selected ? "#97CFD5" : "",
      color: selected ? "black" : "",
      fontWeight: selected?700:500,
      "&:hover": {
      backgroundColor: "#35b6e6",
      color: "black",      
    }, 

    }}   
    className={classes.selectbutton}>{children}</span>
  )
}

export default SelectButton
