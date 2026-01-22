import { useState } from "react";

export default function QuizCard(props) {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected === null || !active) return;

    if (selected === props.answerIndex) {
      setMessage("Bonne réponse");
    } else {
      setMessage("Mauvaise réponse");
    }

    setActive(false); // verrouille définitivement le quiz
  };

  return (
    <article className="quiz">
      <form onSubmit={handleSubmit}>
        <h1 className="text-balance text-base font-semibold text-slate-900">
          {props.title}
        </h1>

        {message && <p>{message}</p>}

        <ul>
          {props.choices.map((choice, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name="quiz"
                  checked={i === selected}
                  onChange={() => setSelected(i)}
                  disabled={!active}
                />
                {choice}
              </label>
            </li>
          ))}
        </ul>

        <button className="button-link" disabled={!active}>
          Répondre
        </button>
      </form>
    </article>
  );
}
