import type { NotTheSameConfig, NotTheSameRoundState } from "./ntsModels";
import { CardHeader, CardTitle } from "../../components/ui/Card";
import { useState } from "react";
import { CardButtonGrid } from "../../components/CardButtonGrid";

interface NotTheSameRoundProps {
	config: NotTheSameConfig;
	initialRoundState: NotTheSameRoundState;
	onRoundEnd: (result: NotTheSameRoundState) => void;
}

export default function NotTheSameRound({ config, initialRoundState, onRoundEnd }: NotTheSameRoundProps) {
  const [roundState, setRoundState] = useState(initialRoundState);

	return (
		<>
			<CardHeader className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<CardTitle className="text-xl text-center">{roundState.question}</CardTitle>
        <button onClick={() => onRoundEnd(roundState)}></button>
			</CardHeader>
      <CardButtonGrid
        elements={config.players.map(p => ({ name: p, enabled: roundState.playersStillIn.includes(p) }))}
        onClick={(player) => setRoundState({...roundState, playersStillIn: roundState.playersStillIn.filter(pin => pin !== player)})}
      />
		</>
	)
}
