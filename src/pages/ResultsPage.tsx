import { Link } from "react-router-dom";
import { buildRecommendations } from "../lib/recommend";
import type { AxisScore, MbtiAxis, MbtiType, Recommendation } from "../types";

interface StoredResult {
  mbtiType: MbtiType;
  axisScores: Record<MbtiAxis, AxisScore>;
}

function parseStoredResult(): StoredResult | null {
  const raw = localStorage.getItem("mbtiCareerResult");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredResult;
  } catch {
    return null;
  }
}

export function ResultsPage() {
  const result = parseStoredResult();
  const recommendations: Recommendation[] = result
    ? buildRecommendations(result.mbtiType, result.axisScores)
    : [];

  if (!result) {
    return (
      <section className="card">
        <h2>No results yet</h2>
        <p>Complete the quiz first to see your MBTI profile and career suggestions.</p>
        <Link className="button" to="/quiz">
          Go to quiz
        </Link>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Your profile: {result.mbtiType}</h2>
      <p>
        These recommendations are directional, not deterministic. Use them to explore options with
        teachers, counselors, and real-world experiences.
      </p>

      <div className="results-grid">
        {recommendations.map((item) => (
          <article key={item.career.id} className="career-card">
            <h3>{item.career.name}</h3>
            <p>{item.career.summary}</p>
            <p>
              <strong>Fit:</strong> {item.fitBand} ({item.score})
            </p>
            <ul>
              {item.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <p>
              <strong>Pathway notes:</strong> {item.career.pathwayNotes}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
