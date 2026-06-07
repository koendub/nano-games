import { CrownIcon, TimerIcon } from "lucide-react";
import { useState } from "react";

import { Slider } from '@base-ui/react/slider'; 
import type { HalfAMinuteConfig } from "../hamModels";
import { useHamWordSets } from "../hamLogicHooks";
import CreateTeams from "../../shared/CreateTeams";
import HalfAMinuteSets from "./HalfAMinuteSets";
import { Button } from "@base-ui/react/button";
import { Card } from "../../../components/Card";


interface HalfAMinuteSetupProps {
  initialConfig: HalfAMinuteConfig;
  startGame: (config: HalfAMinuteConfig) => void;
}

export default function HalfAMinuteSetup({ initialConfig, startGame }: HalfAMinuteSetupProps) {
  const [config, setConfig] = useState(initialConfig);
  const availableWordSets = useHamWordSets();
  
  return (
    <div className="flex flex-col gap-4 pb-8 p-1">

      <h1 className="px-2 pt-4">
        Half a minute: setup
      </h1>
      <Card className="flex flex-col gap-4 py-4 px-8 w-full">
        <div className="flex flex-col gap-2">
          <label>
            <TimerIcon className="inline mr-2 pb-1 w-6 h-6" />
            Turn duration: {config.turnDuration} seconds
          </label>
          <Slider.Root
            className="w-full"
            value={config.turnDuration}
            onValueChange={(vs) => setConfig(prev => ({ ...prev, turnDuration: vs }))}
            min={10} max={90} step={5}
          >
            <Slider.Control className="flex w-full touch-none items-center py-3 select-none">
              <Slider.Track className="h-1 w-full select-none bg-neutral-200 dark:bg-neutral-800">
                <Slider.Indicator className="bg-primary select-none" />
                <Slider.Thumb className="size-4 rounded-full border border-neutral-950 bg-white select-none dark:border-white dark:bg-neutral-950" />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
        <div className="flex flex-col gap-2">
          <label>
            <CrownIcon className="inline mr-2 pb-1 w-6 h-6" />
            Points to win: {config.untilPoints}
          </label>
          <Slider.Root
            className="w-full"
            value={config.untilPoints}
            onValueChange={(vs) => setConfig(prev => ({ ...prev, untilPoints: vs }))}
            min={5} max={60} step={5}
          >
            <Slider.Control className="flex w-full touch-none items-center py-3 select-none">
              <Slider.Track className="h-1 w-full select-none bg-neutral-200 dark:bg-neutral-800">
                <Slider.Indicator className="bg-primary select-none" />
                <Slider.Thumb className="size-4 rounded-full border border-neutral-950 bg-white select-none dark:border-white dark:bg-neutral-950" />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
        
      </Card>

      <div className="flex flex-col gap-2">
        <CreateTeams
          teams={config.teams}
          setTeams={(t) => setConfig(prev => ({ ...prev, teams: typeof t === 'function' ? t(prev.teams) : t }))}
        />
      </div>

      <h1 className="px-2 pt-4">
        Word sets
      </h1>
      <HalfAMinuteSets
        wordSets={config.wordSets}
        setWordSets={(w) => setConfig(prev => ({ ...prev, wordSets: w }))}
        availableWordSets={availableWordSets}
      />

      <div className="w-full flex items-center justify-center mt-6">
        {config.wordSets.length === 0 ? (
          <div className="font-bold mt-2 pt-1 pb-2">Select at least 1 word set to play</div>
        ) : (
          <Button onClick={() => startGame(config)} className="button text-xl font-bold bg-blue-300">Start Game!</Button>
        )}
      </div>
    </div>
  )
}