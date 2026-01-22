export default function QuizCard(props) {

    // mettre la logique du quiz pour cocher la bonne réponse, pour savoir quelle est la bonne réponse vous  props.answerIndex 

  return (
    <article>
      <h1 className="text-balance text-base font-semibold text-slate-900">{props.title}</h1>
      <ul>
        {props.choices.map((choice, i) => (
          <li key={i}>{choice}</li>
        ))}
      </ul>
    </article>
  );
}
