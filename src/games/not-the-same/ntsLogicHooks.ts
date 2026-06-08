import { useCallback } from "react";
import { arrayRandomUniqueIterator } from "../shared/utils";
import type { NotTheSameConfig, QuestionSetData } from "./ntsModels";
import { commonKnowledgeQuestionSet } from "./questions/questions_common_knowledge";


export function useNtsQuestionSets(): QuestionSetData[] {
  return [
    commonKnowledgeQuestionSet
  ];
}

export function getNtsDefaultConfig(): NotTheSameConfig {
  return {
    players: ["Player 1", "Player 2", "Player 3"],
    questionSets: [useNtsQuestionSets()[0].name]
  } as NotTheSameConfig;
}

export function useNtsGetQuestion(config: NotTheSameConfig) {
  // Return a function that retrieves a single question deterministically via iterator
  return useCallback(() => {
    const usingSets = useNtsQuestionSets().filter((set) => config.questionSets.includes(set.name));
    const set = usingSets[0] || useNtsQuestionSets()[0];
    // arrayRandomUniqueIterator returns an array; request 1
    return arrayRandomUniqueIterator(set.name, set.questions, 1)[0];
  }, [config.questionSets]);
}
