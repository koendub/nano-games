import { Link } from "react-router-dom";


export function HomePage() {
  return (
    <div className="">
      Nano Games

      <Link to={{pathname: '/ham'}}>Half A Minute</Link>
    </div>
  )
}
