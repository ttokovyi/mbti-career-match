import questionsData from "../data/mbtiQuestions.json";
import type { AxisScore, MbtiAxis, MbtiPole, MbtiQuestion, MbtiType } from "../types";

const AXIS_POLES: Record<MbtiAxis, [MbtiPole, MbtiPole]> = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"]
};

export const mbtiQuestions = questionsData as MbtiQuestion[];

export function initializeAxisTotals(): Record<MbtiAxis, number> {
  return { EI: 0, SN: 0, TF: 0, JP: 0 };
}

export function scoreResponses(responses: Record<string, number>): Record<MbtiAxis, AxisScore> {
  const totals = initializeAxisTotals();

  for (const question of mbtiQuestions) {
    const answer = responses[question.id] ?? 3;
    const signed = (answer - 3) * question.weight;
    const polarity = question.positivePole === AXIS_POLES[question.axis][0] ? 1 : -1;
    totals[question.axis] += signed * polarity;
  }

  return (Object.keys(AXIS_POLES) as MbtiAxis[]).reduce((acc, axis) => {
    const [positivePole, negativePole] = AXIS_POLES[axis];
    acc[axis] = { positivePole, negativePole, score: totals[axis] };
    return acc;
  }, {} as Record<MbtiAxis, AxisScore>);
}

export function inferMbtiType(axisScores: Record<MbtiAxis, AxisScore>): MbtiType {
  const ei = axisScores.EI.score >= 0 ? "E" : "I";
  const sn = axisScores.SN.score >= 0 ? "S" : "N";
  const tf = axisScores.TF.score >= 0 ? "T" : "F";
  const jp = axisScores.JP.score >= 0 ? "J" : "P";
  return `${ei}${sn}${tf}${jp}`;
}
