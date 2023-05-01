
interface QuizCardProps {
  name: string; 
  numberOfQuestions: number; 
}

export const QuizCard = (props:QuizCardProps ) => {
  return (
    <div className="bg-transparent shadow-2 inline-flex pa4 ma5  flex-column grow pointer">
      <h2 className="f3 ">{props.name}</h2>
      <p className="f4 black">{`${props.numberOfQuestions} questions`}</p>
    </div>
  );
};

export default QuizCard; 