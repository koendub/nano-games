import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { halfAMinuteCatchPhrase } from "../games/half-a-minute/hamModels";
import { notTheSameCatchPhrase } from "../games/not-the-same/ntsModels";
import { aTrueStoryCatchPhrase } from "../games/a-true-story/atsModels";
import hamImage from "../assets/images/half-a-minute-hourglass.png";
import ntsImage from "../assets/images/not-the-same-neq.png";
import atsImage from "../assets/images/true-story-barney.jpg";
import { Gamepad2Icon, PiggyBankIcon, TimerIcon, WifiOffIcon } from "lucide-react";

interface GameLinkProps {
  path: string;
  name: string;
  catchPhrase: string;
  image: string;
}

function GameLink({ path, name, catchPhrase, image }: GameLinkProps) {
  return (
    <Link to={path}>
      <Card className="w-96">
        <img className="w-full h-auto px-4" src={image} alt={name} />
        <h2 className="px-8 pb-2">{name}</h2>
        <p className="px-6">{catchPhrase}</p>
      </Card>
    </Link>
  );
}

export function HomePage() {
  return (
    <div className="px-6 py-4 flex flex-col gap-4 items-center">
      <Card className="px-6 py-4">
        <h1>Nano Games</h1>
        <ul className="text-lg space-y-3">
          <li><Gamepad2Icon className="inline-block stroke-purple-600 mr-2" /> Simple games to quickly play with friends</li>
          <li><TimerIcon className="inline-block stroke-red-600 mr-2" /> Explain the rules within seconds</li>
          <li><WifiOffIcon className="inline-block stroke-blue-600 mr-2" /> 100% local, no internet required and no data collection</li>
          <li><PiggyBankIcon className="inline-block stroke-green-600 mr-2" /> Open-source, no ads and free forever</li>
        </ul>
      </Card>
      <GameLink
        path="/ham"
        name="Half A Minute"
        catchPhrase={halfAMinuteCatchPhrase}
        image={hamImage}
      />
      <GameLink
        path="/nts"
        name="Not The Same"
        catchPhrase={notTheSameCatchPhrase}
        image={ntsImage}
      />
      <GameLink
        path="/ats"
        name="A True Story"
        catchPhrase={aTrueStoryCatchPhrase}
        image={atsImage}
      />
    </div>
  )
}
