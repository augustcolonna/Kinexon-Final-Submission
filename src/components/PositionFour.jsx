function PositionFour({ positionData }) {
  const firstPosition = positionData.positions["4"];

  const lastElement = firstPosition[firstPosition.length - 1];
  const timestamp = parseInt(lastElement.timestamp) / 1000;
  const date = new Date(timestamp);
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const dateSeconds = date.getSeconds();
  const dateMonth = date.getMonth() + 1;
  const dateDay = date.getDate();

  const timestampDate = `${dateMonth}/${dateDay} at ${dateHours}:${dateMinutes}:${dateSeconds}`;

  return (
    <div className="single-position">
      <h3>Sensor Id {lastElement.sensorId}</h3>
      <p className="location">
        <span> {`X: ${lastElement.data3d.x}`}</span>
        <br></br>
        <span> {`Y: ${lastElement.data3d.y}`}</span>
        <br></br>
        <span> {`Z: ${lastElement.data3d.z.toFixed(2)}`}</span>
      </p>
      <p className="timestamp">
        {`Player ${lastElement.sensorId} was at this location at:
        ${timestampDate}`}
      </p>
    </div>
  );
}

export default PositionFour;
