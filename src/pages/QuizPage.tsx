import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mbtiQuestions, inferMbtiType, scoreResponses } from "../lib/mbti";

const RESPONSE_SCALE = [1, 2, 3, 4, 5];

export function QuizPage() {
  const navigate = useNavigate();
  const initial = useMemo(
    () =>
      mbtiQuestions.reduce(
        (acc, question) => ({ ...acc, [question.id]: 3 }),
        {} as Record<string, number>
      ),
    []
  );
  const [responses, setResponses] = useState<Record<string, number>>(initial);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const axisScores = scoreResponses(responses);
    const mbtiType = inferMbtiType(axisScores);

    localStorage.setItem(
      "mbtiCareerResult",
      JSON.stringify({
        responses,
        axisScores,
        mbtiType
      })
    );
    navigate("/results");
  }

  return (
    <section className="card">
      <h2>MBTI-style quiz</h2>
      <p>Rate each statement from 1 (strongly disagree) to 5 (strongly agree).</p>
      <form onSubmit={handleSubmit} className="quiz-form">
        {mbtiQuestions.map((question) => (
          <label key={question.id} className="question">
            <span>{question.prompt}</span>
            <select
              value={responses[question.id]}
              onChange={(event) =>
                setResponses((prev) => ({
                  ...prev,
                  [question.id]: Number(event.target.value)
                }))
              }
            >
              {RESPONSE_SCALE.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button className="button" type="submit">
          See career matches
        </button>
      </form>
    </section>
  );
}
