
import { useState } from "react";
import { NotTheSameSetup } from "./NotTheSameSetup";
import { NotTheSameGame } from "./NotTheSameGame";
import { getNtsDefaultConfig } from "./ntsLogicHooks";

export function NotTheSame() {
	const [inConfig, setInConfig] = useState(true);
	const [config, setConfig] = useState(getNtsDefaultConfig());

	return (
		<div className="flex-center flex-col w-full max-w-96 flex-1">
			{inConfig ? (
				<NotTheSameSetup initialConfig={config} startGame={(gameConfig) => {
					setConfig(gameConfig);
					setInConfig(false);
				}} />
			) : (
				<NotTheSameGame config={config} onGameEnd={() => setInConfig(true)} />
			)}
		</div>
	)
}
