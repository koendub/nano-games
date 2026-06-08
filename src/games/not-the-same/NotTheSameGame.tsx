import NotTheSameRound from "./NotTheSameRound";
import type { NotTheSameConfig, NotTheSameGameState, NotTheSameRoundState } from "./ntsModels";
import { useCallback, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { useNtsGetQuestion } from "./ntsLogicHooks";
import { Button } from "@base-ui/react/button";

interface NotTheSameGameProps {
  config: NotTheSameConfig;
  onGameEnd: () => void;
}

export function NotTheSameGame({ config, onGameEnd }: NotTheSameGameProps) {
  const getQuestion = useNtsGetQuestion(config);
  const [inBetweenScreen, setInBetweenScreen] = useState(true);
  const [gameState, setGameState] = useState<NotTheSameGameState>({
    config,
    pastRounds: [],
    currentRound: { question: getQuestion(), playersStillIn: [...config.players] }
  });

  const onRoundEnd = useCallback((result: NotTheSameRoundState) => {
    setGameState({
      ...gameState,
      pastRounds: [...gameState.pastRounds, result],
      currentRound: { question: getQuestion(), playersStillIn: [...gameState.config.players] }
    });
    setInBetweenScreen(true);
  }, [gameState, getQuestion]);

  const scores = useMemo(() => {
    const s: Record<string, number> = Object.fromEntries(config.players.map(p => [p, 0]));
    gameState.pastRounds.forEach(round => {
      round.playersStillIn.forEach(p => { s[p] = (s[p] || 0) + 1; });
    });
    return s;
  }, [gameState, config.players]);

  return (
    <Card className="flex items-center justify-between flex-col py-10 px-8 full max-h-128 relative">
      {inBetweenScreen ? (
        <div className="w-full mb-4">
          <div className="flex justify-between mb-2">
            <div className="font-bold">Scores</div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {config.players.map(p => (
              <div key={p} className="border rounded px-3 py-2">
                <div className="font-bold">{p}</div>
                <div className="text-sm">{scores[p] || 0} wins</div>
              </div>
            ))}
          </div>
          <Button className="button bg-green-400 mr-2" onClick={() => setInBetweenScreen(false)}>Start Round</Button>
          <Button className="button bg-red-400 mr-2" onClick={onGameEnd}>End game</Button>
        </div>
      ) : (
        <NotTheSameRound config={config} initialRoundState={gameState.currentRound} onRoundEnd={onRoundEnd} />
      )}
    </Card>
  )
}
