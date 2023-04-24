import React from 'react';
import './App.css';  
import {Routes, Route} from 'react-router-dom' 
import {SignInAccount} from './pages/SignIn' 
import {Home} from './pages/Home' 
import {RequireAuth} from './components/RequireAuth' 
import {RequireNoAuth} from './components/RequireNoAuth' 
import 'tachyons'


function App() {
  return ( 
    <Routes>
      <Route element={<RequireNoAuth />}>
          <Route path="/SignIn" element={<SignInAccount></SignInAccount>} />
      </Route>
      <Route element={<RequireAuth />}>
          <Route path="/" element={<Home></Home>} />
      </Route>
    </Routes> 
  ); 
}

export default App;
