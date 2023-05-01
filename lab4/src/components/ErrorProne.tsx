interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}
export const ErrorProne = (props:ErrorPopupProps) => {   
  return (
    <div className="fixed top-0 left-0 w-100 h-100 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white w-20 pa5  shadow-3">
        <button className="fr  bg-transparent bn f1 black pointer grow " onClick={props.onClose}>×</button>
        <p className="mv0  f2  red">{props.message}</p>
      </div>
    </div>
  );
}

export default ErrorProne;