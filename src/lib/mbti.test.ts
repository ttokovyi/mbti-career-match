import { describe, expect, it } from "vitest";
import { inferMbtiType, scoreResponses } from "./mbti";

describe("mbti scoring", () => {
  it("infers ESTJ for strongly extroverted practical thinking and judging pattern", () => {
    const responses = {
      q1: 5,
      q2: 1,
      q3: 5,
      q4: 1,
      q5: 5,
      q6: 1,
      q7: 5,
      q8: 1,
      q9: 5,
      q10: 1,
      q11: 5,
      q12: 1,
      q13: 5,
      q14: 1,
      q15: 5,
      q16: 1
    };
    const axisScores = scoreResponses(responses);
    expect(inferMbtiType(axisScores)).toBe("ESTJ");
  });

  it("defaults unanswered items to neutral", () => {
    const axisScores = scoreResponses({});
    expect(axisScores.EI.score).toBe(0);
    expect(axisScores.SN.score).toBe(0);
    expect(axisScores.TF.score).toBe(0);
    expect(axisScores.JP.score).toBe(0);
  });
});
