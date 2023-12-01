import { Link } from "react-router-dom";

function Button() {
  return (
    <Link to="/">
      <button className="btn">Stop Simulation</button>
    </Link>
  );
}

export default Button;
