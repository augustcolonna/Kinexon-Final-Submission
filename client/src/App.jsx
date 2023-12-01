import { Routes, Route } from "react-router-dom";
import "./App.scss";
// import { useEffect, useState } from "react";
// import axios from "axios";

import PositionInformation from "./components/PositionInformation";
import WaitingForData from "./components/WaitingForData";
// import PositionHistory from "./components/PositionHistory";
import Button from "./components/Button";

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<WaitingForData />} />
        <Route
          path="/positions"
          element={
            <div className="position">
              <PositionInformation />
              <Button />
            </div>
          }
        />
        {/* <Route path="/positions/:id" element={<PositionHistory />} /> */}
      </Routes>
    </div>
  );
}

export default App;
