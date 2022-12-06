import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';


const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner1.jpeg)",
        
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
    },
}));

const Banner = () => {
    const classess=useStyles();
  return(
    <div className={classess.banner}>
        <Container className={classess.bannerContent}>
            <div className={classess.tagline}>
                <Typography
                variant='h2'
                style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:"Montserrat",
                }}
                >
                    Crypto Maker
                </Typography>
                <Typography
                variant='subtitle2'
                style={{
                    color:"#F8F0E3",
                    textTransform:"capitalize",
                    fontFamily:"Montserrat",
                }}
                >
                    Get all the Information regarding your favorite Crypto Currency
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  );
};

export default Banner;