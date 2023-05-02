interface ScorePopupProps {
  score: number;  
  totalCount:number;
  onClose: () => void;
}
 const Score = (props:ScorePopupProps) => {    
  
  return (
    <div className="fixed top-0 left-0 w-100 h-100 flex justify-center items-center bg-black-50">
    <div className="bg-white br3 pa4 shadow-4 flex flex-column items-center">
      <h2 className="f3 fw6 mb3"> 
        { props.score < props.totalCount/2 ? 
                  "Try better next time :(" : 
                  "Congratulations!" }  
      </h2>
      <p className="f4 mb3 tc">You scored  {props.score} out of {props.totalCount} !</p>
      <button
        className="bg-black grow white bn br-pill pa3 fw6 f5 pointer"
        onClick={props.onClose}
      >
        OK
      </button>
    </div>
  </div>
  );
}

export default Score;