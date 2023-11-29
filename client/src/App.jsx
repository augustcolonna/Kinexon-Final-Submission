// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

// import publishUpdates from "./utilities/subscriber";

import PositionInformation from "./components/PositionInformation";
import WaitingForData from "./components/WaitingForData";
import PositionHistory from "./components/PositionHistory";

function App() {
  // const [positions, setPositions] = useState(false);

  // useEffect(() => {
  //   if (Object.keys(positionData).length > 0) {
  //     setPositions(true);
  //   } else {
  //     setPositions(false);
  //   }
  // }, [positions]);

  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<WaitingForData />} />
        <Route
          path="/positions"
          element={
            <div className="position-container">
              <div className="position">
                <PositionInformation positionNumber={1} />
              </div>
              <div className="position">
                <PositionInformation positionNumber={2} />
              </div>
              <div className="position">
                <PositionInformation positionNumber={3} />
              </div>
              <div className="position">
                <PositionInformation positionNumber={4} />
              </div>
              <div className="position">
                {" "}
                <PositionInformation positionNumber={5} />
              </div>
              <div className="position">
                {" "}
                <PositionInformation positionNumber={6} />
              </div>
              <div className="position">
                {" "}
                <PositionInformation positionNumber={7} />
              </div>
              <div className="position">
                {" "}
                <PositionInformation positionNumber={8} />
              </div>
              <div className="position">
                {" "}
                <PositionInformation positionNumber={9} />
              </div>
              <div className="position">
                <PositionInformation positionNumber={10} />
              </div>
            </div>
          }
        />
        <Route path="/positions/:id" element={<PositionHistory />} />
      </Routes>
    </div>
  );
}

export default App;
