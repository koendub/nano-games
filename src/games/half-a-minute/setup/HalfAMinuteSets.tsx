import { Drama, FlaskConical, MessageCircleQuestion, PersonStanding } from "lucide-react";
import { createElement, type Dispatch, useCallback } from "react";
import type { WordSet } from "../../../assets/wordSets/wordSetModels";


interface HalfAMinuteSetsProps {
  wordSets: string[];
  setWordSets: Dispatch<string[]>;
  availableWordSets: WordSet[];
}

const setCategoryIcons: Record<string, typeof Drama> = {
  "general": MessageCircleQuestion,
  "sciences": FlaskConical,
  "entertainment": Drama,
  "people": PersonStanding,
}

export default function HalfAMinuteSets({ wordSets, setWordSets, availableWordSets }: HalfAMinuteSetsProps) {
  const toggleWordSet = useCallback((setId: string) => {
    const newSets = wordSets.includes(setId) ? wordSets.filter(id => id !== setId) : [...wordSets, setId];
    setWordSets(newSets);
  }, [wordSets, setWordSets]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {availableWordSets.map((set) => (
        <label key={set.id} className="flex items-center gap-2 rounded-md bg-white shadow-2xl cursor-pointer">
          <input
            type="checkbox"
            checked={wordSets.includes(set.id)}
            onChange={() => { toggleWordSet(set.id); }}
            className="w-4 h-4 hidden"
          />
          <div className={"mr-1 p-2 rounded-l-md " + (wordSets.includes(set.id) ? "bg-green-200" : "text-gray-500")}>
            {createElement(setCategoryIcons[set.category], { size: 20 })}
          </div>
          {set.name}
        </label>
      ))}
    </div>
  )
}