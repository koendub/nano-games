import HalfAMinuteTurn from "./HalfAMinuteTurn";
import HalfAMinuteFinished from "./HalfAMinuteFinished";
import type { HalfAMinuteConfig } from "../hamModels";
import { useHamGameState } from "../hamLogicHooks";
import { useMemo } from "react";
import { Button } from "@base-ui/react/button";
import { Card } from "../../../components/Card";

interface HalfAMinuteGameProps {
    config: HalfAMinuteConfig;
    onGameEnd: () => void;
    extraProps?: unknown;
}

export default function HalfAMinuteGame({ config, onGameEnd }: HalfAMinuteGameProps) {
  // const { nextWords, currentTeam, currentPlayer, givePhone, pointsPerTeam, gameFinished, onTurnStart, onTurnEnd } = useHamGame(config);
  const { gameState, onTurnStart, onTurnEnd } = useHamGameState(config);

  const pointsPerTeam = useMemo(() => {
    const points = Object.fromEntries(gameState.config.teams.map(t => [t.name, 0]));
    gameState.pastTurns.forEach(turn => {
      const team = gameState.config.teams[turn.team];
      const correct = Object.values(turn.words).filter(cor => cor);
      points[team.name] = points[team.name] + correct.length;
    });
    return points;
  }, [gameState]);

  const gameFinished = Math.max(...Object.values(pointsPerTeam)) >= config.untilPoints;

  return (
    <Card className="flex items-center justify-between flex-col py-10 px-8 full max-h-128">
      {gameFinished ? (
        <HalfAMinuteFinished config={config} pointsPerTeam={pointsPerTeam} onGameEnd={onGameEnd} />
      ) : gameState.turnPhase === 'give phone' ? (
        <>
          <div className="text-lg">Pass the phone to:</div>
          <div className="flex-center flex-col py-2">
            <p className="text-3xl">{config.teams[gameState.currentTurn.team].playerNames[gameState.currentTurn.player]}</p>
            <p className="text-sm">({config.teams[gameState.currentTurn.team].name})</p>
          </div>
          <div className="flex flex-col gap-2 border-2 border-primary rounded-lg px-4 py-2">
            {config.teams.map((team) => (
              <div className="flex justify-between" key={team.name}>
                <p>{team.name}</p>
                <p className="pl-8">{pointsPerTeam[team.name] || 0} points</p>
              </div>
            ))}
          </div>
          <Button className="button bg-blue-300 w-full" onClick={onTurnStart}>Start turn</Button>
        </>
      ) : (
        <HalfAMinuteTurn config={config} words={Object.keys(gameState.currentTurn.words)} onTurnEnd={onTurnEnd} />
      )}
    </Card>
  )
}
