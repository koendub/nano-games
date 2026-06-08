import CreateTeams from "../../components/CreateTeams";
import { Button } from "@base-ui/react/button";
import { Card } from "../../components/ui/Card";
import { useState } from "react";
import type { NotTheSameConfig } from "./ntsModels";
import { useNtsQuestionSets } from "./ntsLogicHooks";

interface NotTheSameSetupProps {
  initialConfig: NotTheSameConfig;
  startGame: (config: NotTheSameConfig) => void;
}

export function NotTheSameSetup({ initialConfig, startGame }: NotTheSameSetupProps) {
  const [config, setConfig] = useState(initialConfig);
  const availableSets = useNtsQuestionSets();

  return (
    <div className="flex flex-col gap-4 pb-8 p-1">
      <h1 className="px-2 pt-4">Not The Same: setup</h1>

      <Card className="flex flex-col gap-4 py-4 px-8 w-full">
        <div>
          <CreateTeams
            teams={[{ name: "Players", playerNames: config.players }] as any}
            setTeams={(t) => setConfig(prev => ({ ...prev, players: (t as any).flatMap((tm: any) => tm.playerNames) }))}
            maxTeams={1}
          />
        </div>
      </Card>

      <h1 className="px-2 pt-4">Question sets</h1>
      <Card className="py-4 px-8 w-full">
        <div className="flex flex-col gap-2">
          {availableSets.map((s) => (
            <label key={s.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.questionSets.includes(s.name)}
                onChange={(e) => {
                  if (e.target.checked) setConfig(prev => ({ ...prev, questionSets: [...prev.questionSets, s.name] }));
                  else setConfig(prev => ({ ...prev, questionSets: prev.questionSets.filter(id => id !== s.name) }));
                }}
              />
              <div>
                <div className="font-bold">{s.name}</div>
                <div className="text-sm">{s.description}</div>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <div className="w-full flex items-center justify-center mt-6">
        {config.questionSets.length === 0 || config.players.length < 2 ? (
          <div className="font-bold mt-2 pt-1 pb-2">Add at least 2 players and select 1 question set</div>
        ) : (
          <Button onClick={() => startGame(config)} className="button text-xl font-bold bg-blue-300">Start Game!</Button>
        )}
      </div>
    </div>
  )
}
