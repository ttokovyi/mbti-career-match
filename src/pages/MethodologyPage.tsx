import sources from "../data/sources.json";
import rules from "../data/mbtiCareerRules.json";
import type { Source } from "../types";

export function MethodologyPage() {
  const typedSources = sources as Source[];

  return (
    <section className="card">
      <h2>Methodology</h2>
      <p>
        Version <strong>{rules.version}</strong> uses transparent expert rules to map MBTI patterns to
        career tags. This is intended for exploration and should be combined with interests,
        performance, and advisor guidance.
      </p>
      <h3>Source register (v1 placeholders)</h3>
      <ul>
        {typedSources.map((source) => (
          <li key={source.id}>
            <strong>{source.title}</strong>: {source.note}
          </li>
        ))}
      </ul>
    </section>
  );
}
