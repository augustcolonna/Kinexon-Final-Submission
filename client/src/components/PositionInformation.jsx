// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

function PositionInformation() {
  const [position, setPosition] = useState();

  useEffect(() => {
    setInterval(() => {
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
    }, 1000);
  });

  // const specificPosition = Object.entries(position)[positionNumber];

  // console.log(specificPosition);

  return (
    <div className="single-position-container">
      {position &&
        Object.entries(position).map(([key, value]) => (
          <div className="single-position" key={key}>
            <h2>Sensor Id {key}</h2>
            <div>
              <p>
                {new Date(
                  parseInt(value[value.length - 1].timestamp) / 1000
                ).toString()}
              </p>
              <p>{value[value.length - 1].data3d.x.toFixed(2)}</p>
              <p>{value[value.length - 1].data3d.y.toFixed(2)}</p>
              <p>{value[value.length - 1].data3d.z.toFixed(2)}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PositionInformation;
