import { useCallback, useState } from "react";
import type { HalfAMinuteConfig, HalfAMinuteState } from "./hamModels";
import { appWordSets, localDataToWordSet } from "../../assets/wordSets/wordSets";
import { arrayRandomUniqueIterator } from "../shared/utils";
import type { WordSet, WordSetData } from "../../assets/wordSets/wordSetModels";


export function getHamWordSets() {
  let localStoredSets = Object.keys(localStorage)
    .filter((key)=> key.startsWith("wordset-"))
    .map((key)=> JSON.parse(localStorage[key]) as WordSetData)
    .map(localDataToWordSet);
  return [...appWordSets, ...localStoredSets];
}

export function storeNewWordSet(newSet: WordSetData): WordSet {
  const asSet = localDataToWordSet(newSet);
  asSet.editable = true;
  localStorage.setItem(`wordset-${asSet.id}`, JSON.stringify(newSet));
  return asSet;
}

function getHamWords(config: HalfAMinuteConfig) {
  const usingSets = getHamWordSets().filter((set) => config.wordSets.includes(set.id));
  const set = usingSets[0]
  return arrayRandomUniqueIterator(set.id, set.words, 5);
}

export function getHamDefaultConfig() {
  // Initial config when starting up the game
  return {
    teams: [
      { name: "Team A", playerNames: [ "Player 1", "Player 2" ] },
      { name: "Team B", playerNames: [ "Player 3", "Player 4" ] }
    ],
    turnDuration: 30,
    untilPoints: 20,
    wordSets: []
  } as HalfAMinuteConfig;
}

export function useHamGameState(config: HalfAMinuteConfig) {
  // Create initial game state
  const [gameState, setGameState] = useState<HalfAMinuteState>({
    config,
    pastTurns: [],
    currentTurn: {
      team: Math.floor(Math.random() * config.teams.length),
      player: 0,
      words: Object.fromEntries(getHamWords(config).map(w => [w, false]))
    },
    turnPhase: "give phone"
  })

  // Callbacks to use for game progression
  const onTurnStart = useCallback(() => {
    setGameState(gs => ({ ...gs, turnPhase: "playing" }));
  }, []);

  const onTurnEnd = useCallback((guessedWords: { [word: string]: boolean }) => {
    // FUTURE: store the turn results in a database somewhere
    setGameState(gs => {
      gs.currentTurn.words = guessedWords;
      const pastTurns = [...gs.pastTurns, gs.currentTurn];
      const nextTeamIdx = (gs.currentTurn.team + 1) % config.teams.length;
      const nextTeamTurnIndex = Math.floor(pastTurns.length / config.teams.length);
      const currentTurn = {
        team: nextTeamIdx,
        player: nextTeamTurnIndex % config.teams[nextTeamIdx].playerNames.length,
        words: Object.fromEntries(getHamWords(config).map(w => [w, false]))
      }
      return {
        ...gs,
        pastTurns,
        currentTurn,
        turnPhase: "give phone"
      };
    })
  }, []);

  return { gameState, onTurnStart, onTurnEnd };
}
