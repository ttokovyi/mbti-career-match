import { Link, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";
import { ResultsPage } from "./pages/ResultsPage";
import { MethodologyPage } from "./pages/MethodologyPage";

export function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>MBTI Career Match</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/methodology">Methodology</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
