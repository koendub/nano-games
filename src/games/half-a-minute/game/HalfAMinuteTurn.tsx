import { useCallback, useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { HalfAMinuteConfig } from "../hamModels";
import { Button } from "@base-ui/react/button";
import CountDownTimer from "../../shared/CountDownTimer";
import { CardContent, CardHeader, CardTitle } from "../../../components/Card";


interface HalfAMinuteTurn {
  config: HalfAMinuteConfig;
  words: string[];
  onTurnEnd: (guessed: Record<string, boolean>) => void;
}

export default function HalfAMinuteTurn({ config, words, onTurnEnd }: HalfAMinuteTurn) {
  if (words.length === 0) throw new Error("No words provided for Half A Minute turn");

  const [guessedWords, setGuessedWords] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setGuessedWords(Object.fromEntries(words.map(word => [word, false])));
  }, [words]);

  const onTimeUp = useCallback(() => {
    setFinished(true);
  }, []);

  const toggleGuessedWord = useCallback((word: string) => {
    const newGuessedWords = { ...guessedWords };
    newGuessedWords[word] = !newGuessedWords[word];
    setGuessedWords(newGuessedWords);
  }, [guessedWords]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl text-center">
          {finished ? "Which words did you get?" : "Describe the words!"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-center flex-col w-full">
        <div className="flex flex-col pl-8 pr-2 mb-2 w-full">
          {words.map((word) => (
            <button
              key={word}
              className="flex gap-2 w-full py-3 text-xl"
              onClick={() => toggleGuessedWord(word)}
            >
              <div
                className={
                  "rounded-full w-6 h-6 mt-0.5 border-2 flex overflow-visible transition-opacity duration-500 " +
                  (finished ? "opacity-100 " : "opacity-0 ") +
                  (guessedWords[word] ? "border-green-500" : "border-gray-600")
                }
              >
                {guessedWords[word] ? <Check className="pb-0.5 stroke-green-500" /> : ""}
              </div>
              {word}
            </button>
          ))}
        </div>
      </CardContent>
      {finished ? (
        <Button className="button bg-blue-300 w-full" onClick={() => onTurnEnd(guessedWords)}>
          Finish turn
        </Button>
      ) : (
        <CountDownTimer duration={config.turnDuration} onEnd={onTimeUp} />
      )}
    </>
  )
}