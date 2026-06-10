import { Drama, FlaskConical, MessageCircleQuestion, PersonStanding } from "lucide-react";
import { createElement, type Dispatch, useCallback, useState } from "react";
import { getHamWordSets, storeNewWordSet } from "../hamLogicHooks";
import { type WordSet, type WordSetData } from "../../../assets/wordSets/wordSetModels";
import { Card } from "../../../components/ui/Card";


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

  const toggleWordSet = useCallback((setId: string) => {
    const newSets = wordSets.includes(setId) ? wordSets.filter(id => id !== setId) : [...wordSets, setId];
    setWordSets(newSets);
  }, [wordSets, setWordSets]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {availableWordSets.map((set) => (
        <label key={set.id} className={"flex items-center gap-2 rounded-md shadow-2xl cursor-pointer " + (wordSets.includes(set.id) ? "bg-green-200" : "bg-gray-100")}>
          <input
            type="checkbox"
            checked={wordSets.includes(set.id)}
            onChange={() => { toggleWordSet(set.id); }}
            className="w-4 h-4 hidden"
          />
          <div className="mr-1 p-2">
            {createElement(setCategoryIcons[set.category], { size: 20 })}
          </div>
          {set.name}
        </label>
      ))}
      <CreateNewSetForm onNewSet={(newSet) => { setAvailableWordSets(prev => [...prev, newSet]); }} />
    </div>
  )
}

function CreateNewSetForm({ onNewSet }: { onNewSet: (newSet: WordSet) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newSetData, setNewSetData] = useState<WordSetData>({
    name: "",
    description: "",
    category: "general",
    language: "en",
    words: []
  });

  return (
    <div>
      <button onClick={() => setMenuOpen(!menuOpen)} className="px-4 py-2 bg-blue-500 text-white rounded-md">Create New Set</button>
      {menuOpen && (
        <Card className="flex items-center justify-center">
          <h2 className="text-xl mb-4">Create New Word Set</h2>
          <input
            type="text"              placeholder="Set Name"
            value={newSetData.name}
            onChange={(e) => setNewSetData({...newSetData, name: e.target.value})}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="text"              placeholder="Description"
            value={newSetData.description}
            onChange={(e) => setNewSetData({...newSetData, description: e.target.value})}
            className="w-full mb-3 p-2 border rounded"
          />
          <select
            value={newSetData.category}
            onChange={(e) => setNewSetData({...newSetData, category: e.target.value as any})}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="general">General</option>
            <option value="sciences">Sciences</option>
            <option value="entertainment">Entertainment</option>
            <option value="people">People</option>
          </select>
          <select
            value={newSetData.language}
            onChange={(e) => setNewSetData({...newSetData, language: e.target.value as any})}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="nl">Dutch</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const newSet = storeNewWordSet(newSetData)
                onNewSet(newSet);
                setMenuOpen(false);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </Card>
      )}
    </div>
  )
}
