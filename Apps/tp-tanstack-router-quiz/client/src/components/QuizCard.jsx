export default function QuizCard(props) {
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
