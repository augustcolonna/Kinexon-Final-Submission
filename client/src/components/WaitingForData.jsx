import Logo from "../assets/kinexon.png";

function WaitingForData() {
  return (
    <div className="waiting-container">
      <img src={Logo} alt="logo" />
      <div className="challenge-info">
        <h1>Coding Challenge Requirements</h1>
        <p>
          The position generator is responsible for generating more or less
          random position data. A position data message consists of a timestamp,
          a sensor id and x/y/z coordinates. This is reflected in the Protobuf
          definitions above. Positions shall be generated for 10 sensors with
          1Hz and resemble player movement on a playing field. That means that
          individual positions should not exceed possible velocities of a human
          player and remain between 0m and 100m for x and y. After a position
          has been generated, noise of +/ - 30cm shall be added before the data
          leaves the position generator.
        </p>
      </div>
    </div>
  );
}

export default WaitingForData;
