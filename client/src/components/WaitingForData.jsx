import { Link } from "react-router-dom";
import Logo from "../assets/kinexon.png";

function WaitingForData() {
  return (
    <div className="waiting-container">
      <img src={Logo} alt="logo" />
      <div className="dot-container">
        <div className="dots"></div>
        <div className="dots"></div>
        <div className="dots"></div>
        <div className="dots"></div>
        <div className="dots"></div>
        <div className="dots"></div>
      </div>

      <Link to="/positions">
        <button>Begin simulation</button>
      </Link>
    </div>
  );
}

export default WaitingForData;
