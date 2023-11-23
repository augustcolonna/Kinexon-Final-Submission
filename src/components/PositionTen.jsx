function PositionTen({ positionData }) {
  const firstPosition = positionData.positions["10"];

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
        {`X: ${lastElement.data3d.x}`}
        <br></br>
        {`Y: ${lastElement.data3d.y}`}
        <br></br>
        {`Z: ${lastElement.data3d.z.toFixed(2)}`}
      </p>
      <p className="timestamp">
        {`Player ${lastElement.sensorId} was at this location at:
        ${timestampDate}`}
      </p>
    </div>
  );
}

export default PositionTen;
