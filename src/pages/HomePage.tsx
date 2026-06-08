import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { halfAMinuteCatchPhrase } from "../games/half-a-minute/hamModels";
import { notTheSameCatchPhrase } from "../games/not-the-same/ntsModels";
import { aTrueStoryCatchPhrase } from "../games/a-true-story/atsModels";


interface GameLinkProps {
  path: string;
  name: string;
  catchPhrase: string;
  image: string;
}

function GameLink({ path, name, catchPhrase, image }: GameLinkProps) {
  return (
    <Link to={path}>
      <Card>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{catchPhrase}</p>
      </Card>
    </Link>
  );
}

export function HomePage() {
  return (
    <Card className="px-6 py-4">
      <h1>Nano Games</h1>
      <ul>
        <li>Simple games to quickly play with friends</li>
        <li>Explain the rules within seconds</li>
        <li>100% local, no internet required and no data collection</li>
        <li>Open-source, no ads and free forever</li>
      </ul>
      <GameLink
        path="/ham"
        name="Half A Minute"
        catchPhrase={halfAMinuteCatchPhrase}
        image="/images/ham.jpg"
      />
      <GameLink
        path="/nts"
        name="Not The Same"
        catchPhrase={notTheSameCatchPhrase}
        image="/images/nts.jpg"
      />
      <GameLink
        path="/ats"
        name="A True Story"
        catchPhrase={aTrueStoryCatchPhrase}
        image="/images/ats.jpg"
      />
    </Card>
  )
}
