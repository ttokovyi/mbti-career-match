import careersData from "../data/careers.json";
import ruleData from "../data/mbtiCareerRules.json";
import type {
  MbtiAxis,
  MbtiPole,
  MbtiType,
  Recommendation,
  RuleSet,
  Career,
  AxisScore
} from "../types";

const careers = careersData as Career[];
export const rules = ruleData as RuleSet;

function normalizeAxisValue(axis: AxisScore): number {
  return Math.max(-1, Math.min(1, axis.score / 4));
}

function axisPreferredPole(axis: MbtiAxis, normalized: number): MbtiPole {
  if (axis === "EI") {
    return normalized >= 0 ? "E" : "I";
  }
  if (axis === "SN") {
    return normalized >= 0 ? "S" : "N";
  }
  if (axis === "TF") {
    return normalized >= 0 ? "T" : "F";
  }
  return normalized >= 0 ? "J" : "P";
}

function fitBand(score: number): "high" | "medium" | "explore" {
  if (score >= 4.5) return "high";
  if (score >= 2.5) return "medium";
  return "explore";
}

export function buildRecommendations(
  mbtiType: MbtiType,
  axisScores: Record<MbtiAxis, AxisScore>,
  limit = 6
): Recommendation[] {
  const typeMap = rules.typeWeights[mbtiType] ?? {};

  const recommendations = careers.map((career) => {
    let score = 0;
    const reasons: string[] = [];

    for (const tag of career.tags) {
      const base = typeMap[tag] ?? 0;
      if (base > 0) {
        score += base;
        reasons.push(`Your ${mbtiType} profile often aligns with ${tag} strengths.`);
      }
    }

    for (const axisName of Object.keys(axisScores) as MbtiAxis[]) {
      const axis = axisScores[axisName];
      const normalized = normalizeAxisValue(axis);
      const boosts = rules.axisTagBoosts[axisName] ?? {};

      for (const tag of career.tags) {
        const boost = boosts[tag] ?? 0;
        score += boost * normalized;
      }

      const preferredPole = axisPreferredPole(axisName, normalized);
      reasons.push(`On ${axisName}, you lean toward ${preferredPole}.`);
    }

    return {
      career,
      score: Number(score.toFixed(2)),
      fitBand: fitBand(score),
      reasons: Array.from(new Set(reasons)).slice(0, 3)
    };
  });

  return recommendations.sort((a, b) => b.score - a.score).slice(0, limit);
}
