import { useState, useEffect } from "react";
import "./App.scss";

// import startSubscriber from "./utilities/subscriber";
// import publishUpdates from "./utilities/subscriber";

import positionData from "./utilities/positionData.json";

import PositionOne from "./components/PositionOne";
import PositionTwo from "./components/PositionTwo";
import PositionThree from "./components/PositionThree";
import PositionFour from "./components/PositionFour";
import PositionFive from "./components/PositionFive";
import PositionSix from "./components/PositionSix";
import PositionSeven from "./components/PositionSeven";
import PositionEight from "./components/PositionEight";
import PositionNine from "./components/PositionNine";
import PositionTen from "./components/PositionTen";

function App() {
  const [positions, setPositions] = useState(false);

  useEffect(() => {
    if (Object.keys(positionData).length > 0) {
      setPositions(true);
    } else {
      setPositions(false);
    }
  }, [positions]);

  return (
    <div className="main-container">
      {positions ? (
        <div className="position-container">
          <div className="position">
            <PositionOne positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            <PositionTwo positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            <PositionThree positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            <PositionFour positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            {" "}
            <PositionFive positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            {" "}
            <PositionSix positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            {" "}
            <PositionSeven positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            {" "}
            <PositionEight positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            {" "}
            <PositionNine positions={positions} positionData={positionData} />
          </div>
          <div className="position">
            <PositionTen positions={positions} positionData={positionData} />
          </div>
        </div>
      ) : (
        <div>
          <p>Waiting for Player movemenet</p>
        </div>
      )}
    </div>
  );
}

export default App;
