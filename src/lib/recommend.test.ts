import { describe, expect, it } from "vitest";
import type { AxisScore, MbtiAxis, MbtiType } from "../types";
import { buildRecommendations } from "./recommend";

function mockAxisScores() {
  return {
    EI: { positivePole: "E", negativePole: "I", score: 3 },
    SN: { positivePole: "S", negativePole: "N", score: -2 },
    TF: { positivePole: "T", negativePole: "F", score: 1 },
    JP: { positivePole: "J", negativePole: "P", score: -1 }
  } satisfies Record<MbtiAxis, AxisScore>;
}

describe("recommendations", () => {
  it("returns ranked careers with explanations and fit bands", () => {
    const recs = buildRecommendations("ENTP" as MbtiType, mockAxisScores(), 5);
    expect(recs).toHaveLength(5);
    expect(recs[0].score).toBeGreaterThanOrEqual(recs[1].score);
    expect(recs[0].reasons.length).toBeGreaterThan(0);
    expect(["high", "medium", "explore"]).toContain(recs[0].fitBand);
  });
});
