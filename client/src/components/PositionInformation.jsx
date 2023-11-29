// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PositionInformation() {
  const [position, setPosition] = useState();

  // const lastElement = firstPosition[firstPosition.length - 1];
  //fomratting timestamp
  // const timestamp = parseInt(lastElement.timestamp) / 1000;
  // const date = new Date(timestamp);
  // const dateHours = date.getHours();
  // const dateMinutes = date.getMinutes();
  // const dateSeconds = date.getSeconds();
  // const dateMonth = date.getMonth() + 1;
  // const dateDay = date.getDate();

  // const timestampDate = `${dateMonth}/${dateDay} at ${dateHours}:${dateMinutes}:${dateSeconds}`;

  useEffect(() => {
    axios
      .get("http://localhost:3000/positions")
      .then((response) => {
        const groupBySensor = Object.groupBy(
          response.data,
          ({ sensorId }) => sensorId
        );

        setPosition(groupBySensor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [position]);

  console.log(position);

  // console.log(Object.keys(position));

  return (
    <div className="single-position">
      {position &&
        Object.keys(position).map((sensorId) => (
          <div key={sensorId}>
            <h2>Sensor {sensorId}</h2>
            {position[sensorId].map((item, index) => (
              <div key={index}>
                {/* Render your data properties here */}
                <p>Sensor ID: {item.sensorId}</p>
                <p>Timestamp: {item.timestamp}</p>
                <p>Data3d:</p>
                <ul>
                  <li>X: {item.data3d.x}</li>
                  <li>Y: {item.data3d.y}</li>
                  <li>Z: {item.data3d.z}</li>
                </ul>
                <p>ID: {item.id}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default PositionInformation;
