import type { Team } from "../../components/CreateTeams";


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

export const halfAMinuteCatchPhrase = "Describe as many words as possible to your team in 30 seconds";

export const halfAMinuteExplaination = `
In Half A Minute, each round has one player describing as many words as possible to their team within the 30 second time limit. Usually played in 2 teams, the first team to reach a certain amount of guess words wins.
`;
