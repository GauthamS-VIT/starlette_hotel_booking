import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes , Route,Link} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscrren from './screens/Bookingscrren';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import LandingScreen from './screens/LandingScreen';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <BrowserRouter>

      <Routes>

        <Route path="/home" Component= {Homescreen}></Route>
        <Route path="/book/:roomid/:fromdate/:todate" exact Component= {Bookingscrren}></Route>
        <Route path="/register" exact Component= {Registerscreen}></Route>
        <Route path="/login" exact Component= {Loginscreen}></Route>
        <Route path="/profile" exact Component= {Profilescreen}></Route>
        <Route path="/admin" exact Component= {Adminscreen}></Route>
        <Route path="/" exact Component= {LandingScreen}></Route>
    
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
