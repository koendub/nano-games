import { Skull, Trophy } from "lucide-react";
import type { HalfAMinuteConfig } from "../hamModels";
import { Button } from "@base-ui/react";


const indexToTrophyColor = (index: number) => index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "#111827";

interface HalfAMinuteFinishedProps {
  config: HalfAMinuteConfig;
  pointsPerTeam: Record<string, number>;
  onGameEnd: () => void;
}

export default function HalfAMinuteFinished({ config, pointsPerTeam, onGameEnd }: HalfAMinuteFinishedProps) {
  return (
    <>
      <h2 className="text-3xl">Game Over!</h2>
      <div className="flex flex-col gap-4 p-4 text-lg">
        {config.teams
          .map((team) => ({ ...team, points: pointsPerTeam[team.name] || 0 }))
          .sort((a, b) => b.points - a.points)
          .map((team, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-2 bg-[#abc4] border-2 rounded-full"
              style={{ borderColor: indexToTrophyColor(index) }}
            >
              <div className="flex items-center gap-2">
                {index < 3 ? (
                  <Trophy size={24} style={{ color: indexToTrophyColor(index) }} />
                ) : (
                  <Skull size={24} style={{ color: "black" }} />
                )}
                <p className="pl-4">{team.name}</p>
              </div>
              <p className="pl-8">{team.points} points</p>
            </div>
          ))}
      </div>
      <Button className="button bg-blue-300 w-full" onClick={onGameEnd}>Play again!</Button>
    </>
  )
}