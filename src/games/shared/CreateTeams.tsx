import { type Dispatch, type SetStateAction, useCallback, useEffect } from "react";
import { Trash2, UserPlus2 } from "lucide-react";
import { Button } from "@base-ui/react/button";
import { Card } from "../../components/Card";


export interface Team {
  name: string;
  playerNames: string[];
  color?: string;
}

const teamColors = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#ec4899",
  "#f97316",
  "#14b8a6",
  "#eab308",
  "#6366f1",
  "#78716c",
]

interface CreateTeamsProps {
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  maxTeams?: number;
}

const createTeamName = (idx: number): string => "Team " + String.fromCharCode(97 + idx).toUpperCase();
const createPlayerName = (idx: number): string => "Player " + idx;

export default function CreateTeams({ teams, setTeams, maxTeams = 5 }: CreateTeamsProps) {
  const getNextTeamColor = useCallback((teams: Team[]) => {
    const usedColors = new Set(teams.map(team => team.color));
    const firstUnusedColor = teamColors.find(color => !usedColors.has(color));
    if (firstUnusedColor) return firstUnusedColor;
    throw new Error("No more team colors available");
  }, []);

  const createNewTeam = useCallback(() => {
    setTeams(prev => {
      if (prev.length >= maxTeams) return prev;
      let newTeamIndex = 0;
      while (prev.some(team => team.name === createTeamName(newTeamIndex))) {
        newTeamIndex += 1;
      }
      let newPlayerIndex = 1;
      while (prev.some(team => team.playerNames.some(player => player === createPlayerName(newPlayerIndex)))) {
        newPlayerIndex += 1;
      }
      return [...prev, {
        name: createTeamName(newTeamIndex),
        playerNames: [createPlayerName(newPlayerIndex)],
        color: getNextTeamColor(prev),
      } ]
    });
  }, [setTeams, maxTeams, getNextTeamColor]);

  const createNewPlayer = useCallback((teamIndex: number) => {
    setTeams(prev => {
      const newTeams = [...prev];
      let newPlayerIndex = 1;
      while (prev.some(team => team.playerNames.some(player => player === createPlayerName(newPlayerIndex)))) {
        newPlayerIndex += 1;
      }
      const newPlayers = [...newTeams[teamIndex].playerNames, createPlayerName(newPlayerIndex)];
      newTeams[teamIndex] = { ...newTeams[teamIndex], playerNames: newPlayers };
      return newTeams;
    });
  }, [setTeams]);

  const removeTeam = useCallback((teamIndex: number) => {
    setTeams(prev => {
      const newTeams = [...prev];
      newTeams.splice(teamIndex, 1);
      return newTeams;
    });
  }, [setTeams]);

  const removePlayer = useCallback((teamIndex: number, playerIndex: number) => {
    setTeams(prev => {
      const newTeams = [...prev];
      const newPlayers = [...newTeams[teamIndex].playerNames];
      if (newPlayers.length === 1) return prev;
      newPlayers.splice(playerIndex, 1);
      newTeams[teamIndex] = { ...newTeams[teamIndex], playerNames: newPlayers };
      return newTeams;
    });
  }, [setTeams]);

  const updateTeamName = useCallback((teamIndex: number, name: string) => {
    setTeams(prev => {
      if (prev.some(t => t.name === name)) return prev;
      const newTeams = [...prev];
      newTeams[teamIndex] = { ...newTeams[teamIndex], name };
      return newTeams;
    });
  }, [setTeams]);

  const updatePlayerName = useCallback((teamIndex: number, playerIndex: number, name: string) => {
    setTeams(prev => {
      const newTeams = [...prev];
      const newPlayers = [...newTeams[teamIndex].playerNames];
      newPlayers[playerIndex] = name;
      newTeams[teamIndex] = { ...newTeams[teamIndex], playerNames: newPlayers };
      return newTeams;
    });
  }, [setTeams]);

  const shufflePlayers = useCallback(() => {
    setTeams(prev => {
      const allPlayers = prev.flatMap(team => team.playerNames);
      const shuffledPlayers = allPlayers.sort(() => Math.random() - 0.5);
      const atLeastPlayersPerTeam = Math.floor(allPlayers.length / prev.length);
      const playersLeft = allPlayers.length % prev.length;
      return prev.map((team, idx) => {
        const playersInThisTeam = atLeastPlayersPerTeam + (playersLeft > idx ? 1 : 0);
        const players = shuffledPlayers.splice(0, playersInThisTeam);
        const newTeam = { name: team.name, playerNames: players, color: team.color };
        return newTeam;
      });
    });
  }, [setTeams]);

  useEffect(() => {
    const missingColors = teams.filter(team => !team.color);
    if (missingColors.length === 0) return;
    const newTeams = [...teams];
    newTeams.forEach(team => {
      if (team.color) return;
      team.color = getNextTeamColor(newTeams);
    });
    setTeams(newTeams);
  }, [teams, setTeams, getNextTeamColor]);

  return (
    <div className="flex flex-col py-2 w-full">

      <h1 className="px-2 pt-4">
        Create teams
      </h1>
      <div>
        {teams.map((team, index) => (
          <Card key={index} className="border-l-12 px-4 my-6" style={{ borderColor: team.color }}>
            <div className="flex flex-row justify-between pt-1">
              <input
                type="text"
                value={team.name}
                className="text-lg font-bold underline mr-2"
                onChange={(e) => updateTeamName(index, e.target.value)}
              />
              <div className="flex flex-row gap-2">
                <Button className="button bg-red-300" onClick={() => removeTeam(index)}>
                  <Trash2 />
                </Button>
                <Button className="button bg-green-300" onClick={() => createNewPlayer(index)}>
                  <UserPlus2 />
                </Button>
              </div>
            </div>
            <ol className="pl-4">
              {team.playerNames.map((playerName, playerIndex) => (
                <li key={playerIndex} className="flex flex-row justify-between py-1">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => updatePlayerName(index, playerIndex, e.target.value)}
                  />
                  <Button className="button bg-red-300" onClick={() => removePlayer(index, playerIndex)} disabled={team.playerNames.length === 1}>
                    <Trash2 />
                  </Button>
                </li>
              ))}
            </ol>
          </Card>
        ))}
      </div>
      <div className="flex flex-row gap-4 flex-center flex-wrap px-8">
        <Button onClick={createNewTeam} className="button italic flex-1 bg-blue-300" disabled={teams.length >= maxTeams}>
          New Team
        </Button>
        <Button onClick={shufflePlayers} className="button italic flex-1 bg-blue-300" disabled={teams.length < 2}>
          Shuffle Players
        </Button>
      </div>
    </div>
  )
}