import { Drama, FlaskConical, MessageCircleQuestion, PencilLineIcon, PersonStanding } from "lucide-react";
import { createElement, type Dispatch, useCallback, useEffect, useState } from "react";
import { getHamWordSets, storeNewWordSet } from "../hamLogicHooks";
import { type WordSet, type WordSetData } from "../../../assets/wordSets/wordSetModels";
import { Card } from "../../../components/ui/Card";
import { Button } from "@base-ui/react/button";


interface HalfAMinuteSetsProps {
  selectedWordSets: string[];
  setSelectedWordSets: Dispatch<string[]>;
}

const setCategoryIcons: Record<string, typeof Drama> = {
  "general": MessageCircleQuestion,
  "sciences": FlaskConical,
  "entertainment": Drama,
  "people": PersonStanding,
}

export default function HalfAMinuteSets({ selectedWordSets: wordSets, setSelectedWordSets: setWordSets }: HalfAMinuteSetsProps) {
  const [availableWordSets, setAvailableWordSets] = useState(getHamWordSets());
  const [editingSet, setEditingSet] = useState<WordSetData | undefined>(undefined);

  const toggleWordSet = useCallback((setId: string) => {
    const newSets = wordSets.includes(setId) ? wordSets.filter(id => id !== setId) : [...wordSets, setId];
    setWordSets(newSets);
  }, [wordSets, setWordSets]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {availableWordSets.map((set) => (
        <label key={set.id} className={"flex items-center justify-between gap-2 rounded-md shadow-2xl cursor-pointer " + (wordSets.includes(set.id) ? "bg-green-200" : "bg-gray-100")}>
          <input
            type="checkbox"
            checked={wordSets.includes(set.id)}
            onChange={() => { toggleWordSet(set.id); }}
            className="w-4 h-4 hidden"
          />
          <div className="flex items-center gap-2">
            <div className="mr-1 p-3">
              {createElement(setCategoryIcons[set.category], { size: 20 })}
            </div>
            {set.name}
          </div>
          {set.editable && (
            <button
              className="py-3 px-4 hover:bg-blue-300 cursor-pointer rounded-md mr-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditingSet({
                  name: set.name,
                  description: set.description,
                  category: set.category,
                  language: set.language,
                  words: set.words
                });
              }}>
              <PencilLineIcon size={16} className="ml-auto" />
            </button>
          )}
        </label>
      ))}
      <div className="flex flex-col mt-2 w-full">
        <CreateNewSetForm editingSet={editingSet} setEditingSet={setEditingSet} onSetSave={(newSet) => { setAvailableWordSets(prev => [...prev, newSet]); }} />
      </div>
    </div>
  )
}

interface CreateNewSetFormProps {
  editingSet: WordSetData | undefined;
  setEditingSet: Dispatch<WordSetData | undefined>;
  onSetSave: (newSet: WordSet) => void;
}

function CreateNewSetForm({ editingSet, setEditingSet, onSetSave }: CreateNewSetFormProps) {
  const [placeholderCount, setPlaceholderCount] = useState(Math.floor(Math.random() * 10));

  useEffect(() => {
    setTimeout(() => {
      setPlaceholderCount(placeholderCount + 1);
    }, 2000);
  }, [placeholderCount]);

  const getPlaceholderValue = (key: number, values: string[]) => {
    const idx = Math.floor((placeholderCount + key) / 3);
    return values[idx % values.length];
  };

  return (
    !editingSet ? (
      <Button onClick={() => {
        setEditingSet({
          name: "",
          description: "",
          category: "general",
          language: "en",
          words: []
        })
      }} className="button italic flex-1 bg-blue-300 mx-auto">
        Create New Set
      </Button>
    ) : (
      <Card className="flex px-2">
        <h2 className="text-xl mb-4 mx-auto">Create New Word Set</h2>
        <div>
          <label htmlFor="setName" className="block text-sm font-medium text-gray-700 pl-2">
            Set Name:
          </label>
          <input
            id="setName"
            type="text"
            placeholder={getPlaceholderValue(0, ["Friend names", "Fruits", "Inside jokes", "Animals"])}
            value={editingSet.name}
            onChange={(e) => setEditingSet({...editingSet, name: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="setDescription" className="block text-sm font-medium text-gray-700 pl-2">
            Set Description:
          </label>
          <input
            id="setDescription"
            type="text"
            placeholder={getPlaceholderValue(1, ["A word set with names of people we know", "A set of words related to technology", "A collection of fun and interesting stats"])}
            value={editingSet.description}
            onChange={(e) => setEditingSet({...editingSet, description: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="setDescription" className="block text-sm font-medium text-gray-700 px-2">
            Category:
          </label>
          <select
            value={editingSet.category}
            onChange={(e) => setEditingSet({...editingSet, category: e.target.value as any})}
            className="w-full p-2 border rounded"
          >
            <option value="general">General</option>
            <option value="sciences">Sciences</option>
            <option value="entertainment">Entertainment</option>
            <option value="people">People</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="setDescription" className="block text-sm font-medium text-gray-700 px-2">
            Language:
          </label>
          <select
            value={editingSet.language}
            onChange={(e) => setEditingSet({...editingSet, language: e.target.value as any})}
            className="w-full p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="nl">Dutch</option>
          </select>
        </div>
        <div>
          <label htmlFor="setWords" className="block text-sm font-medium text-gray-700 pl-2">
            Words (comma-separated):
          </label>
          <input
            id="setWords"
            type="text"
            placeholder={getPlaceholderValue(2, ["Blue, Green, Red, Yellow, Purple", "Dog, Cat, Mouse, Elephant, Lion", "Apple, Banana, Orange, Grape, Mango"])}
            value={Array.isArray(editingSet.words) ? editingSet.words.join(", ") : editingSet.words}
            onChange={(e) => setEditingSet({...editingSet, words: e.target.value as any})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => setEditingSet(undefined)}
            className="button italic flex-1 bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              const splitWords = Array.isArray(editingSet.words)
                ? editingSet.words
                : (editingSet.words as unknown as string).split(",").map(w => w.trim()).filter(w => w.length > 0)
              const newSet = storeNewWordSet({ ...editingSet, words: splitWords });
              onSetSave(newSet);
              setEditingSet(undefined);
            }}
            className="button italic flex-1 bg-green-300"
          >
            Create
          </Button>
        </div>
      </Card>
    )
  )
}
