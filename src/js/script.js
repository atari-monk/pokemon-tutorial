import { Boundary } from './Boundary.js';
import { Sprite } from './Sprite.js';
import { Battle } from './Battle.js';
import { audio } from './data/audio.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
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

const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const mapImage = new Image();
mapImage.src = './assets/Pellet Town.png';

const foregroundImage = new Image();
foregroundImage.src = './assets/foregroundObjects.png';

const playerDownImage = new Image();
playerDownImage.src = './assets/playerDown.png';
const playerUpImage = new Image();
playerUpImage.src = './assets/playerUp.png';
const playerLeftImage = new Image();
playerLeftImage.src = './assets/playerLeft.png';
const playerRightImage = new Image();
playerRightImage.src = './assets/playerRight.png';

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: { max: 4, hold: 10 },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
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

const movables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

const battleScene = new Battle(ctx, animate);

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  background.draw(ctx);
  boundaries.forEach((bounday) => {
    bounday.draw(ctx);
  });
  battleZones.forEach((battleZone) => {
    battleZone.draw(ctx);
  });
  player.draw(ctx);
  foreground.draw(ctx);

  let moving = true;
  player.animate = false;

  if (battleScene.initiated) return;

  //activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {

        //deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        audio.map.stop();
        audio.initBattle.play();
        audio.battle.play();

        battleScene.initiated = true;
        gsap.to('#canvas-overlay', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#canvas-overlay', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                //activate a new animation loop
                battleScene.initBattle();
                battleScene.animateBattle();
                gsap.to('#canvas-overlay', { opacity: 0, duration: 0.4 });
              },
            });
          },
        });
        break;
      }
    }
  }

  if (keys.w.pressed && lastKey === 'w') {
    player.animate = true;
    player.image = player.sprites.up;
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
          moving = false;
          break;
        }
      }

      if (moving) movables.forEach((movable) => (movable.position.y += 3));
    }
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true;
    player.image = player.sprites.left;
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
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach((movable) => (movable.position.x += 3));
    }
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true;
    player.image = player.sprites.right;
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
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach((movable) => (movable.position.x -= 3));
    }
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true;
    player.image = player.sprites.down;
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
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach((movable) => (movable.position.y -= 3));
    }
  }
}
animate();

//battleScene.initBattle();
//battleScene.animateBattle();

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

let clicked = false;
window.addEventListener('click', () => {
  if (!clicked) {
    audio.map.play();
    clicked = true;
  }
});
