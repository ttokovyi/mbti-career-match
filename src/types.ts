export type MbtiAxis = "EI" | "SN" | "TF" | "JP";

export type MbtiPole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface MbtiQuestion {
  id: string;
  prompt: string;
  axis: MbtiAxis;
  positivePole: MbtiPole;
  weight: number;
}

export interface AxisScore {
  positivePole: MbtiPole;
  negativePole: MbtiPole;
  score: number;
}

export type MbtiType = `${"E" | "I"}${"S" | "N"}${"T" | "F"}${"J" | "P"}`;

export interface Career {
  id: string;
  name: string;
  summary: string;
  tags: string[];
  pathwayNotes: string;
}

export interface RuleSet {
  version: string;
  typeWeights: Record<string, Record<string, number>>;
  axisTagBoosts: Record<MbtiAxis, Record<string, number>>;
}

export interface Source {
  id: string;
  title: string;
  type: "book" | "paper" | "framework";
  note: string;
  url?: string;
}

export interface Recommendation {
  career: Career;
  score: number;
  fitBand: "high" | "medium" | "explore";
  reasons: string[];
}
