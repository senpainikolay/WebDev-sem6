import { Link } from 'react-router-dom'
import { SESSION_TOKEN } from '../services/AuthorizedApi'; 

export const AlreadyLoggedIn = () => {    
    return (
<div className="flex  justify-center items-center vh-100 h-100">
  <div className="pa5 br5 shadow-5">
    <h1 className="f3 mb3">Already Logged In</h1>
    <div className="mt3">
      <Link  to="/"  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer black f6 dib">
        Home
      </Link>
      <button className="ml3 b ph3 pv2 input-reset ba b--black bg-transparent black grow pointer f6 dib" onClick={() =>{ window.sessionStorage.removeItem(SESSION_TOKEN); window.location.reload(); }} >
        Logout
      </button>
    </div>
  </div>
</div>
    );
}
