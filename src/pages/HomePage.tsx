import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="card">
      <h2>Find careers that fit your style</h2>
      <p>
        This tool helps final-year students explore career directions using MBTI-style preferences.
        It is a guide, not a final decision maker.
      </p>
      <Link className="button" to="/quiz">
        Start the quiz
      </Link>
    </section>
  );
}
