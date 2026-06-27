import { wordset1990sKids } from "./english/data_wordset_1990s_kids";
import { wordsetCompSci } from "./english/data_wordset_comp_sci";
import { wordsetEconomics } from "./english/data_wordset_economics";
import { wordsetMedicine } from "./english/data_wordset_medicine";
import { wordsetNouns } from "./english/data_wordset_nouns";
import type { WordSet, WordSetData } from "./wordSetModels";

const localWordSetData = [
  wordset1990sKids,
  wordsetCompSci,
  wordsetEconomics,
  wordsetMedicine,
  wordsetNouns
]

export const localDataToWordSet = (data: WordSetData): WordSet => ({
  ...data,
  id: data.name.replace(/\s+/g, '-').toLowerCase(),
  downloaded: true,
  editable: false,
});

export const appWordSets = localWordSetData.map(localDataToWordSet);
