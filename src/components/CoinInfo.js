import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { CryptoState } from "../CryptoContext";
import {HistoricalChart} from "../Config/api"
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import "chart.js/auto";
import { chartDays } from '../Config/data';
import SelectButton from './Banner/SelectButton';

const useStyles=makeStyles((theme)=>({
  container:{
    width:"75%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    marginTop:25,
    padding:40,
    [theme.breakpoints.down("md")]:{
      width:"100%",
      marginTop:0,
      padding:20,
      paddingTop:0,
    },
  }

}));

const CoinInfo = ({allData}) => {

  const [historicalData, setHistoricalData] = useState();
 // eslint-disable-next-line
  const [days,setDays] = useState(1);
  const {currency}=CryptoState();


  const fetchHistoricalData=async()=>{
    const {data}=await axios.get(HistoricalChart(allData.id,days,currency));

    setHistoricalData(data.prices);
  };
 
  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);
  // console.log("data",historicalData);

  const darkTheme=createTheme({
    palette:{
      primary:{
          main:"#fff",
      },
      type:"dark",
    },
  });
  
  const classes=useStyles();
  

  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
          {
              !historicalData ?( 
              <CircularProgress style={{color:"#97CFD5"}}
              size={250}
              thickness={1}
              />):
              (<>
                <Line
                  data={{
                    labels:historicalData.map((allData)=>{
                      let date=new Date(allData[0]);
                      let time=
                        date.getHours()>12
                        ? `${date.getHours()-12}:${date.getMinutes()} PM`
                        :`${date.getHours()}:${date.getMinutes()} AM`;

                      return days===1?time:date.toLocaleDateString();
                    }), 
                    datasets:[{
                      data:historicalData.map((allData)=>allData[1]),
                      label:`Price(Past ${days}Days) in ${currency}`,
                      borderColor:"#97CFD5",
                    },
                  ],
                  }}
                  options={{
                    elements:{
                      point:{
                        radius:1,
                      },
                    },
                  }}

                />
                <div 
                  style={{
                    display:"flex",
                    marginTop:20,
                    justifyContent:"space-around",
                    width:"100%",
                  }}
                >
                  {chartDays.map((day)=>(
                    <SelectButton
                    key={day.value}
                    onClick={()=>{setDays(day.value);
                      
                    }}
                    selected={day.value===days}
                    
                    >
                      {day.label}
                    </SelectButton>
                  ))}
                </div>
              </>)          
          } 
        </div>
    </ThemeProvider>
  )
}

export default CoinInfo

