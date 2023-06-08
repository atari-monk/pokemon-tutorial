/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Battle.js":
/*!**************************!*\
  !*** ./src/js/Battle.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Battle: () => (/* binding */ Battle)
/* harmony export */ });
/* harmony import */ var _Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite.js */ "./src/js/Sprite.js");
/* harmony import */ var _Monster_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Monster.js */ "./src/js/Monster.js");
/* harmony import */ var _data_attacks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/attacks.js */ "./src/js/data/attacks.js");
/* harmony import */ var _data_monsters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/monsters.js */ "./src/js/data/monsters.js");
/* harmony import */ var _data_audio_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/audio.js */ "./src/js/data/audio.js");





class Battle {
  #animationId;
  #animate;
  constructor(ctx, animate) {
    this.ctx = ctx;
    this.renderedSprites = [];
    this.attacks = _data_attacks_js__WEBPACK_IMPORTED_MODULE_2__.attacks;
    this.#animationId = 0;
    this.#animate = animate;
    this.battleBackgroundImage = new Image();
    this.battleBackgroundImage.src = './assets/battleBackground.png';
    this.battleBackground = new _Sprite_js__WEBPACK_IMPORTED_MODULE_0__.Sprite({
      position: {
        x: 0,
        y: 0
      },
      image: this.battleBackgroundImage
    });
    this.draggle = null;
    this.emby = null;
    this.queue = [];
    this.initialize();
    this.initiated = false;
  }
  initialize() {
    const dialogueBox = document.querySelector('#dialogue-box');
    dialogueBox.addEventListener('click', e => {
      if (this.queue.length > 0) {
        this.queue[0]();
        this.queue.shift();
      } else e.currentTarget.style.display = 'none';
    });
  }
  initBattle() {
    document.querySelector('#user-interface').style.display = 'block';
    document.querySelector('#dialogue-box').style.display = 'none';
    document.querySelector('#enemy-health-bar').style.width = '100%';
    document.querySelector('#player-health-bar').style.width = '100%';
    document.querySelector('#attacks-container').replaceChildren();
    this.draggle = new _Monster_js__WEBPACK_IMPORTED_MODULE_1__.Monster(_data_monsters_js__WEBPACK_IMPORTED_MODULE_3__.monsters.Draggle);
    this.emby = new _Monster_js__WEBPACK_IMPORTED_MODULE_1__.Monster(_data_monsters_js__WEBPACK_IMPORTED_MODULE_3__.monsters.Emby);
    this.renderedSprites = [this.draggle, this.emby];
    this.queue = [];
    this.emby.attacks.forEach(attack => {
      const button = document.createElement('button');
      button.innerHTML = attack.name;
      document.querySelector('#attacks-container').append(button);
    });
    this.buttons = document.querySelectorAll('button');
    this.buttons.forEach(button => {
      button.addEventListener('click', e => {
        const selectedAttack = this.attacks[e.currentTarget.innerHTML];
        this.emby.attack({
          attack: selectedAttack,
          recipient: this.draggle,
          renderedSprites: this.renderedSprites
        });
        if (this.draggle.health <= 0) {
          this.queue.push(() => {
            this.draggle.faint();
          });
          this.queue.push(() => {
            gsap.to('#canvas-overlay', {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(this.#animationId);
                this.#animate();
                document.querySelector('#user-interface').style.display = 'none';
                gsap.to('#canvas-overlay', {
                  opacity: 0
                });
              }
            });
          });
          this.initiated = false;
          _data_audio_js__WEBPACK_IMPORTED_MODULE_4__.audio.map.play();
        }
        const randomAttack = this.draggle.attacks[Math.floor(Math.random() * this.draggle.attacks.length)];
        this.queue.push(() => {
          this.draggle.attack({
            attack: randomAttack,
            recipient: this.emby,
            renderedSprites: this.renderedSprites
          });
          if (this.emby.health <= 0) {
            this.queue.push(() => {
              this.emby.faint();
            });
            this.queue.push(() => {
              gsap.to('#canvas-overlay', {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(this.#animationId);
                  this.#animate();
                  document.querySelector('#user-interface').style.display = 'none';
                  gsap.to('#canvas-overlay', {
                    opacity: 0
                  });
                }
              });
            });
            this.initiated = false;
            _data_audio_js__WEBPACK_IMPORTED_MODULE_4__.audio.map.play();
          }
        });
      });
      button.addEventListener('mouseenter', e => {
        const selectedAttack = this.attacks[e.currentTarget.innerHTML];
        document.querySelector('#attack-type').innerHTML = selectedAttack.type;
        document.querySelector('#attack-type').style.color = selectedAttack.color;
      });
    });
  }
  animateBattle() {
    this.#animationId = window.requestAnimationFrame(() => this.animateBattle());
    this.battleBackground.draw(this.ctx);
    this.renderedSprites.forEach(sprite => {
      sprite.draw(this.ctx);
    });
  }
}

/***/ }),

/***/ "./src/js/Boundary.js":
/*!****************************!*\
  !*** ./src/js/Boundary.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Boundary: () => (/* binding */ Boundary)
/* harmony export */ });
class Boundary {
  static width = 48;
  static height = 48;
  constructor({
    position
  }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }
  draw(ctx) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0)';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

/***/ }),

/***/ "./src/js/Monster.js":
/*!***************************!*\
  !*** ./src/js/Monster.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Monster: () => (/* binding */ Monster)
/* harmony export */ });
/* harmony import */ var _Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite.js */ "./src/js/Sprite.js");
/* harmony import */ var _data_audio_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/audio.js */ "./src/js/data/audio.js");


class Monster extends _Sprite_js__WEBPACK_IMPORTED_MODULE_0__.Sprite {
  constructor({
    position,
    image,
    frames = {
      max: 1,
      hold: 10
    },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation
    });
    this.health = 100;
    this.isEnemy = isEnemy;
    this.name = name;
    this.attacks = attacks;
  }
  faint() {
    const dialogueBox = document.querySelector('#dialogue-box');
    dialogueBox.innerHTML = `${this.name} fainted!`;
    gsap.to(this.position, {
      y: this.position.y + 20
    });
    gsap.to(this, {
      opacity: 0
    });
    _data_audio_js__WEBPACK_IMPORTED_MODULE_1__.audio.battle.stop();
    _data_audio_js__WEBPACK_IMPORTED_MODULE_1__.audio.victory.play();
  }
  attack({
    attack,
    recipient,
    renderedSprites
  }) {
    const dialogueBox = document.querySelector('#dialogue-box');
    dialogueBox.style.display = 'block';
    dialogueBox.innerHTML = `${this.name} used ${attack.name}`;
    let healthBar = '#enemy-health-bar';
    if (this.isEnemy) healthBar = '#player-health-bar';
    let rotation = 1;
    if (this.isEnemy) rotation = -2.2;
    recipient.health -= attack.damage;
    switch (attack.name) {
      case 'Fireball':
        _data_audio_js__WEBPACK_IMPORTED_MODULE_1__.audio.initFireball.play();
        const fireballImage = new Image();
        fireballImage.src = './assets/fireball.png';
        const fireball = new _Sprite_js__WEBPACK_IMPORTED_MODULE_0__.Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true,
          rotation
        });
        renderedSprites.splice(1, 0, fireball);
        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            //enemy gets hit
            _data_audio_js__WEBPACK_IMPORTED_MODULE_1__.audio.fireballHit.play();
            gsap.to(healthBar, {
              width: recipient.health + '%'
            });
            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08
            });
            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            });
            renderedSprites.splice(1, 1);
          }
        });
        break;
      case 'Tackle':
        const tl = gsap.timeline();
        let movementDistance = 20;
        if (this.isEnemy) movementDistance = -20;
        tl.to(this.position, {
          x: this.position.x - movementDistance
        }).to(this.position, {
          x: this.position.x + movementDistance * 2,
          duration: 0.1,
          onComplete: () => {
            //enemy gets hit
            _data_audio_js__WEBPACK_IMPORTED_MODULE_1__.audio.tackleHit.play();
            gsap.to(healthBar, {
              width: recipient.health + '%'
            });
            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08
            });
            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            });
          }
        }).to(this.position, {
          x: this.position.x
        });
        break;
    }
  }
}

