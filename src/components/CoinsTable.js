import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell,Typography, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


const useStyles=makeStyles(()=>({
    row:{
        backgroundColor:"#16171a",
        cursor:"pointer",
        "&:hover":{
            backgroundColor:"#090505",
        },
        fontFamily:"Montserrat",
    },
    pagination:{
        "&.MuiPaginationItem-root":{
            color:"#97CFD5",
        },
    },
}));

const CoinsTable = () => {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate=useNavigate();
// eslint-disable-next-line react-hooks/exhaustive-deps
    const{currency,symbol,coins,loading,fetchCoins}=CryptoState();

    

    // console.log(coins);f
    useEffect(()=>{
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency]);

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });

    const handleSearch=()=>{
        return coins.filter(
            (coin)=>
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search) 
        );
    };

    const classes=useStyles();

    // if(Math.random()>0.5){
    //     return new Error("Text Error Boundary");
    // }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
            <Typography
            variant="h4"
            style={{margin:18,fontFamily:"Montserrat"}}>
                Cryptocurrency Prices according to Market Cap
            </Typography>
            <TextField
                label="Search For a Crypto Currency..."
                variant="outlined"
                style={{marginBottom:20,width:"100%"}}
                onChange={(e)=>setSearch(e.target.value)}
            />
                <TableContainer>
                    {loading ? (
                    <LinearProgress style={{backgroundColor:"#97CFD5"}}/>
                    ):(
                        <Table aria-label="simple table">
                            <TableHead style={{backgroundColor:"#97CFD5"}}>
                                <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                                    const profit=row.price_change_percentage_24h>0
                                    return(
                                        <TableRow
                                        onClick={()=>navigate(`/coins/${row.id}`)}
                                        className={classes.row}
                                        key={row.name}
                                        >
                                            <TableCell
                                            component="th"
                                            scope="row"
                                            style={{display:"flex",
                                        gap:15}}
                                            >

                            
                                                <img
                                                    src={row.image}
                                                    alt={row.name}
                                                    height="50"
                                                    style={{marginBottom:10}}
                                                
                                                />
                                                <div
                                                style={{display:"flex",flexDirection:"column"}}
                                                >
                                                    <span style={{
                                                            textTransform:"uppercase",
                                                            fontSize:22,
                                                        }}
                                                    >
                                                        {row.symbol}
                                                    </span> 
                                                    <span style={{color:"darkgray"}}>{row.name}</span>                                  
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell
                                            align="right"
                                            style={{
                                                color:profit > 0 ? "rgb(14,203,129)":"red",
                                                fontWeight:500,
                                            }}
                                            >
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%

                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(
                                                    row.market_cap.toString().slice(0,-6)
                                                )}
                                                M
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Pagination
                count={(handleSearch().length / 10).toFixed(0)}
                    style={{
                        padding:20,
                        width:"100%",
                        display:"flex",
                        justifyContent:"center"
                    }}
                    classes={{ ul: classes.pagination }}
                        onChange={(_, value) => {
                        setPage(value)
                        window.scroll(0, 450)
                    }}
                />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable