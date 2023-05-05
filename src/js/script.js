import { Boundary } from './Boundary.js';
import { Sprite } from './Sprite.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

const boundaries = [];

const offset = {
  x: -735,
  y: -650,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

console.log(boundaries);

const mapImage = new Image();
mapImage.src = './assets/Pellet Town.png';

const foregroundImage = new Image();
foregroundImage.src = './assets/foregroundObjects.png';

const playerImage = new Image();
playerImage.src = './assets/playerDown.png';

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: { max: 4 },
});

const background = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: mapImage,
});

const foreground = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const movables = [background, ...boundaries, foreground];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw(ctx);
  boundaries.forEach((bounday) => {
    bounday.draw(ctx);
  });
  player.draw(ctx);
  foreground.draw(ctx);
  let moving = true;
  if (keys.w.pressed && lastKey === 'w') {
    {
      for (let i = 0; i < boundaries.length; i++) {
        const bounday = boundaries[i];
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...bounday,
              position: { x: bounday.position.x, y: bounday.position.y + 3 },
            },
          })
        ) {
          console.log('colliding');
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach((movable) => (movable.position.y += 3));
    }
  } else if (keys.a.pressed && lastKey === 'a') {
    {
      for (let i = 0; i < boundaries.length; i++) {
        const bounday = boundaries[i];
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...bounday,
              position: { x: bounday.position.x + 3, y: bounday.position.y },
            },
          })
        ) {
          console.log('colliding');
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach((movable) => (movable.position.x += 3));
    }
  } else if (keys.d.pressed && lastKey === 'd') {
    {
      for (let i = 0; i < boundaries.length; i++) {
        const bounday = boundaries[i];
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...bounday,
              position: { x: bounday.position.x - 3, y: bounday.position.y },
            },
          })
        ) {
          console.log('colliding');
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach((movable) => (movable.position.x -= 3));
    }
  } else if (keys.s.pressed && lastKey === 's') {
    {
      for (let i = 0; i < boundaries.length; i++) {
        const bounday = boundaries[i];
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...bounday,
              position: { x: bounday.position.x, y: bounday.position.y - 3 },
            },
          })
        ) {
          console.log('colliding');
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach((movable) => (movable.position.y -= 3));
    }
  }
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});
