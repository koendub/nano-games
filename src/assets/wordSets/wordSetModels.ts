
export interface WordSet extends WordSetData {
  id: string;
  editable: boolean;
  downloaded: boolean;
}

export interface WordSetData {
  name: string;
  category: string;
  description: string;
  language: "en" | "nl";
  words: string[];
}

