import { Link } from "react-router-dom";

function Button({ position }) {
  return (
    <Link to="/">
      {position ? (
        <button className="btn">Stop Simulation</button>
      ) : (
        <button className="btn">waiting for positions...</button>
      )}
    </Link>
  );
}

export default Button;
