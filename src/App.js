import { makeStyles } from '@material-ui/core';
import React from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Alert from './components/Alert';


const Homepages=lazy(()=>import('./Pages/Homepages'));
const CoinPage=lazy(()=>import('./Pages/CoinPage'));

const useStyles=makeStyles({
  App:{
      backgroundColor:"#14161a",
      color:'white',
      minHeight:"100vh",
  },
});
function App() {
  const classes=useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header/>
      <Suspense fallback={ <div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepages/>} exact/>
          <Route path="/coins/:id" element={<CoinPage/>} exact/>
        </Routes>
      </Suspense>            
    </div>
    <Alert/>
    </BrowserRouter>
  )
}

export default App;
