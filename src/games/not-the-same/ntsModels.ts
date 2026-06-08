
export interface QuestionSet extends QuestionSetData {
  id: string;
  editable: boolean;
  downloaded: boolean;
}

export interface QuestionSetData {
  name: string;
  category: string;
  description: string;
  language: "en" | "nl";
  questions: string[];
}

export interface NotTheSameRoundState {
  question: string;
  playersStillIn: string[];
}

export interface NotTheSameGameState {
  config: NotTheSameConfig;
  pastRounds: NotTheSameRoundState[];
  currentRound: NotTheSameRoundState;
}

export interface NotTheSameConfig {
  players: string[];
  questionSets: string[];
}

export const notTheSameCatchPhrase = "Answer questions, but don't give the same answer as the others (3+ players)";

export const notTheSameExplaination = `
In Not The Same, the group will be asked a question. Everybody answers, but if you give the same answer as someone else, repeat an answer or answer wrong, you are out for that question. Win by being the last one left in as many rounds as possible. This game is for 3 or more players.
`;
