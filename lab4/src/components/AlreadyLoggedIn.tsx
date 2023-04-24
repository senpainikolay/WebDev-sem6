import { Link } from 'react-router-dom'


export const AlreadyLoggedIn = () => {   
    return (
<div className="flex  justify-center items-center vh-100 h-100">
  <div className="pa5 br5 shadow-5">
    <h1 className="f3 mb3">Already Logged In</h1>
    <p className="f5">You can continue using the app.</p>
    <div className="mt3">
      <Link  to="/"  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer black f6 dib">
        Home
      </Link>
      <Link  to="/logout" className="ml3 b ph3 pv2 input-reset ba b--black bg-transparent black grow pointer f6 dib">
        Logout
      </Link >
    </div>
  </div>
</div>
    );
}
