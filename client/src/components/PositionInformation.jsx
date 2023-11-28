import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function PositionInformation({ positionData, positionNumber }) {
  const firstPosition = positionData.positions[positionNumber];

  const lastElement = firstPosition[firstPosition.length - 1];

  //fomratting timestamp
  const timestamp = parseInt(lastElement.timestamp) / 1000;
  const date = new Date(timestamp);
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const dateSeconds = date.getSeconds();
  const dateMonth = date.getMonth() + 1;
  const dateDay = date.getDate();

  const timestampDate = `${dateMonth}/${dateDay} at ${dateHours}:${dateMinutes}:${dateSeconds}`;

  useEffect(() => {
    axios.get("http://localhost:3000/positions").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div className="single-position">
      <h3>Player Number {lastElement.sensorId}</h3>
      <div className="location">
        <h4>Coordinates</h4>
        <p>
          <span>X</span> {lastElement.data3d.x}
        </p>
        <p>
          <span>Y</span> {lastElement.data3d.y}
        </p>
        <p>
          <span>Z</span> {lastElement.data3d.z.toFixed(2)}
        </p>
      </div>
      <p className="timestamp">
        {`Location at:
        ${timestampDate}`}
      </p>
      <Link to={`/positions/${positionNumber}`}>View History</Link>
    </div>
  );
}

export default PositionInformation;
