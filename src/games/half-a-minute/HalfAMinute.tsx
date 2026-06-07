import HalfAMinuteGame from "./game/HalfAMinuteGame";
import HalfAMinuteSetup from "./setup/HalfAMinuteSetup";
import { useState } from "react";
import { getHamDefaultConfig } from "./hamLogicHooks";


export default function HalfAMinute() {
  const [inConfig, setInConfig] = useState(true);
  const [config, setConfig] = useState(getHamDefaultConfig());
  
  return (
    <div className="flex-center flex-col w-full max-w-96 flex-1">
      {inConfig ? (
        <HalfAMinuteSetup initialConfig={config} startGame={(gameConfig) => {
          setConfig(gameConfig);
          setInConfig(false);
        }} />
      ) : (
        <HalfAMinuteGame config={config} onGameEnd={() => {
          setInConfig(true);
        }} />
      )}
    </div>
  )
}