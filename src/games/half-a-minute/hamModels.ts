import type { Team } from "../shared/CreateTeams";


export interface HalfAMinuteConfig {
  teams: Team[];
  turnDuration: number;
  untilPoints: number;
  wordSets: string[];
}

export interface HalfAMinuteTurn {
  team: number;
  player: number;
  words: { [word: string]: boolean }
}

export interface HalfAMinuteState {
  config: HalfAMinuteConfig;
  pastTurns: HalfAMinuteTurn[];
  currentTurn: HalfAMinuteTurn;
  turnPhase: "give phone" | "playing" | "finishing";
}
