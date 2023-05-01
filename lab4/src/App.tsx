import './App.css';  
import {Routes, Route} from 'react-router-dom' 
import {SignInAccount} from './pages/SignIn'  
import {SignUpAccount} from './pages/SignUp' 
import {Home} from './pages/Home' 
import {RequireAuth} from './components/RequireAuth' 
import {RequireNoAuth} from './components/RequireNoAuth' 
import 'tachyons'
import { Quizzes } from './pages/Quizzes';


function App() {
  return ( 
    <Routes>
      <Route element={<RequireNoAuth />}>
          <Route path="/SignIn" element={<SignInAccount></SignInAccount>} /> 
          <Route path="/SignUp" element={<SignUpAccount></SignUpAccount>} />

      </Route>
      <Route element={<RequireAuth />}> 
         <Route path="/quizzes" element={<Quizzes />} />
         <Route path="/" element={<Home></Home>} />
      </Route>
    </Routes> 
  ); 
}

export default App;