/***/ }),

/***/ "./src/js/Sprite.js":
/*!**************************!*\
  !*** ./src/js/Sprite.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sprite: () => (/* binding */ Sprite)
/* harmony export */ });
class Sprite {
  constructor({
    position,
    image,
    frames = {
      max: 1,
      hold: 10
    },
    sprites,
    animate = false,
    rotation = 0
  }) {
    this.position = position;
    this.image = new Image();
    this.frames = {
      ...frames,
      val: 0,
      elapsed: 0
    };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.image.src = image.src;
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.rotation = rotation;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.image, this.frames.val * this.width, 0, this.image.width / this.frames.max, this.image.height, this.position.x, this.position.y, this.image.width / this.frames.max, this.image.height);
    ctx.restore();
    if (!this.animate) return;
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % this.frames.hold === 0) if (this.frames.val < this.frames.max - 1) this.frames.val++;else this.frames.val = 0;
  }
}

/***/ }),

/***/ "./src/js/data/attacks.js":
/*!********************************!*\
  !*** ./src/js/data/attacks.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attacks: () => (/* binding */ attacks)
/* harmony export */ });
const attacks = {
  Tackle: {
    name: 'Tackle',
    damage: 10,
    type: 'Normal',
    color: 'black'
  },
  Fireball: {
    name: 'Fireball',
    damage: 25,
    type: 'Fire',
    color: 'red'
  }
};

/***/ }),

/***/ "./src/js/data/audio.js":
/*!******************************!*\
  !*** ./src/js/data/audio.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   audio: () => (/* binding */ audio)
/* harmony export */ });
const defaultVolume = 0.1;
const highVolume = 0.5;
const prod = 'https://atari-monk.github.io/pokemon-tutorial/assets/audio/';
const local = './../../assets/audio/';
const isProd = true;
const host = isProd ? prod : local;
const audio = {
  map: new Howl({
    src: host + 'map.wav',
    html5: true,
    volume: defaultVolume
  }),
  initBattle: new Howl({
    src: host + 'initBattle.wav',
    html5: true,
    volume: defaultVolume
  }),
  battle: new Howl({
    src: host + 'battle.mp3',
    html5: true,
    volume: defaultVolume
  }),
  tackleHit: new Howl({
    src: host + 'tackleHit.wav',
    html5: true,
    volume: defaultVolume
  }),
  fireballHit: new Howl({
    src: host + 'fireballHit.wav',
    html5: true,
    volume: defaultVolume
  }),
  initFireball: new Howl({
    src: host + 'initFireball.wav',
    html5: true,
    volume: defaultVolume
  }),
  victory: new Howl({
    src: host + 'victory.wav',
    html5: true,
    volume: highVolume
  })
};

/***/ }),

/***/ "./src/js/data/monsters.js":
/*!*********************************!*\
  !*** ./src/js/data/monsters.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   monsters: () => (/* binding */ monsters)
/* harmony export */ });
/* harmony import */ var _attacks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attacks.js */ "./src/js/data/attacks.js");

const monsters = {
  Emby: {
    position: {
      x: 280,
      y: 325
    },
    image: {
      src: './assets/embySprite.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    name: 'Emby',
    attacks: [_attacks_js__WEBPACK_IMPORTED_MODULE_0__.attacks.Tackle, _attacks_js__WEBPACK_IMPORTED_MODULE_0__.attacks.Fireball]
  },
  Draggle: {
    position: {
      x: 800,
      y: 100
    },
    image: {
      src: './assets/draggleSprite.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    isEnemy: true,
    name: 'Draggle',
    attacks: [_attacks_js__WEBPACK_IMPORTED_MODULE_0__.attacks.Tackle, _attacks_js__WEBPACK_IMPORTED_MODULE_0__.attacks.Fireball]
  }
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Boundary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boundary.js */ "./src/js/Boundary.js");
/* harmony import */ var _Sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sprite.js */ "./src/js/Sprite.js");
/* harmony import */ var _Battle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Battle.js */ "./src/js/Battle.js");
/* harmony import */ var _data_audio_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/audio.js */ "./src/js/data/audio.js");




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
  y: -650
};
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) boundaries.push(new _Boundary_js__WEBPACK_IMPORTED_MODULE_0__.Boundary({
      position: {
        x: j * _Boundary_js__WEBPACK_IMPORTED_MODULE_0__.Boundary.width + offset.x,
        y: i * _Boundary_js__WEBPACK_IMPORTED_MODULE_0__.Boundary.height + offset.y
      }
    }));
  });
});
const battleZones = [];
battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) battleZones.push(new _Boundary_js__WEBPACK_IMPORTED_MODULE_0__.Boundary({
      position: {
        x: j * _Boundary_js__WEBPACK_IMPORTED_MODULE_0__.Boundary.width + offset.x,
        y: i * _Boundary_js__WEBPACK_IMPORTED_MODULE_0__.Boundary.height + offset.y
      }
    }));
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
const player = new _Sprite_js__WEBPACK_IMPORTED_MODULE_1__.Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage
  }
});
const background = new _Sprite_js__WEBPACK_IMPORTED_MODULE_1__.Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: mapImage
});
const foreground = new _Sprite_js__WEBPACK_IMPORTED_MODULE_1__.Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
});
const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
};
const movables = [background, ...boundaries, foreground, ...battleZones];
function rectangularCollision({
  rectangle1,
  rectangle2
}) {
  return rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y;
}
const battleScene = new _Battle_js__WEBPACK_IMPORTED_MODULE_2__.Battle(ctx, animate);
function animate() {
  const animationId = window.requestAnimationFrame(animate);
  background.draw(ctx);
  boundaries.forEach(bounday => {
    bounday.draw(ctx);
  });
  battleZones.forEach(battleZone => {
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
      const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y));
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: battleZone
      }) && overlappingArea > player.width * player.height / 2 && Math.random() < 0.01) {
        //deactivate current animation loop
        window.cancelAnimationFrame(animationId);
        _data_audio_js__WEBPACK_IMPORTED_MODULE_3__.audio.map.stop();
        _data_audio_js__WEBPACK_IMPORTED_MODULE_3__.audio.initBattle.play();
        _data_audio_js__WEBPACK_IMPORTED_MODULE_3__.audio.battle.play();
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
                gsap.to('#canvas-overlay', {
                  opacity: 0,
                  duration: 0.4
                });
              }
            });
          }
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
        if (rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...bounday,
            position: {
              x: bounday.position.x,
              y: bounday.position.y + 3
            }
          }
        })) {
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach(movable => movable.position.y += 3);
    }
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true;
    player.image = player.sprites.left;
    {
      for (let i = 0; i < boundaries.length; i++) {
        const bounday = boundaries[i];
        if (rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...bounday,
            position: {
              x: bounday.position.x + 3,
              y: bounday.position.y
            }
          }
        })) {
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach(movable => movable.position.x += 3);
    }
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true;
    player.image = player.sprites.right;
    {
      for (let i = 0; i < boundaries.length; i++) {
        const bounday = boundaries[i];
        if (rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...bounday,
            position: {
              x: bounday.position.x - 3,
              y: bounday.position.y
            }
          }
        })) {
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach(movable => movable.position.x -= 3);
    }
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true;
    player.image = player.sprites.down;
    {
      for (let i = 0; i < boundaries.length; i++) {
        const bounday = boundaries[i];
        if (rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...bounday,
            position: {
              x: bounday.position.x,
              y: bounday.position.y - 3
            }
          }
        })) {
          moving = false;
          break;
        }
      }
      if (moving) movables.forEach(movable => movable.position.y -= 3);
    }
  }
}
animate();

//battleScene.initBattle();
//battleScene.animateBattle();

