import Logo from "../assets/kinexon.png";

function WaitingForData() {
  return (
    <div className="waiting-container">
      <img src={Logo} alt="logo" />
      <div className="challenge-info">
        <h1>Kinexon Coding Challenge</h1>
        <h2>Instructions</h2>
        <ol>
          <li>
            cd into the client folder, run{" "}
            <span>npm i (install), and then npm run dev</span> to start the
            client
          </li>
          <li>
            From the client folder, run{" "}
            <span>node src/utilities/subscriber.js</span>
          </li>
          <li>
            In a split terminal, cd into the server folder and run{" "}
            <span>npm i, and then node publisher</span>{" "}
          </li>
        </ol>
        <p>
          The program will automatically change the UI based off the contents of
          the JSON file
        </p>
      </div>
    </div>
  );
}

export default WaitingForData;
