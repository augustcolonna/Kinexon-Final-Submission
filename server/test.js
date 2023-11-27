let playerX;
let playerY;
let playerZ;

let xMax = 100;
let yMax = 100;
let xMin = 0;
let yMin = 0;

const randomFirstMove = () => {
  playerX = Math.floor(Math.random() * 101);
  playerY = Math.floor(Math.random() * 101);
  playerZ = Math.floor(Math.random() * 3);
  return playerX, playerY, playerZ;
};

console.log(randomFirstMove());

// const playerMovement = (playerX, playerY, playerZ) => {};
