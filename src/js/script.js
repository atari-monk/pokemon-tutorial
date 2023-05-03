const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const mapImg = new Image();
mapImg.src = './assets-game/pellet-town.png';

const playerImg = new Image();
playerImg.src = './assets-game/playerDown.png';

mapImg.onload = () => {
  ctx.drawImage(mapImg, -736, -600);
  playerImg.onload = () => {
    ctx.drawImage(
      playerImg,
      0,
      0,
      playerImg.width / 4,
      playerImg.height,
      canvas.width / 2 - playerImg.width / 4 / 2,
      canvas.height / 2 - playerImg.height / 2,
      playerImg.width / 4,
      playerImg.height
    );
  };
};

function animate() {
  window.requestAnimationFrame(animate);
  console.log('animation frame');
}
animate();

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      console.log('w');
      break;
    case 'a':
      console.log('a');
      break;
    case 'd':
      console.log('d');
      break;
    case 's':
      console.log('s');
      break;
  }
});
