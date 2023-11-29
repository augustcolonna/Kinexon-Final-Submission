// import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function PositionInformation() {
  // const [positionData, setPositionData] = useState([]);
  // const firstPosition = positionData.positions[positionNumber];
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
        // console.log("the response is: ", response);
        console.log(response.data);
        // setPositionData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="single-position">
      {/* <ul>
        {positionData.map((position) => {
          <li>{position}</li>;
        })}
      </ul> */}
    </div>
  );
}

export default PositionInformation;
