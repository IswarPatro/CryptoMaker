import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { CoinList } from './Config/api';
import { auth, db } from './firebase';

const Crypto = createContext();
const CryptoContext = ({children}) => {

    const[currency,setCurrency]=useState("INR");
        const[symbol,setSymbol]=useState("₹");
        const [coins,setCoins]=useState([]);
        const [loading,setLoading]=useState(false);
        const [user, setUser] = useState(null);
        const [alert, setAlert] = useState({
         open:false,
         message:"",
         type:"success",
        });
        
        const [watchlist, setWatchlist] = useState([]);

        useEffect(()=>{
          if(user){
            const coinRef=doc(db,"watchlist",user.uid);
            var unsubscribe=onSnapshot(coinRef,coin=>{
              if(coin.exists()){
                console.log(coin.data().coins);
                setWatchlist(coin.data().coins);
              }
              else{
                console.log("No Items in Watchlist");
              }
            });
            return ()=>{
              unsubscribe();
            }
          }
          
        },[user]);

        useEffect(() => {
          onAuthStateChanged(auth,(user)=>{
            if(user)setUser(user);
            else setUser(null);

            console.log(user)
          })
        }, []);
        

        const fetchCoins=async()=>{
         setLoading(true);
         const {data} =await axios.get(CoinList(currency));
 
         setCoins(data);
         setLoading(false);
 
     };


        useEffect(()=>{
           if(currency==="INR") setSymbol("₹");
           else if(currency==="USD") setSymbol("$");
        },[currency]);

  return (<Crypto.Provider value={{
    currency,
    symbol,
    setCurrency,
    coins,
    loading,
    fetchCoins,
    alert,
    setAlert,
    user,
    watchlist,
    }}>
   {children}
   </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = ()=>{
   return useContext(Crypto);
}