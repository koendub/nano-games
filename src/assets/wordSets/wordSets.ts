import { wordset1990sKids } from "./english/data_wordset_1990s_kids";
import { wordsetCompSci } from "./english/data_wordset_comp_sci";
import { wordsetEconomics } from "./english/data_wordset_economics";
import { wordsetMedicine } from "./english/data_wordset_medicine";
import { wordsetNouns } from "./english/data_wordset_nouns";
import type { WordSet } from "./wordSetModels";

const localWordSetData = [
  wordset1990sKids,
  wordsetCompSci,
  wordsetEconomics,
  wordsetMedicine,
  wordsetNouns
]

export const localWordSets = localWordSetData.map(wsd => ({
  id: wsd.name,
  downloaded: true,
  editable: false,
  ...wsd,
} as WordSet))