let lastKey = '';
window.addEventListener('keydown', e => {
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
window.addEventListener('keyup', e => {
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

//no autoplay policy of browsers
let clicked = false;
window.addEventListener('click', () => {
  if (!clicked) {
    _data_audio_js__WEBPACK_IMPORTED_MODULE_3__.audio.map.play();
    clicked = true;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TkYsSUFBSSxDQUFDSyxDQUFDLENBQUNILE9BQU8sR0FBRyxLQUFLO01BQ3RCO0VBQ0o7QUFDRixDQUFDLENBQUM7O0FBRUY7QUFDQSxJQUFJaUIsT0FBTyxHQUFHLEtBQUs7QUFDbkJqRyxNQUFNLENBQUN4QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUNyQyxJQUFJLENBQUN5SSxPQUFPLEVBQUU7SUFDWmhLLGlEQUFLLENBQUNzRCxHQUFHLENBQUNDLElBQUksQ0FBQyxDQUFDO0lBQ2hCeUcsT0FBTyxHQUFHLElBQUk7RUFDaEI7QUFDRixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9CYXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0JvdW5kYXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9Nb25zdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RhdGEvYXR0YWNrcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGF0YS9hdWRpby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGF0YS9tb25zdGVycy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSAnLi9TcHJpdGUuanMnO1xyXG5pbXBvcnQgeyBNb25zdGVyIH0gZnJvbSAnLi9Nb25zdGVyLmpzJztcclxuaW1wb3J0IHsgYXR0YWNrcyB9IGZyb20gJy4vZGF0YS9hdHRhY2tzLmpzJztcclxuaW1wb3J0IHsgbW9uc3RlcnMgfSBmcm9tICcuL2RhdGEvbW9uc3RlcnMuanMnO1xyXG5pbXBvcnQgeyBhdWRpbyB9IGZyb20gJy4vZGF0YS9hdWRpby5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0dGxlIHtcclxuICAjYW5pbWF0aW9uSWQ7XHJcbiAgI2FuaW1hdGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGN0eCwgYW5pbWF0ZSkge1xyXG4gICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICB0aGlzLnJlbmRlcmVkU3ByaXRlcyA9IFtdO1xyXG4gICAgdGhpcy5hdHRhY2tzID0gYXR0YWNrcztcclxuICAgIHRoaXMuI2FuaW1hdGlvbklkID0gMDtcclxuICAgIHRoaXMuI2FuaW1hdGUgPSBhbmltYXRlO1xyXG5cclxuICAgIHRoaXMuYmF0dGxlQmFja2dyb3VuZEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICB0aGlzLmJhdHRsZUJhY2tncm91bmRJbWFnZS5zcmMgPSAnLi9hc3NldHMvYmF0dGxlQmFja2dyb3VuZC5wbmcnO1xyXG4gICAgdGhpcy5iYXR0bGVCYWNrZ3JvdW5kID0gbmV3IFNwcml0ZSh7XHJcbiAgICAgIHBvc2l0aW9uOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgaW1hZ2U6IHRoaXMuYmF0dGxlQmFja2dyb3VuZEltYWdlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5kcmFnZ2xlID0gbnVsbDtcclxuICAgIHRoaXMuZW1ieSA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xyXG5cclxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgdGhpcy5pbml0aWF0ZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICBjb25zdCBkaWFsb2d1ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2d1ZS1ib3gnKTtcclxuICAgIGRpYWxvZ3VlQm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMucXVldWVbMF0oKTtcclxuICAgICAgICB0aGlzLnF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgIH0gZWxzZSBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEJhdHRsZSgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyLWludGVyZmFjZScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpYWxvZ3VlLWJveCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5lbXktaGVhbHRoLWJhcicpLnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1oZWFsdGgtYmFyJykuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXR0YWNrcy1jb250YWluZXInKS5yZXBsYWNlQ2hpbGRyZW4oKTtcclxuXHJcbiAgICB0aGlzLmRyYWdnbGUgPSBuZXcgTW9uc3Rlcihtb25zdGVycy5EcmFnZ2xlKTtcclxuICAgIHRoaXMuZW1ieSA9IG5ldyBNb25zdGVyKG1vbnN0ZXJzLkVtYnkpO1xyXG4gICAgdGhpcy5yZW5kZXJlZFNwcml0ZXMgPSBbdGhpcy5kcmFnZ2xlLCB0aGlzLmVtYnldO1xyXG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xyXG5cclxuICAgIHRoaXMuZW1ieS5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xyXG4gICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgYnV0dG9uLmlubmVySFRNTCA9IGF0dGFjay5uYW1lO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXR0YWNrcy1jb250YWluZXInKS5hcHBlbmQoYnV0dG9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEF0dGFjayA9IHRoaXMuYXR0YWNrc1tlLmN1cnJlbnRUYXJnZXQuaW5uZXJIVE1MXTtcclxuICAgICAgICB0aGlzLmVtYnkuYXR0YWNrKHtcclxuICAgICAgICAgIGF0dGFjazogc2VsZWN0ZWRBdHRhY2ssXHJcbiAgICAgICAgICByZWNpcGllbnQ6IHRoaXMuZHJhZ2dsZSxcclxuICAgICAgICAgIHJlbmRlcmVkU3ByaXRlczogdGhpcy5yZW5kZXJlZFNwcml0ZXMsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRyYWdnbGUuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgIHRoaXMucXVldWUucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dsZS5mYWludCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgICBnc2FwLnRvKCcjY2FudmFzLW92ZXJsYXknLCB7XHJcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLiNhbmltYXRpb25JZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiNhbmltYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci1pbnRlcmZhY2UnKS5zdHlsZS5kaXNwbGF5ID1cclxuICAgICAgICAgICAgICAgICAgJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgZ3NhcC50bygnI2NhbnZhcy1vdmVybGF5JywgeyBvcGFjaXR5OiAwIH0pO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgYXVkaW8ubWFwLnBsYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9XHJcbiAgICAgICAgICB0aGlzLmRyYWdnbGUuYXR0YWNrc1tcclxuICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kcmFnZ2xlLmF0dGFja3MubGVuZ3RoKVxyXG4gICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZHJhZ2dsZS5hdHRhY2soe1xyXG4gICAgICAgICAgICBhdHRhY2s6IHJhbmRvbUF0dGFjayxcclxuICAgICAgICAgICAgcmVjaXBpZW50OiB0aGlzLmVtYnksXHJcbiAgICAgICAgICAgIHJlbmRlcmVkU3ByaXRlczogdGhpcy5yZW5kZXJlZFNwcml0ZXMsXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5lbWJ5LmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVldWUucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbWJ5LmZhaW50KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGdzYXAudG8oJyNjYW52YXMtb3ZlcmxheScsIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuI2FuaW1hdGlvbklkKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy4jYW5pbWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci1pbnRlcmZhY2UnKS5zdHlsZS5kaXNwbGF5ID1cclxuICAgICAgICAgICAgICAgICAgICAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgIGdzYXAudG8oJyNjYW52YXMtb3ZlcmxheScsIHsgb3BhY2l0eTogMCB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhdWRpby5tYXAucGxheSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEF0dGFjayA9IHRoaXMuYXR0YWNrc1tlLmN1cnJlbnRUYXJnZXQuaW5uZXJIVE1MXTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXR0YWNrLXR5cGUnKS5pbm5lckhUTUwgPSBzZWxlY3RlZEF0dGFjay50eXBlO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdHRhY2stdHlwZScpLnN0eWxlLmNvbG9yID1cclxuICAgICAgICAgIHNlbGVjdGVkQXR0YWNrLmNvbG9yO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYW5pbWF0ZUJhdHRsZSgpIHtcclxuICAgIHRoaXMuI2FuaW1hdGlvbklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxyXG4gICAgICB0aGlzLmFuaW1hdGVCYXR0bGUoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmJhdHRsZUJhY2tncm91bmQuZHJhdyh0aGlzLmN0eCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlZFNwcml0ZXMuZm9yRWFjaCgoc3ByaXRlKSA9PiB7XHJcbiAgICAgIHNwcml0ZS5kcmF3KHRoaXMuY3R4KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQm91bmRhcnkge1xuICBzdGF0aWMgd2lkdGggPSA0ODtcbiAgc3RhdGljIGhlaWdodCA9IDQ4O1xuICBjb25zdHJ1Y3Rvcih7IHBvc2l0aW9uIH0pIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy53aWR0aCA9IDQ4O1xuICAgIHRoaXMuaGVpZ2h0ID0gNDg7XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyNTUsIDAsIDAsIDApJztcbiAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSAnLi9TcHJpdGUuanMnO1xuaW1wb3J0IHsgYXVkaW8gfSBmcm9tICcuL2RhdGEvYXVkaW8uanMnO1xuXG5leHBvcnQgY2xhc3MgTW9uc3RlciBleHRlbmRzIFNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBwb3NpdGlvbixcbiAgICBpbWFnZSxcbiAgICBmcmFtZXMgPSB7IG1heDogMSwgaG9sZDogMTAgfSxcbiAgICBzcHJpdGVzLFxuICAgIGFuaW1hdGUgPSBmYWxzZSxcbiAgICByb3RhdGlvbiA9IDAsXG4gICAgaXNFbmVteSA9IGZhbHNlLFxuICAgIG5hbWUsXG4gICAgYXR0YWNrcyxcbiAgfSkge1xuICAgIHN1cGVyKHsgcG9zaXRpb24sIGltYWdlLCBmcmFtZXMsIHNwcml0ZXMsIGFuaW1hdGUsIHJvdGF0aW9uIH0pO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuaXNFbmVteSA9IGlzRW5lbXk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmF0dGFja3MgPSBhdHRhY2tzO1xuICB9XG5cbiAgZmFpbnQoKSB7XG4gICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlhbG9ndWUtYm94Jyk7XG4gICAgZGlhbG9ndWVCb3guaW5uZXJIVE1MID0gYCR7dGhpcy5uYW1lfSBmYWludGVkIWA7XG4gICAgZ3NhcC50byh0aGlzLnBvc2l0aW9uLCB7IHk6IHRoaXMucG9zaXRpb24ueSArIDIwIH0pO1xuICAgIGdzYXAudG8odGhpcywgeyBvcGFjaXR5OiAwIH0pO1xuICAgIGF1ZGlvLmJhdHRsZS5zdG9wKCk7XG4gICAgYXVkaW8udmljdG9yeS5wbGF5KCk7XG4gIH1cblxuICBhdHRhY2soeyBhdHRhY2ssIHJlY2lwaWVudCwgcmVuZGVyZWRTcHJpdGVzIH0pIHtcbiAgICBjb25zdCBkaWFsb2d1ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2d1ZS1ib3gnKTtcbiAgICBkaWFsb2d1ZUJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBkaWFsb2d1ZUJveC5pbm5lckhUTUwgPSBgJHt0aGlzLm5hbWV9IHVzZWQgJHthdHRhY2submFtZX1gO1xuXG4gICAgbGV0IGhlYWx0aEJhciA9ICcjZW5lbXktaGVhbHRoLWJhcic7XG4gICAgaWYgKHRoaXMuaXNFbmVteSkgaGVhbHRoQmFyID0gJyNwbGF5ZXItaGVhbHRoLWJhcic7XG5cbiAgICBsZXQgcm90YXRpb24gPSAxO1xuICAgIGlmICh0aGlzLmlzRW5lbXkpIHJvdGF0aW9uID0gLTIuMjtcblxuICAgIHJlY2lwaWVudC5oZWFsdGggLT0gYXR0YWNrLmRhbWFnZTtcblxuICAgIHN3aXRjaCAoYXR0YWNrLm5hbWUpIHtcbiAgICAgIGNhc2UgJ0ZpcmViYWxsJzpcbiAgICAgICAgYXVkaW8uaW5pdEZpcmViYWxsLnBsYXkoKTtcbiAgICAgICAgY29uc3QgZmlyZWJhbGxJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBmaXJlYmFsbEltYWdlLnNyYyA9ICcuL2Fzc2V0cy9maXJlYmFsbC5wbmcnO1xuICAgICAgICBjb25zdCBmaXJlYmFsbCA9IG5ldyBTcHJpdGUoe1xuICAgICAgICAgIHBvc2l0aW9uOiB7IHg6IHRoaXMucG9zaXRpb24ueCwgeTogdGhpcy5wb3NpdGlvbi55IH0sXG4gICAgICAgICAgaW1hZ2U6IGZpcmViYWxsSW1hZ2UsXG4gICAgICAgICAgZnJhbWVzOiB7XG4gICAgICAgICAgICBtYXg6IDQsXG4gICAgICAgICAgICBob2xkOiAxMCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICAgICAgcm90YXRpb24sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlbmRlcmVkU3ByaXRlcy5zcGxpY2UoMSwgMCwgZmlyZWJhbGwpO1xuXG4gICAgICAgIGdzYXAudG8oZmlyZWJhbGwucG9zaXRpb24sIHtcbiAgICAgICAgICB4OiByZWNpcGllbnQucG9zaXRpb24ueCxcbiAgICAgICAgICB5OiByZWNpcGllbnQucG9zaXRpb24ueSxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAvL2VuZW15IGdldHMgaGl0XG4gICAgICAgICAgICBhdWRpby5maXJlYmFsbEhpdC5wbGF5KCk7XG4gICAgICAgICAgICBnc2FwLnRvKGhlYWx0aEJhciwge1xuICAgICAgICAgICAgICB3aWR0aDogcmVjaXBpZW50LmhlYWx0aCArICclJyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnc2FwLnRvKHJlY2lwaWVudC5wb3NpdGlvbiwge1xuICAgICAgICAgICAgICB4OiByZWNpcGllbnQucG9zaXRpb24ueCArIDEwLFxuICAgICAgICAgICAgICB5b3lvOiB0cnVlLFxuICAgICAgICAgICAgICByZXBlYXQ6IDUsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjA4LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdzYXAudG8ocmVjaXBpZW50LCB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgIHJlcGVhdDogNSxcbiAgICAgICAgICAgICAgeW95bzogdHJ1ZSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDAuMDgsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlbmRlcmVkU3ByaXRlcy5zcGxpY2UoMSwgMSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdUYWNrbGUnOlxuICAgICAgICBjb25zdCB0bCA9IGdzYXAudGltZWxpbmUoKTtcblxuICAgICAgICBsZXQgbW92ZW1lbnREaXN0YW5jZSA9IDIwO1xuICAgICAgICBpZiAodGhpcy5pc0VuZW15KSBtb3ZlbWVudERpc3RhbmNlID0gLTIwO1xuXG4gICAgICAgIHRsLnRvKHRoaXMucG9zaXRpb24sIHtcbiAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLnggLSBtb3ZlbWVudERpc3RhbmNlLFxuICAgICAgICB9KVxuICAgICAgICAgIC50byh0aGlzLnBvc2l0aW9uLCB7XG4gICAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLnggKyBtb3ZlbWVudERpc3RhbmNlICogMixcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjEsXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIC8vZW5lbXkgZ2V0cyBoaXRcbiAgICAgICAgICAgICAgYXVkaW8udGFja2xlSGl0LnBsYXkoKTtcbiAgICAgICAgICAgICAgZ3NhcC50byhoZWFsdGhCYXIsIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcmVjaXBpZW50LmhlYWx0aCArICclJyxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgZ3NhcC50byhyZWNpcGllbnQucG9zaXRpb24sIHtcbiAgICAgICAgICAgICAgICB4OiByZWNpcGllbnQucG9zaXRpb24ueCArIDEwLFxuICAgICAgICAgICAgICAgIHlveW86IHRydWUsXG4gICAgICAgICAgICAgICAgcmVwZWF0OiA1LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjA4LFxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBnc2FwLnRvKHJlY2lwaWVudCwge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgcmVwZWF0OiA1LFxuICAgICAgICAgICAgICAgIHlveW86IHRydWUsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuMDgsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50byh0aGlzLnBvc2l0aW9uLCB7IHg6IHRoaXMucG9zaXRpb24ueCB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU3ByaXRlIHtcclxuICBjb25zdHJ1Y3Rvcih7XHJcbiAgICBwb3NpdGlvbixcclxuICAgIGltYWdlLFxyXG4gICAgZnJhbWVzID0geyBtYXg6IDEsIGhvbGQ6IDEwIH0sXHJcbiAgICBzcHJpdGVzLFxyXG4gICAgYW5pbWF0ZSA9IGZhbHNlLFxyXG4gICAgcm90YXRpb24gPSAwLFxyXG4gIH0pIHtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIHRoaXMuZnJhbWVzID0geyAuLi5mcmFtZXMsIHZhbDogMCwgZWxhcHNlZDogMCB9O1xyXG4gICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoIC8gdGhpcy5mcmFtZXMubWF4O1xyXG4gICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgfTtcclxuICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2Uuc3JjO1xyXG4gICAgdGhpcy5hbmltYXRlID0gYW5pbWF0ZTtcclxuICAgIHRoaXMuc3ByaXRlcyA9IHNwcml0ZXM7XHJcbiAgICB0aGlzLm9wYWNpdHkgPSAxO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gIH1cclxuXHJcbiAgZHJhdyhjdHgpIHtcclxuICAgIGN0eC5zYXZlKCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKFxyXG4gICAgICB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoIC8gMixcclxuICAgICAgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgLyAyXHJcbiAgICApO1xyXG4gICAgY3R4LnJvdGF0ZSh0aGlzLnJvdGF0aW9uKTtcclxuICAgIGN0eC50cmFuc2xhdGUoXHJcbiAgICAgIC10aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoIC8gMixcclxuICAgICAgLXRoaXMucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0IC8gMlxyXG4gICAgKTtcclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMub3BhY2l0eTtcclxuICAgIGN0eC5kcmF3SW1hZ2UoXHJcbiAgICAgIHRoaXMuaW1hZ2UsXHJcbiAgICAgIHRoaXMuZnJhbWVzLnZhbCAqIHRoaXMud2lkdGgsXHJcbiAgICAgIDAsXHJcbiAgICAgIHRoaXMuaW1hZ2Uud2lkdGggLyB0aGlzLmZyYW1lcy5tYXgsXHJcbiAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0LFxyXG4gICAgICB0aGlzLnBvc2l0aW9uLngsXHJcbiAgICAgIHRoaXMucG9zaXRpb24ueSxcclxuICAgICAgdGhpcy5pbWFnZS53aWR0aCAvIHRoaXMuZnJhbWVzLm1heCxcclxuICAgICAgdGhpcy5pbWFnZS5oZWlnaHRcclxuICAgICk7XHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG5cclxuICAgIGlmICghdGhpcy5hbmltYXRlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuZnJhbWVzLm1heCA+IDEpIHtcclxuICAgICAgdGhpcy5mcmFtZXMuZWxhcHNlZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZyYW1lcy5lbGFwc2VkICUgdGhpcy5mcmFtZXMuaG9sZCA9PT0gMClcclxuICAgICAgaWYgKHRoaXMuZnJhbWVzLnZhbCA8IHRoaXMuZnJhbWVzLm1heCAtIDEpIHRoaXMuZnJhbWVzLnZhbCsrO1xyXG4gICAgICBlbHNlIHRoaXMuZnJhbWVzLnZhbCA9IDA7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBhdHRhY2tzID0ge1xyXG4gIFRhY2tsZToge1xyXG4gICAgbmFtZTogJ1RhY2tsZScsXHJcbiAgICBkYW1hZ2U6IDEwLFxyXG4gICAgdHlwZTogJ05vcm1hbCcsXHJcbiAgICBjb2xvcjogJ2JsYWNrJyxcclxuICB9LFxyXG4gIEZpcmViYWxsOiB7XHJcbiAgICBuYW1lOiAnRmlyZWJhbGwnLFxyXG4gICAgZGFtYWdlOiAyNSxcclxuICAgIHR5cGU6ICdGaXJlJyxcclxuICAgIGNvbG9yOiAncmVkJyxcclxuICB9LFxyXG59O1xyXG4iLCJjb25zdCBkZWZhdWx0Vm9sdW1lID0gMC4xO1xuY29uc3QgaGlnaFZvbHVtZSA9IDAuNTtcbmNvbnN0IHByb2QgPSAnaHR0cHM6Ly9hdGFyaS1tb25rLmdpdGh1Yi5pby9wb2tlbW9uLXR1dG9yaWFsL2Fzc2V0cy9hdWRpby8nO1xuY29uc3QgbG9jYWwgPSAnLi8uLi8uLi9hc3NldHMvYXVkaW8vJztcbmNvbnN0IGlzUHJvZCA9IHRydWU7XG5jb25zdCBob3N0ID0gaXNQcm9kID8gcHJvZCA6IGxvY2FsO1xuZXhwb3J0IGNvbnN0IGF1ZGlvID0ge1xuICBtYXA6IG5ldyBIb3dsKHtcbiAgICBzcmM6IGhvc3QgKyAnbWFwLndhdicsXG4gICAgaHRtbDU6IHRydWUsXG4gICAgdm9sdW1lOiBkZWZhdWx0Vm9sdW1lLFxuICB9KSxcbiAgaW5pdEJhdHRsZTogbmV3IEhvd2woe1xuICAgIHNyYzogaG9zdCArICdpbml0QmF0dGxlLndhdicsXG4gICAgaHRtbDU6IHRydWUsXG4gICAgdm9sdW1lOiBkZWZhdWx0Vm9sdW1lLFxuICB9KSxcbiAgYmF0dGxlOiBuZXcgSG93bCh7XG4gICAgc3JjOiBob3N0ICsgJ2JhdHRsZS5tcDMnLFxuICAgIGh0bWw1OiB0cnVlLFxuICAgIHZvbHVtZTogZGVmYXVsdFZvbHVtZSxcbiAgfSksXG4gIHRhY2tsZUhpdDogbmV3IEhvd2woe1xuICAgIHNyYzogaG9zdCArICd0YWNrbGVIaXQud2F2JyxcbiAgICBodG1sNTogdHJ1ZSxcbiAgICB2b2x1bWU6IGRlZmF1bHRWb2x1bWUsXG4gIH0pLFxuICBmaXJlYmFsbEhpdDogbmV3IEhvd2woe1xuICAgIHNyYzogaG9zdCArICdmaXJlYmFsbEhpdC53YXYnLFxuICAgIGh0bWw1OiB0cnVlLFxuICAgIHZvbHVtZTogZGVmYXVsdFZvbHVtZSxcbiAgfSksXG4gIGluaXRGaXJlYmFsbDogbmV3IEhvd2woe1xuICAgIHNyYzogaG9zdCArICdpbml0RmlyZWJhbGwud2F2JyxcbiAgICBodG1sNTogdHJ1ZSxcbiAgICB2b2x1bWU6IGRlZmF1bHRWb2x1bWUsXG4gIH0pLFxuICB2aWN0b3J5OiBuZXcgSG93bCh7XG4gICAgc3JjOiBob3N0ICsgJ3ZpY3Rvcnkud2F2JyxcbiAgICBodG1sNTogdHJ1ZSxcbiAgICB2b2x1bWU6IGhpZ2hWb2x1bWUsXG4gIH0pLFxufTtcbiIsImltcG9ydCB7IGF0dGFja3MgfSBmcm9tICcuL2F0dGFja3MuanMnO1xuXG5leHBvcnQgY29uc3QgbW9uc3RlcnMgPSB7XG4gIEVtYnk6IHtcbiAgICBwb3NpdGlvbjogeyB4OiAyODAsIHk6IDMyNSB9LFxuICAgIGltYWdlOiB7IHNyYzogJy4vYXNzZXRzL2VtYnlTcHJpdGUucG5nJyB9LFxuICAgIGZyYW1lczogeyBtYXg6IDQsIGhvbGQ6IDMwIH0sXG4gICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICBuYW1lOiAnRW1ieScsXG4gICAgYXR0YWNrczogW2F0dGFja3MuVGFja2xlLCBhdHRhY2tzLkZpcmViYWxsXSxcbiAgfSxcbiAgRHJhZ2dsZToge1xuICAgIHBvc2l0aW9uOiB7IHg6IDgwMCwgeTogMTAwIH0sXG4gICAgaW1hZ2U6IHsgc3JjOiAnLi9hc3NldHMvZHJhZ2dsZVNwcml0ZS5wbmcnIH0sXG4gICAgZnJhbWVzOiB7IG1heDogNCwgaG9sZDogMzAgfSxcbiAgICBhbmltYXRlOiB0cnVlLFxuICAgIGlzRW5lbXk6IHRydWUsXG4gICAgbmFtZTogJ0RyYWdnbGUnLFxuICAgIGF0dGFja3M6IFthdHRhY2tzLlRhY2tsZSwgYXR0YWNrcy5GaXJlYmFsbF0sXG4gIH0sXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBCb3VuZGFyeSB9IGZyb20gJy4vQm91bmRhcnkuanMnO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tICcuL1Nwcml0ZS5qcyc7XHJcbmltcG9ydCB7IEJhdHRsZSB9IGZyb20gJy4vQmF0dGxlLmpzJztcclxuaW1wb3J0IHsgYXVkaW8gfSBmcm9tICcuL2RhdGEvYXVkaW8uanMnO1xyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XHJcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5jYW52YXMud2lkdGggPSAxMDI0O1xyXG5jYW52YXMuaGVpZ2h0ID0gNTc2O1xyXG5cclxuY29uc3QgY29sbGlzaW9uc01hcCA9IFtdO1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IGNvbGxpc2lvbnMubGVuZ3RoOyBpICs9IDcwKSB7XHJcbiAgY29sbGlzaW9uc01hcC5wdXNoKGNvbGxpc2lvbnMuc2xpY2UoaSwgNzAgKyBpKSk7XHJcbn1cclxuXHJcbmNvbnN0IGJhdHRsZVpvbmVzTWFwID0gW107XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgYmF0dGxlWm9uZXNEYXRhLmxlbmd0aDsgaSArPSA3MCkge1xyXG4gIGJhdHRsZVpvbmVzTWFwLnB1c2goYmF0dGxlWm9uZXNEYXRhLnNsaWNlKGksIDcwICsgaSkpO1xyXG59XHJcblxyXG5jb25zdCBib3VuZGFyaWVzID0gW107XHJcblxyXG5jb25zdCBvZmZzZXQgPSB7XHJcbiAgeDogLTczNSxcclxuICB5OiAtNjUwLFxyXG59O1xyXG5cclxuY29sbGlzaW9uc01hcC5mb3JFYWNoKChyb3csIGkpID0+IHtcclxuICByb3cuZm9yRWFjaCgoc3ltYm9sLCBqKSA9PiB7XHJcbiAgICBpZiAoc3ltYm9sID09PSAxMDI1KVxyXG4gICAgICBib3VuZGFyaWVzLnB1c2goXHJcbiAgICAgICAgbmV3IEJvdW5kYXJ5KHtcclxuICAgICAgICAgIHBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIHg6IGogKiBCb3VuZGFyeS53aWR0aCArIG9mZnNldC54LFxyXG4gICAgICAgICAgICB5OiBpICogQm91bmRhcnkuaGVpZ2h0ICsgb2Zmc2V0LnksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuY29uc3QgYmF0dGxlWm9uZXMgPSBbXTtcclxuXHJcbmJhdHRsZVpvbmVzTWFwLmZvckVhY2goKHJvdywgaSkgPT4ge1xyXG4gIHJvdy5mb3JFYWNoKChzeW1ib2wsIGopID0+IHtcclxuICAgIGlmIChzeW1ib2wgPT09IDEwMjUpXHJcbiAgICAgIGJhdHRsZVpvbmVzLnB1c2goXHJcbiAgICAgICAgbmV3IEJvdW5kYXJ5KHtcclxuICAgICAgICAgIHBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIHg6IGogKiBCb3VuZGFyeS53aWR0aCArIG9mZnNldC54LFxyXG4gICAgICAgICAgICB5OiBpICogQm91bmRhcnkuaGVpZ2h0ICsgb2Zmc2V0LnksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuY29uc3QgbWFwSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxubWFwSW1hZ2Uuc3JjID0gJy4vYXNzZXRzL1BlbGxldCBUb3duLnBuZyc7XHJcblxyXG5jb25zdCBmb3JlZ3JvdW5kSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuZm9yZWdyb3VuZEltYWdlLnNyYyA9ICcuL2Fzc2V0cy9mb3JlZ3JvdW5kT2JqZWN0cy5wbmcnO1xyXG5cclxuY29uc3QgcGxheWVyRG93bkltYWdlID0gbmV3IEltYWdlKCk7XHJcbnBsYXllckRvd25JbWFnZS5zcmMgPSAnLi9hc3NldHMvcGxheWVyRG93bi5wbmcnO1xyXG5jb25zdCBwbGF5ZXJVcEltYWdlID0gbmV3IEltYWdlKCk7XHJcbnBsYXllclVwSW1hZ2Uuc3JjID0gJy4vYXNzZXRzL3BsYXllclVwLnBuZyc7XHJcbmNvbnN0IHBsYXllckxlZnRJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5wbGF5ZXJMZWZ0SW1hZ2Uuc3JjID0gJy4vYXNzZXRzL3BsYXllckxlZnQucG5nJztcclxuY29uc3QgcGxheWVyUmlnaHRJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5wbGF5ZXJSaWdodEltYWdlLnNyYyA9ICcuL2Fzc2V0cy9wbGF5ZXJSaWdodC5wbmcnO1xyXG5cclxuY29uc3QgcGxheWVyID0gbmV3IFNwcml0ZSh7XHJcbiAgcG9zaXRpb246IHtcclxuICAgIHg6IGNhbnZhcy53aWR0aCAvIDIgLSAxOTIgLyA0IC8gMixcclxuICAgIHk6IGNhbnZhcy5oZWlnaHQgLyAyIC0gNjggLyAyLFxyXG4gIH0sXHJcbiAgaW1hZ2U6IHBsYXllckRvd25JbWFnZSxcclxuICBmcmFtZXM6IHsgbWF4OiA0LCBob2xkOiAxMCB9LFxyXG4gIHNwcml0ZXM6IHtcclxuICAgIHVwOiBwbGF5ZXJVcEltYWdlLFxyXG4gICAgZG93bjogcGxheWVyRG93bkltYWdlLFxyXG4gICAgbGVmdDogcGxheWVyTGVmdEltYWdlLFxyXG4gICAgcmlnaHQ6IHBsYXllclJpZ2h0SW1hZ2UsXHJcbiAgfSxcclxufSk7XHJcblxyXG5jb25zdCBiYWNrZ3JvdW5kID0gbmV3IFNwcml0ZSh7XHJcbiAgcG9zaXRpb246IHsgeDogb2Zmc2V0LngsIHk6IG9mZnNldC55IH0sXHJcbiAgaW1hZ2U6IG1hcEltYWdlLFxyXG59KTtcclxuXHJcbmNvbnN0IGZvcmVncm91bmQgPSBuZXcgU3ByaXRlKHtcclxuICBwb3NpdGlvbjogeyB4OiBvZmZzZXQueCwgeTogb2Zmc2V0LnkgfSxcclxuICBpbWFnZTogZm9yZWdyb3VuZEltYWdlLFxyXG59KTtcclxuXHJcbmNvbnN0IGtleXMgPSB7XHJcbiAgdzoge1xyXG4gICAgcHJlc3NlZDogZmFsc2UsXHJcbiAgfSxcclxuICBhOiB7XHJcbiAgICBwcmVzc2VkOiBmYWxzZSxcclxuICB9LFxyXG4gIHM6IHtcclxuICAgIHByZXNzZWQ6IGZhbHNlLFxyXG4gIH0sXHJcbiAgZDoge1xyXG4gICAgcHJlc3NlZDogZmFsc2UsXHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IG1vdmFibGVzID0gW2JhY2tncm91bmQsIC4uLmJvdW5kYXJpZXMsIGZvcmVncm91bmQsIC4uLmJhdHRsZVpvbmVzXTtcclxuXHJcbmZ1bmN0aW9uIHJlY3Rhbmd1bGFyQ29sbGlzaW9uKHsgcmVjdGFuZ2xlMSwgcmVjdGFuZ2xlMiB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIHJlY3RhbmdsZTEucG9zaXRpb24ueCArIHJlY3RhbmdsZTEud2lkdGggPj0gcmVjdGFuZ2xlMi5wb3NpdGlvbi54ICYmXHJcbiAgICByZWN0YW5nbGUxLnBvc2l0aW9uLnggPD0gcmVjdGFuZ2xlMi5wb3NpdGlvbi54ICsgcmVjdGFuZ2xlMi53aWR0aCAmJlxyXG4gICAgcmVjdGFuZ2xlMS5wb3NpdGlvbi55IDw9IHJlY3RhbmdsZTIucG9zaXRpb24ueSArIHJlY3RhbmdsZTIuaGVpZ2h0ICYmXHJcbiAgICByZWN0YW5nbGUxLnBvc2l0aW9uLnkgKyByZWN0YW5nbGUxLmhlaWdodCA+PSByZWN0YW5nbGUyLnBvc2l0aW9uLnlcclxuICApO1xyXG59XHJcblxyXG5jb25zdCBiYXR0bGVTY2VuZSA9IG5ldyBCYXR0bGUoY3R4LCBhbmltYXRlKTtcclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgY29uc3QgYW5pbWF0aW9uSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gIGJhY2tncm91bmQuZHJhdyhjdHgpO1xyXG4gIGJvdW5kYXJpZXMuZm9yRWFjaCgoYm91bmRheSkgPT4ge1xyXG4gICAgYm91bmRheS5kcmF3KGN0eCk7XHJcbiAgfSk7XHJcbiAgYmF0dGxlWm9uZXMuZm9yRWFjaCgoYmF0dGxlWm9uZSkgPT4ge1xyXG4gICAgYmF0dGxlWm9uZS5kcmF3KGN0eCk7XHJcbiAgfSk7XHJcbiAgcGxheWVyLmRyYXcoY3R4KTtcclxuICBmb3JlZ3JvdW5kLmRyYXcoY3R4KTtcclxuXHJcbiAgbGV0IG1vdmluZyA9IHRydWU7XHJcbiAgcGxheWVyLmFuaW1hdGUgPSBmYWxzZTtcclxuXHJcbiAgaWYgKGJhdHRsZVNjZW5lLmluaXRpYXRlZCkgcmV0dXJuO1xyXG5cclxuICAvL2FjdGl2YXRlIGEgYmF0dGxlXHJcbiAgaWYgKGtleXMudy5wcmVzc2VkIHx8IGtleXMuYS5wcmVzc2VkIHx8IGtleXMucy5wcmVzc2VkIHx8IGtleXMuZC5wcmVzc2VkKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhdHRsZVpvbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGJhdHRsZVpvbmUgPSBiYXR0bGVab25lc1tpXTtcclxuICAgICAgY29uc3Qgb3ZlcmxhcHBpbmdBcmVhID1cclxuICAgICAgICAoTWF0aC5taW4oXHJcbiAgICAgICAgICBwbGF5ZXIucG9zaXRpb24ueCArIHBsYXllci53aWR0aCxcclxuICAgICAgICAgIGJhdHRsZVpvbmUucG9zaXRpb24ueCArIGJhdHRsZVpvbmUud2lkdGhcclxuICAgICAgICApIC1cclxuICAgICAgICAgIE1hdGgubWF4KHBsYXllci5wb3NpdGlvbi54LCBiYXR0bGVab25lLnBvc2l0aW9uLngpKSAqXHJcbiAgICAgICAgKE1hdGgubWluKFxyXG4gICAgICAgICAgcGxheWVyLnBvc2l0aW9uLnkgKyBwbGF5ZXIuaGVpZ2h0LFxyXG4gICAgICAgICAgYmF0dGxlWm9uZS5wb3NpdGlvbi55ICsgYmF0dGxlWm9uZS5oZWlnaHRcclxuICAgICAgICApIC1cclxuICAgICAgICAgIE1hdGgubWF4KHBsYXllci5wb3NpdGlvbi55LCBiYXR0bGVab25lLnBvc2l0aW9uLnkpKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHJlY3Rhbmd1bGFyQ29sbGlzaW9uKHtcclxuICAgICAgICAgIHJlY3RhbmdsZTE6IHBsYXllcixcclxuICAgICAgICAgIHJlY3RhbmdsZTI6IGJhdHRsZVpvbmUsXHJcbiAgICAgICAgfSkgJiZcclxuICAgICAgICBvdmVybGFwcGluZ0FyZWEgPiAocGxheWVyLndpZHRoICogcGxheWVyLmhlaWdodCkgLyAyICYmXHJcbiAgICAgICAgTWF0aC5yYW5kb20oKSA8IDAuMDFcclxuICAgICAgKSB7XHJcbiAgICAgICAgLy9kZWFjdGl2YXRlIGN1cnJlbnQgYW5pbWF0aW9uIGxvb3BcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uSWQpO1xyXG5cclxuICAgICAgICBhdWRpby5tYXAuc3RvcCgpO1xyXG4gICAgICAgIGF1ZGlvLmluaXRCYXR0bGUucGxheSgpO1xyXG4gICAgICAgIGF1ZGlvLmJhdHRsZS5wbGF5KCk7XHJcblxyXG4gICAgICAgIGJhdHRsZVNjZW5lLmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICAgICAgZ3NhcC50bygnI2NhbnZhcy1vdmVybGF5Jywge1xyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIHJlcGVhdDogMyxcclxuICAgICAgICAgIHlveW86IHRydWUsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMC40LFxyXG4gICAgICAgICAgb25Db21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgZ3NhcC50bygnI2NhbnZhcy1vdmVybGF5Jywge1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDAuNCxcclxuICAgICAgICAgICAgICBvbkNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgLy9hY3RpdmF0ZSBhIG5ldyBhbmltYXRpb24gbG9vcFxyXG4gICAgICAgICAgICAgICAgYmF0dGxlU2NlbmUuaW5pdEJhdHRsZSgpO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU2NlbmUuYW5pbWF0ZUJhdHRsZSgpO1xyXG4gICAgICAgICAgICAgICAgZ3NhcC50bygnI2NhbnZhcy1vdmVybGF5JywgeyBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC40IH0pO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGtleXMudy5wcmVzc2VkICYmIGxhc3RLZXkgPT09ICd3Jykge1xyXG4gICAgcGxheWVyLmFuaW1hdGUgPSB0cnVlO1xyXG4gICAgcGxheWVyLmltYWdlID0gcGxheWVyLnNwcml0ZXMudXA7XHJcbiAgICB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm91bmRhcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGJvdW5kYXkgPSBib3VuZGFyaWVzW2ldO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHJlY3Rhbmd1bGFyQ29sbGlzaW9uKHtcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMTogcGxheWVyLFxyXG4gICAgICAgICAgICByZWN0YW5nbGUyOiB7XHJcbiAgICAgICAgICAgICAgLi4uYm91bmRheSxcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogeyB4OiBib3VuZGF5LnBvc2l0aW9uLngsIHk6IGJvdW5kYXkucG9zaXRpb24ueSArIDMgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG1vdmluZykgbW92YWJsZXMuZm9yRWFjaCgobW92YWJsZSkgPT4gKG1vdmFibGUucG9zaXRpb24ueSArPSAzKSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChrZXlzLmEucHJlc3NlZCAmJiBsYXN0S2V5ID09PSAnYScpIHtcclxuICAgIHBsYXllci5hbmltYXRlID0gdHJ1ZTtcclxuICAgIHBsYXllci5pbWFnZSA9IHBsYXllci5zcHJpdGVzLmxlZnQ7XHJcbiAgICB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm91bmRhcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGJvdW5kYXkgPSBib3VuZGFyaWVzW2ldO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHJlY3Rhbmd1bGFyQ29sbGlzaW9uKHtcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMTogcGxheWVyLFxyXG4gICAgICAgICAgICByZWN0YW5nbGUyOiB7XHJcbiAgICAgICAgICAgICAgLi4uYm91bmRheSxcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogeyB4OiBib3VuZGF5LnBvc2l0aW9uLnggKyAzLCB5OiBib3VuZGF5LnBvc2l0aW9uLnkgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobW92aW5nKSBtb3ZhYmxlcy5mb3JFYWNoKChtb3ZhYmxlKSA9PiAobW92YWJsZS5wb3NpdGlvbi54ICs9IDMpKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGtleXMuZC5wcmVzc2VkICYmIGxhc3RLZXkgPT09ICdkJykge1xyXG4gICAgcGxheWVyLmFuaW1hdGUgPSB0cnVlO1xyXG4gICAgcGxheWVyLmltYWdlID0gcGxheWVyLnNwcml0ZXMucmlnaHQ7XHJcbiAgICB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm91bmRhcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGJvdW5kYXkgPSBib3VuZGFyaWVzW2ldO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHJlY3Rhbmd1bGFyQ29sbGlzaW9uKHtcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMTogcGxheWVyLFxyXG4gICAgICAgICAgICByZWN0YW5nbGUyOiB7XHJcbiAgICAgICAgICAgICAgLi4uYm91bmRheSxcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogeyB4OiBib3VuZGF5LnBvc2l0aW9uLnggLSAzLCB5OiBib3VuZGF5LnBvc2l0aW9uLnkgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobW92aW5nKSBtb3ZhYmxlcy5mb3JFYWNoKChtb3ZhYmxlKSA9PiAobW92YWJsZS5wb3NpdGlvbi54IC09IDMpKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGtleXMucy5wcmVzc2VkICYmIGxhc3RLZXkgPT09ICdzJykge1xyXG4gICAgcGxheWVyLmFuaW1hdGUgPSB0cnVlO1xyXG4gICAgcGxheWVyLmltYWdlID0gcGxheWVyLnNwcml0ZXMuZG93bjtcclxuICAgIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib3VuZGFyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgYm91bmRheSA9IGJvdW5kYXJpZXNbaV07XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcmVjdGFuZ3VsYXJDb2xsaXNpb24oe1xyXG4gICAgICAgICAgICByZWN0YW5nbGUxOiBwbGF5ZXIsXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTI6IHtcclxuICAgICAgICAgICAgICAuLi5ib3VuZGF5LFxyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiB7IHg6IGJvdW5kYXkucG9zaXRpb24ueCwgeTogYm91bmRheS5wb3NpdGlvbi55IC0gMyB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIG1vdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChtb3ZpbmcpIG1vdmFibGVzLmZvckVhY2goKG1vdmFibGUpID0+IChtb3ZhYmxlLnBvc2l0aW9uLnkgLT0gMykpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5hbmltYXRlKCk7XHJcblxyXG4vL2JhdHRsZVNjZW5lLmluaXRCYXR0bGUoKTtcclxuLy9iYXR0bGVTY2VuZS5hbmltYXRlQmF0dGxlKCk7XHJcblxyXG5sZXQgbGFzdEtleSA9ICcnO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgc3dpdGNoIChlLmtleSkge1xyXG4gICAgY2FzZSAndyc6XHJcbiAgICAgIGtleXMudy5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgbGFzdEtleSA9ICd3JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdhJzpcclxuICAgICAga2V5cy5hLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICBsYXN0S2V5ID0gJ2EnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3MnOlxyXG4gICAgICBrZXlzLnMucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgIGxhc3RLZXkgPSAncyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnZCc6XHJcbiAgICAgIGtleXMuZC5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgbGFzdEtleSA9ICdkJztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgc3dpdGNoIChlLmtleSkge1xyXG4gICAgY2FzZSAndyc6XHJcbiAgICAgIGtleXMudy5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnYSc6XHJcbiAgICAgIGtleXMuYS5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAncyc6XHJcbiAgICAgIGtleXMucy5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnZCc6XHJcbiAgICAgIGtleXMuZC5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufSk7XHJcblxyXG4vL25vIGF1dG9wbGF5IHBvbGljeSBvZiBicm93c2Vyc1xyXG5sZXQgY2xpY2tlZCA9IGZhbHNlO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgaWYgKCFjbGlja2VkKSB7XHJcbiAgICBhdWRpby5tYXAucGxheSgpO1xyXG4gICAgY2xpY2tlZCA9IHRydWU7XHJcbiAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbIlNwcml0ZSIsIk1vbnN0ZXIiLCJhdHRhY2tzIiwibW9uc3RlcnMiLCJhdWRpbyIsIkJhdHRsZSIsImFuaW1hdGlvbklkIiwiYW5pbWF0ZSIsImNvbnN0cnVjdG9yIiwiY3R4IiwicmVuZGVyZWRTcHJpdGVzIiwiYmF0dGxlQmFja2dyb3VuZEltYWdlIiwiSW1hZ2UiLCJzcmMiLCJiYXR0bGVCYWNrZ3JvdW5kIiwicG9zaXRpb24iLCJ4IiwieSIsImltYWdlIiwiZHJhZ2dsZSIsImVtYnkiLCJxdWV1ZSIsImluaXRpYWxpemUiLCJpbml0aWF0ZWQiLCJkaWFsb2d1ZUJveCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwibGVuZ3RoIiwic2hpZnQiLCJjdXJyZW50VGFyZ2V0Iiwic3R5bGUiLCJkaXNwbGF5IiwiaW5pdEJhdHRsZSIsIndpZHRoIiwicmVwbGFjZUNoaWxkcmVuIiwiRHJhZ2dsZSIsIkVtYnkiLCJmb3JFYWNoIiwiYXR0YWNrIiwiYnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsIm5hbWUiLCJhcHBlbmQiLCJidXR0b25zIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdGVkQXR0YWNrIiwicmVjaXBpZW50IiwiaGVhbHRoIiwicHVzaCIsImZhaW50IiwiZ3NhcCIsInRvIiwib3BhY2l0eSIsIm9uQ29tcGxldGUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIm1hcCIsInBsYXkiLCJyYW5kb21BdHRhY2siLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0eXBlIiwiY29sb3IiLCJhbmltYXRlQmF0dGxlIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZHJhdyIsInNwcml0ZSIsIkJvdW5kYXJ5IiwiaGVpZ2h0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJmcmFtZXMiLCJtYXgiLCJob2xkIiwic3ByaXRlcyIsInJvdGF0aW9uIiwiaXNFbmVteSIsImJhdHRsZSIsInN0b3AiLCJ2aWN0b3J5IiwiaGVhbHRoQmFyIiwiZGFtYWdlIiwiaW5pdEZpcmViYWxsIiwiZmlyZWJhbGxJbWFnZSIsImZpcmViYWxsIiwic3BsaWNlIiwiZmlyZWJhbGxIaXQiLCJ5b3lvIiwicmVwZWF0IiwiZHVyYXRpb24iLCJ0bCIsInRpbWVsaW5lIiwibW92ZW1lbnREaXN0YW5jZSIsInRhY2tsZUhpdCIsInZhbCIsImVsYXBzZWQiLCJvbmxvYWQiLCJzYXZlIiwidHJhbnNsYXRlIiwicm90YXRlIiwiZ2xvYmFsQWxwaGEiLCJkcmF3SW1hZ2UiLCJyZXN0b3JlIiwiVGFja2xlIiwiRmlyZWJhbGwiLCJkZWZhdWx0Vm9sdW1lIiwiaGlnaFZvbHVtZSIsInByb2QiLCJsb2NhbCIsImlzUHJvZCIsImhvc3QiLCJIb3dsIiwiaHRtbDUiLCJ2b2x1bWUiLCJjYW52YXMiLCJnZXRDb250ZXh0IiwiY29sbGlzaW9uc01hcCIsImkiLCJjb2xsaXNpb25zIiwic2xpY2UiLCJiYXR0bGVab25lc01hcCIsImJhdHRsZVpvbmVzRGF0YSIsImJvdW5kYXJpZXMiLCJvZmZzZXQiLCJyb3ciLCJzeW1ib2wiLCJqIiwiYmF0dGxlWm9uZXMiLCJtYXBJbWFnZSIsImZvcmVncm91bmRJbWFnZSIsInBsYXllckRvd25JbWFnZSIsInBsYXllclVwSW1hZ2UiLCJwbGF5ZXJMZWZ0SW1hZ2UiLCJwbGF5ZXJSaWdodEltYWdlIiwicGxheWVyIiwidXAiLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiYmFja2dyb3VuZCIsImZvcmVncm91bmQiLCJrZXlzIiwidyIsInByZXNzZWQiLCJhIiwicyIsImQiLCJtb3ZhYmxlcyIsInJlY3Rhbmd1bGFyQ29sbGlzaW9uIiwicmVjdGFuZ2xlMSIsInJlY3RhbmdsZTIiLCJiYXR0bGVTY2VuZSIsImJvdW5kYXkiLCJiYXR0bGVab25lIiwibW92aW5nIiwib3ZlcmxhcHBpbmdBcmVhIiwibWluIiwibGFzdEtleSIsIm1vdmFibGUiLCJrZXkiLCJjbGlja2VkIl0sInNvdXJjZVJvb3QiOiIifQ==