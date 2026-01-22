import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // async await est une promesse en JS
    async function fetchData() {
      const res = await fetch("http://localhost:3001/api/questions");
      const questions = await res.json();

      setQuestions(questions);
    }
    fetchData();
  }, []); // sans state ici le useEffect sera exécuté qu'une seule fois au montage

  return (
    <section title="Liste des quiz">
        {questions.map(q => <QuizCard key={q.id} title={q.title} choices={q.choices} answerIndex={q.answerIndex}/> )}
    </section>
  )
}
