import { useState } from "react";

export default function QuizCard(props) {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(true);

  // mettre la logique du quiz pour cocher la bonne réponse, pour savoir quelle est la bonne réponse vous  props.answerIndex

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected === null) return;
  
    if (selected == props.answerIndex) {
      setMessage("Bonne réponse");
    } else {
       setMessage("Mauvaise réponse");
    }

    setSelected(null);
    setActive(false);
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
                {choice}
                <input
                  type="radio"
                  checked={i == selected}
                  onChange={() => setSelected(i)}
                />
              </label>
            </li>
          ))}
        </ul>
        <button className="button-link" disabled={!active}  >
          Répondre
        </button>
      </form>
    </article>
  );
}
