import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
//new comment
function PositionHistory({ positionData }) {
  const { id } = useParams();
  const position = positionData.positions[id];

  return (
    <div className="position-history-container">
      <h3>Player number {id}</h3>
      <Link to="/">
        <button>Back to All Positions</button>
      </Link>
      {position.map((position, index) => {
        return (
          <div className="position-history" key={index}>
            <h4>Coordinates</h4>
            <p>
              <span>X</span> {position.data3d.x}
            </p>
            <p>
              <span>Y</span> {position.data3d.y}
            </p>
            <p>
              <span>Z</span> {position.data3d.z.toFixed(2)}
            </p>
            <p className="timestamp">
              {`Location at:
              ${new Date(
                parseInt(position.timestamp) / 1000
              ).toLocaleString()}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default PositionHistory;
