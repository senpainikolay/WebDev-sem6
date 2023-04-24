
export const Home = () => { 
  
    return (
        <div className="flex flex-column justify-center items-center vh-100">
        <h1 className="f1 mb4">Welcome to Quizzes App</h1>
        <p className="f3 mb4">Test your knowledge with our quizzes</p> 
        <a href="/quizzes" className="f6 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
        View Quizezz
        </a>
      </div>
    );
}
