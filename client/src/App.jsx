import { useState, useEffect } from "react";
import "./App.scss";

// import startSubscriber from "./utilities/subscriber";
// import publishUpdates from "./utilities/subscriber";

import positionData from "./utilities/positionData.json";

import PositionInformation from "./components/PositionInformation";

import WaitingForData from "./components/WaitingForData";

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
            <PositionInformation
              positionNumber={1}
              positionData={positionData}
            />
          </div>
          <div className="position">
            <PositionInformation
              positionNumber={2}
              positionData={positionData}
            />
          </div>
          <div className="position">
            <PositionInformation
              positionNumber={3}
              positionData={positionData}
            />
          </div>
          <div className="position">
            <PositionInformation
              positionNumber={4}
              positionData={positionData}
            />
          </div>
          <div className="position">
            {" "}
            <PositionInformation
              positionNumber={5}
              positionData={positionData}
            />
          </div>
          <div className="position">
            {" "}
            <PositionInformation
              positionNumber={6}
              positionData={positionData}
            />
          </div>
          <div className="position">
            {" "}
            <PositionInformation
              positionNumber={7}
              positionData={positionData}
            />
          </div>
          <div className="position">
            {" "}
            <PositionInformation
              positionNumber={8}
              positionData={positionData}
            />
          </div>
          <div className="position">
            {" "}
            <PositionInformation
              positionNumber={9}
              positionData={positionData}
            />
          </div>
          <div className="position">
            <PositionInformation
              positionNumber={10}
              positionData={positionData}
            />
          </div>
        </div>
      ) : (
        <WaitingForData />
      )}
    </div>
  );
}

export default App;