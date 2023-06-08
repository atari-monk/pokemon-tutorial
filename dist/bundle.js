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
const audio = {
  map: new Howl({
    src: './../../assets/audio/map.wav',
    html5: true,
    volume: defaultVolume
  }),
  initBattle: new Howl({
    src: './../../assets/audio/initBattle.wav',
    html5: true,
    volume: defaultVolume
  }),
  battle: new Howl({
    src: './../../assets/audio/battle.mp3',
    html5: true,
    volume: defaultVolume
  }),
  tackleHit: new Howl({
    src: './../../assets/audio/tackleHit.wav',
    html5: true,
    volume: defaultVolume
  }),
  fireballHit: new Howl({
    src: './../../assets/audio/fireballHit.wav',
    html5: true,
    volume: defaultVolume
  }),
  initFireball: new Howl({
    src: './../../assets/audio/initFireball.wav',
    html5: true,
    volume: defaultVolume
  }),
  victory: new Howl({
    src: './../../assets/audio/victory.wav',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQUMsQ0FBQztJQUNoQnFHLE9BQU8sR0FBRyxJQUFJO0VBQ2hCO0FBQ0YsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQmF0dGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9Cb3VuZGFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvTW9uc3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvU3ByaXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2F0dGFja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RhdGEvYXVkaW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RhdGEvbW9uc3RlcnMuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4vU3ByaXRlLmpzJztcclxuaW1wb3J0IHsgTW9uc3RlciB9IGZyb20gJy4vTW9uc3Rlci5qcyc7XHJcbmltcG9ydCB7IGF0dGFja3MgfSBmcm9tICcuL2RhdGEvYXR0YWNrcy5qcyc7XHJcbmltcG9ydCB7IG1vbnN0ZXJzIH0gZnJvbSAnLi9kYXRhL21vbnN0ZXJzLmpzJztcclxuaW1wb3J0IHsgYXVkaW8gfSBmcm9tICcuL2RhdGEvYXVkaW8uanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhdHRsZSB7XHJcbiAgI2FuaW1hdGlvbklkO1xyXG4gICNhbmltYXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihjdHgsIGFuaW1hdGUpIHtcclxuICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgdGhpcy5yZW5kZXJlZFNwcml0ZXMgPSBbXTtcclxuICAgIHRoaXMuYXR0YWNrcyA9IGF0dGFja3M7XHJcbiAgICB0aGlzLiNhbmltYXRpb25JZCA9IDA7XHJcbiAgICB0aGlzLiNhbmltYXRlID0gYW5pbWF0ZTtcclxuXHJcbiAgICB0aGlzLmJhdHRsZUJhY2tncm91bmRJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgdGhpcy5iYXR0bGVCYWNrZ3JvdW5kSW1hZ2Uuc3JjID0gJy4vYXNzZXRzL2JhdHRsZUJhY2tncm91bmQucG5nJztcclxuICAgIHRoaXMuYmF0dGxlQmFja2dyb3VuZCA9IG5ldyBTcHJpdGUoe1xyXG4gICAgICBwb3NpdGlvbjogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgIGltYWdlOiB0aGlzLmJhdHRsZUJhY2tncm91bmRJbWFnZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZHJhZ2dsZSA9IG51bGw7XHJcbiAgICB0aGlzLmVtYnkgPSBudWxsO1xyXG5cclxuICAgIHRoaXMucXVldWUgPSBbXTtcclxuXHJcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuICAgIHRoaXMuaW5pdGlhdGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlhbG9ndWUtYm94Jyk7XHJcbiAgICBkaWFsb2d1ZUJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnF1ZXVlWzBdKCk7XHJcbiAgICAgICAgdGhpcy5xdWV1ZS5zaGlmdCgpO1xyXG4gICAgICB9IGVsc2UgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRCYXR0bGUoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci1pbnRlcmZhY2UnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2d1ZS1ib3gnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZW15LWhlYWx0aC1iYXInKS5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItaGVhbHRoLWJhcicpLnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F0dGFja3MtY29udGFpbmVyJykucmVwbGFjZUNoaWxkcmVuKCk7XHJcblxyXG4gICAgdGhpcy5kcmFnZ2xlID0gbmV3IE1vbnN0ZXIobW9uc3RlcnMuRHJhZ2dsZSk7XHJcbiAgICB0aGlzLmVtYnkgPSBuZXcgTW9uc3Rlcihtb25zdGVycy5FbWJ5KTtcclxuICAgIHRoaXMucmVuZGVyZWRTcHJpdGVzID0gW3RoaXMuZHJhZ2dsZSwgdGhpcy5lbWJ5XTtcclxuICAgIHRoaXMucXVldWUgPSBbXTtcclxuXHJcbiAgICB0aGlzLmVtYnkuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcclxuICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBhdHRhY2submFtZTtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F0dGFja3MtY29udGFpbmVyJykuYXBwZW5kKGJ1dHRvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRBdHRhY2sgPSB0aGlzLmF0dGFja3NbZS5jdXJyZW50VGFyZ2V0LmlubmVySFRNTF07XHJcbiAgICAgICAgdGhpcy5lbWJ5LmF0dGFjayh7XHJcbiAgICAgICAgICBhdHRhY2s6IHNlbGVjdGVkQXR0YWNrLFxyXG4gICAgICAgICAgcmVjaXBpZW50OiB0aGlzLmRyYWdnbGUsXHJcbiAgICAgICAgICByZW5kZXJlZFNwcml0ZXM6IHRoaXMucmVuZGVyZWRTcHJpdGVzLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2xlLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdnbGUuZmFpbnQoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKCgpID0+IHtcclxuICAgICAgICAgICAgZ3NhcC50bygnI2NhbnZhcy1vdmVybGF5Jywge1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy4jYW5pbWF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4jYW5pbWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXItaW50ZXJmYWNlJykuc3R5bGUuZGlzcGxheSA9XHJcbiAgICAgICAgICAgICAgICAgICdub25lJztcclxuICAgICAgICAgICAgICAgIGdzYXAudG8oJyNjYW52YXMtb3ZlcmxheScsIHsgb3BhY2l0eTogMCB9KTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGF1ZGlvLm1hcC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByYW5kb21BdHRhY2sgPVxyXG4gICAgICAgICAgdGhpcy5kcmFnZ2xlLmF0dGFja3NbXHJcbiAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZHJhZ2dsZS5hdHRhY2tzLmxlbmd0aClcclxuICAgICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMucXVldWUucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRyYWdnbGUuYXR0YWNrKHtcclxuICAgICAgICAgICAgYXR0YWNrOiByYW5kb21BdHRhY2ssXHJcbiAgICAgICAgICAgIHJlY2lwaWVudDogdGhpcy5lbWJ5LFxyXG4gICAgICAgICAgICByZW5kZXJlZFNwcml0ZXM6IHRoaXMucmVuZGVyZWRTcHJpdGVzLFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuZW1ieS5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZW1ieS5mYWludCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKCgpID0+IHtcclxuICAgICAgICAgICAgICBnc2FwLnRvKCcjY2FudmFzLW92ZXJsYXknLCB7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLiNhbmltYXRpb25JZCk7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuI2FuaW1hdGUoKTtcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXItaW50ZXJmYWNlJykuc3R5bGUuZGlzcGxheSA9XHJcbiAgICAgICAgICAgICAgICAgICAgJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICBnc2FwLnRvKCcjY2FudmFzLW92ZXJsYXknLCB7IG9wYWNpdHk6IDAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgYXVkaW8ubWFwLnBsYXkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRBdHRhY2sgPSB0aGlzLmF0dGFja3NbZS5jdXJyZW50VGFyZ2V0LmlubmVySFRNTF07XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F0dGFjay10eXBlJykuaW5uZXJIVE1MID0gc2VsZWN0ZWRBdHRhY2sudHlwZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXR0YWNrLXR5cGUnKS5zdHlsZS5jb2xvciA9XHJcbiAgICAgICAgICBzZWxlY3RlZEF0dGFjay5jb2xvcjtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFuaW1hdGVCYXR0bGUoKSB7XHJcbiAgICB0aGlzLiNhbmltYXRpb25JZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cclxuICAgICAgdGhpcy5hbmltYXRlQmF0dGxlKClcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5iYXR0bGVCYWNrZ3JvdW5kLmRyYXcodGhpcy5jdHgpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZWRTcHJpdGVzLmZvckVhY2goKHNwcml0ZSkgPT4ge1xyXG4gICAgICBzcHJpdGUuZHJhdyh0aGlzLmN0eCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEJvdW5kYXJ5IHtcbiAgc3RhdGljIHdpZHRoID0gNDg7XG4gIHN0YXRpYyBoZWlnaHQgPSA0ODtcbiAgY29uc3RydWN0b3IoeyBwb3NpdGlvbiB9KSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMud2lkdGggPSA0ODtcbiAgICB0aGlzLmhlaWdodCA9IDQ4O1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMjU1LCAwLCAwLCAwKSc7XG4gICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4vU3ByaXRlLmpzJztcbmltcG9ydCB7IGF1ZGlvIH0gZnJvbSAnLi9kYXRhL2F1ZGlvLmpzJztcblxuZXhwb3J0IGNsYXNzIE1vbnN0ZXIgZXh0ZW5kcyBTcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgcG9zaXRpb24sXG4gICAgaW1hZ2UsXG4gICAgZnJhbWVzID0geyBtYXg6IDEsIGhvbGQ6IDEwIH0sXG4gICAgc3ByaXRlcyxcbiAgICBhbmltYXRlID0gZmFsc2UsXG4gICAgcm90YXRpb24gPSAwLFxuICAgIGlzRW5lbXkgPSBmYWxzZSxcbiAgICBuYW1lLFxuICAgIGF0dGFja3MsXG4gIH0pIHtcbiAgICBzdXBlcih7IHBvc2l0aW9uLCBpbWFnZSwgZnJhbWVzLCBzcHJpdGVzLCBhbmltYXRlLCByb3RhdGlvbiB9KTtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLmlzRW5lbXkgPSBpc0VuZW15O1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5hdHRhY2tzID0gYXR0YWNrcztcbiAgfVxuXG4gIGZhaW50KCkge1xuICAgIGNvbnN0IGRpYWxvZ3VlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpYWxvZ3VlLWJveCcpO1xuICAgIGRpYWxvZ3VlQm94LmlubmVySFRNTCA9IGAke3RoaXMubmFtZX0gZmFpbnRlZCFgO1xuICAgIGdzYXAudG8odGhpcy5wb3NpdGlvbiwgeyB5OiB0aGlzLnBvc2l0aW9uLnkgKyAyMCB9KTtcbiAgICBnc2FwLnRvKHRoaXMsIHsgb3BhY2l0eTogMCB9KTtcbiAgICBhdWRpby5iYXR0bGUuc3RvcCgpO1xuICAgIGF1ZGlvLnZpY3RvcnkucGxheSgpO1xuICB9XG5cbiAgYXR0YWNrKHsgYXR0YWNrLCByZWNpcGllbnQsIHJlbmRlcmVkU3ByaXRlcyB9KSB7XG4gICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlhbG9ndWUtYm94Jyk7XG4gICAgZGlhbG9ndWVCb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZGlhbG9ndWVCb3guaW5uZXJIVE1MID0gYCR7dGhpcy5uYW1lfSB1c2VkICR7YXR0YWNrLm5hbWV9YDtcblxuICAgIGxldCBoZWFsdGhCYXIgPSAnI2VuZW15LWhlYWx0aC1iYXInO1xuICAgIGlmICh0aGlzLmlzRW5lbXkpIGhlYWx0aEJhciA9ICcjcGxheWVyLWhlYWx0aC1iYXInO1xuXG4gICAgbGV0IHJvdGF0aW9uID0gMTtcbiAgICBpZiAodGhpcy5pc0VuZW15KSByb3RhdGlvbiA9IC0yLjI7XG5cbiAgICByZWNpcGllbnQuaGVhbHRoIC09IGF0dGFjay5kYW1hZ2U7XG5cbiAgICBzd2l0Y2ggKGF0dGFjay5uYW1lKSB7XG4gICAgICBjYXNlICdGaXJlYmFsbCc6XG4gICAgICAgIGF1ZGlvLmluaXRGaXJlYmFsbC5wbGF5KCk7XG4gICAgICAgIGNvbnN0IGZpcmViYWxsSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgZmlyZWJhbGxJbWFnZS5zcmMgPSAnLi9hc3NldHMvZmlyZWJhbGwucG5nJztcbiAgICAgICAgY29uc3QgZmlyZWJhbGwgPSBuZXcgU3ByaXRlKHtcbiAgICAgICAgICBwb3NpdGlvbjogeyB4OiB0aGlzLnBvc2l0aW9uLngsIHk6IHRoaXMucG9zaXRpb24ueSB9LFxuICAgICAgICAgIGltYWdlOiBmaXJlYmFsbEltYWdlLFxuICAgICAgICAgIGZyYW1lczoge1xuICAgICAgICAgICAgbWF4OiA0LFxuICAgICAgICAgICAgaG9sZDogMTAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhbmltYXRlOiB0cnVlLFxuICAgICAgICAgIHJvdGF0aW9uLFxuICAgICAgICB9KTtcblxuICAgICAgICByZW5kZXJlZFNwcml0ZXMuc3BsaWNlKDEsIDAsIGZpcmViYWxsKTtcblxuICAgICAgICBnc2FwLnRvKGZpcmViYWxsLnBvc2l0aW9uLCB7XG4gICAgICAgICAgeDogcmVjaXBpZW50LnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogcmVjaXBpZW50LnBvc2l0aW9uLnksXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgLy9lbmVteSBnZXRzIGhpdFxuICAgICAgICAgICAgYXVkaW8uZmlyZWJhbGxIaXQucGxheSgpO1xuICAgICAgICAgICAgZ3NhcC50byhoZWFsdGhCYXIsIHtcbiAgICAgICAgICAgICAgd2lkdGg6IHJlY2lwaWVudC5oZWFsdGggKyAnJScsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ3NhcC50byhyZWNpcGllbnQucG9zaXRpb24sIHtcbiAgICAgICAgICAgICAgeDogcmVjaXBpZW50LnBvc2l0aW9uLnggKyAxMCxcbiAgICAgICAgICAgICAgeW95bzogdHJ1ZSxcbiAgICAgICAgICAgICAgcmVwZWF0OiA1LFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMC4wOCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnc2FwLnRvKHJlY2lwaWVudCwge1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICByZXBlYXQ6IDUsXG4gICAgICAgICAgICAgIHlveW86IHRydWUsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjA4LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZW5kZXJlZFNwcml0ZXMuc3BsaWNlKDEsIDEpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVGFja2xlJzpcbiAgICAgICAgY29uc3QgdGwgPSBnc2FwLnRpbWVsaW5lKCk7XG5cbiAgICAgICAgbGV0IG1vdmVtZW50RGlzdGFuY2UgPSAyMDtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmVteSkgbW92ZW1lbnREaXN0YW5jZSA9IC0yMDtcblxuICAgICAgICB0bC50byh0aGlzLnBvc2l0aW9uLCB7XG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54IC0gbW92ZW1lbnREaXN0YW5jZSxcbiAgICAgICAgfSlcbiAgICAgICAgICAudG8odGhpcy5wb3NpdGlvbiwge1xuICAgICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54ICsgbW92ZW1lbnREaXN0YW5jZSAqIDIsXG4gICAgICAgICAgICBkdXJhdGlvbjogMC4xLFxuICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAvL2VuZW15IGdldHMgaGl0XG4gICAgICAgICAgICAgIGF1ZGlvLnRhY2tsZUhpdC5wbGF5KCk7XG4gICAgICAgICAgICAgIGdzYXAudG8oaGVhbHRoQmFyLCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHJlY2lwaWVudC5oZWFsdGggKyAnJScsXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGdzYXAudG8ocmVjaXBpZW50LnBvc2l0aW9uLCB7XG4gICAgICAgICAgICAgICAgeDogcmVjaXBpZW50LnBvc2l0aW9uLnggKyAxMCxcbiAgICAgICAgICAgICAgICB5b3lvOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJlcGVhdDogNSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC4wOCxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgZ3NhcC50byhyZWNpcGllbnQsIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHJlcGVhdDogNSxcbiAgICAgICAgICAgICAgICB5b3lvOiB0cnVlLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjA4LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG8odGhpcy5wb3NpdGlvbiwgeyB4OiB0aGlzLnBvc2l0aW9uLnggfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFNwcml0ZSB7XHJcbiAgY29uc3RydWN0b3Ioe1xyXG4gICAgcG9zaXRpb24sXHJcbiAgICBpbWFnZSxcclxuICAgIGZyYW1lcyA9IHsgbWF4OiAxLCBob2xkOiAxMCB9LFxyXG4gICAgc3ByaXRlcyxcclxuICAgIGFuaW1hdGUgPSBmYWxzZSxcclxuICAgIHJvdGF0aW9uID0gMCxcclxuICB9KSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICB0aGlzLmZyYW1lcyA9IHsgLi4uZnJhbWVzLCB2YWw6IDAsIGVsYXBzZWQ6IDAgfTtcclxuICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aCAvIHRoaXMuZnJhbWVzLm1heDtcclxuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgIH07XHJcbiAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlLnNyYztcclxuICAgIHRoaXMuYW5pbWF0ZSA9IGFuaW1hdGU7XHJcbiAgICB0aGlzLnNwcml0ZXMgPSBzcHJpdGVzO1xyXG4gICAgdGhpcy5vcGFjaXR5ID0gMTtcclxuICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICB9XHJcblxyXG4gIGRyYXcoY3R4KSB7XHJcbiAgICBjdHguc2F2ZSgpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZShcclxuICAgICAgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCAvIDIsXHJcbiAgICAgIHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0IC8gMlxyXG4gICAgKTtcclxuICAgIGN0eC5yb3RhdGUodGhpcy5yb3RhdGlvbik7XHJcbiAgICBjdHgudHJhbnNsYXRlKFxyXG4gICAgICAtdGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aCAvIDIsXHJcbiAgICAgIC10aGlzLnBvc2l0aW9uLnkgLSB0aGlzLmhlaWdodCAvIDJcclxuICAgICk7XHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLm9wYWNpdHk7XHJcbiAgICBjdHguZHJhd0ltYWdlKFxyXG4gICAgICB0aGlzLmltYWdlLFxyXG4gICAgICB0aGlzLmZyYW1lcy52YWwgKiB0aGlzLndpZHRoLFxyXG4gICAgICAwLFxyXG4gICAgICB0aGlzLmltYWdlLndpZHRoIC8gdGhpcy5mcmFtZXMubWF4LFxyXG4gICAgICB0aGlzLmltYWdlLmhlaWdodCxcclxuICAgICAgdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAgIHRoaXMuaW1hZ2Uud2lkdGggLyB0aGlzLmZyYW1lcy5tYXgsXHJcbiAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0XHJcbiAgICApO1xyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuYW5pbWF0ZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmZyYW1lcy5tYXggPiAxKSB7XHJcbiAgICAgIHRoaXMuZnJhbWVzLmVsYXBzZWQrKztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mcmFtZXMuZWxhcHNlZCAlIHRoaXMuZnJhbWVzLmhvbGQgPT09IDApXHJcbiAgICAgIGlmICh0aGlzLmZyYW1lcy52YWwgPCB0aGlzLmZyYW1lcy5tYXggLSAxKSB0aGlzLmZyYW1lcy52YWwrKztcclxuICAgICAgZWxzZSB0aGlzLmZyYW1lcy52YWwgPSAwO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgYXR0YWNrcyA9IHtcclxuICBUYWNrbGU6IHtcclxuICAgIG5hbWU6ICdUYWNrbGUnLFxyXG4gICAgZGFtYWdlOiAxMCxcclxuICAgIHR5cGU6ICdOb3JtYWwnLFxyXG4gICAgY29sb3I6ICdibGFjaycsXHJcbiAgfSxcclxuICBGaXJlYmFsbDoge1xyXG4gICAgbmFtZTogJ0ZpcmViYWxsJyxcclxuICAgIGRhbWFnZTogMjUsXHJcbiAgICB0eXBlOiAnRmlyZScsXHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgfSxcclxufTtcclxuIiwiY29uc3QgZGVmYXVsdFZvbHVtZSA9IDAuMTtcbmNvbnN0IGhpZ2hWb2x1bWUgPSAwLjU7XG5leHBvcnQgY29uc3QgYXVkaW8gPSB7XG4gIG1hcDogbmV3IEhvd2woe1xuICAgIHNyYzogJy4vLi4vLi4vYXNzZXRzL2F1ZGlvL21hcC53YXYnLFxuICAgIGh0bWw1OiB0cnVlLFxuICAgIHZvbHVtZTogZGVmYXVsdFZvbHVtZSxcbiAgfSksXG4gIGluaXRCYXR0bGU6IG5ldyBIb3dsKHtcbiAgICBzcmM6ICcuLy4uLy4uL2Fzc2V0cy9hdWRpby9pbml0QmF0dGxlLndhdicsXG4gICAgaHRtbDU6IHRydWUsXG4gICAgdm9sdW1lOiBkZWZhdWx0Vm9sdW1lLFxuICB9KSxcbiAgYmF0dGxlOiBuZXcgSG93bCh7XG4gICAgc3JjOiAnLi8uLi8uLi9hc3NldHMvYXVkaW8vYmF0dGxlLm1wMycsXG4gICAgaHRtbDU6IHRydWUsXG4gICAgdm9sdW1lOiBkZWZhdWx0Vm9sdW1lLFxuICB9KSxcbiAgdGFja2xlSGl0OiBuZXcgSG93bCh7XG4gICAgc3JjOiAnLi8uLi8uLi9hc3NldHMvYXVkaW8vdGFja2xlSGl0LndhdicsXG4gICAgaHRtbDU6IHRydWUsXG4gICAgdm9sdW1lOiBkZWZhdWx0Vm9sdW1lLFxuICB9KSxcbiAgZmlyZWJhbGxIaXQ6IG5ldyBIb3dsKHtcbiAgICBzcmM6ICcuLy4uLy4uL2Fzc2V0cy9hdWRpby9maXJlYmFsbEhpdC53YXYnLFxuICAgIGh0bWw1OiB0cnVlLFxuICAgIHZvbHVtZTogZGVmYXVsdFZvbHVtZSxcbiAgfSksXG4gIGluaXRGaXJlYmFsbDogbmV3IEhvd2woe1xuICAgIHNyYzogJy4vLi4vLi4vYXNzZXRzL2F1ZGlvL2luaXRGaXJlYmFsbC53YXYnLFxuICAgIGh0bWw1OiB0cnVlLFxuICAgIHZvbHVtZTogZGVmYXVsdFZvbHVtZSxcbiAgfSksXG4gIHZpY3Rvcnk6IG5ldyBIb3dsKHtcbiAgICBzcmM6ICcuLy4uLy4uL2Fzc2V0cy9hdWRpby92aWN0b3J5LndhdicsXG4gICAgaHRtbDU6IHRydWUsXG4gICAgdm9sdW1lOiBoaWdoVm9sdW1lLFxuICB9KSxcbn07XG4iLCJpbXBvcnQgeyBhdHRhY2tzIH0gZnJvbSAnLi9hdHRhY2tzLmpzJztcblxuZXhwb3J0IGNvbnN0IG1vbnN0ZXJzID0ge1xuICBFbWJ5OiB7XG4gICAgcG9zaXRpb246IHsgeDogMjgwLCB5OiAzMjUgfSxcbiAgICBpbWFnZTogeyBzcmM6ICcuL2Fzc2V0cy9lbWJ5U3ByaXRlLnBuZycgfSxcbiAgICBmcmFtZXM6IHsgbWF4OiA0LCBob2xkOiAzMCB9LFxuICAgIGFuaW1hdGU6IHRydWUsXG4gICAgbmFtZTogJ0VtYnknLFxuICAgIGF0dGFja3M6IFthdHRhY2tzLlRhY2tsZSwgYXR0YWNrcy5GaXJlYmFsbF0sXG4gIH0sXG4gIERyYWdnbGU6IHtcbiAgICBwb3NpdGlvbjogeyB4OiA4MDAsIHk6IDEwMCB9LFxuICAgIGltYWdlOiB7IHNyYzogJy4vYXNzZXRzL2RyYWdnbGVTcHJpdGUucG5nJyB9LFxuICAgIGZyYW1lczogeyBtYXg6IDQsIGhvbGQ6IDMwIH0sXG4gICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICBpc0VuZW15OiB0cnVlLFxuICAgIG5hbWU6ICdEcmFnZ2xlJyxcbiAgICBhdHRhY2tzOiBbYXR0YWNrcy5UYWNrbGUsIGF0dGFja3MuRmlyZWJhbGxdLFxuICB9LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQm91bmRhcnkgfSBmcm9tICcuL0JvdW5kYXJ5LmpzJztcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSAnLi9TcHJpdGUuanMnO1xyXG5pbXBvcnQgeyBCYXR0bGUgfSBmcm9tICcuL0JhdHRsZS5qcyc7XHJcbmltcG9ydCB7IGF1ZGlvIH0gZnJvbSAnLi9kYXRhL2F1ZGlvLmpzJztcclxuXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xyXG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuY2FudmFzLndpZHRoID0gMTAyNDtcclxuY2FudmFzLmhlaWdodCA9IDU3NjtcclxuXHJcbmNvbnN0IGNvbGxpc2lvbnNNYXAgPSBbXTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xsaXNpb25zLmxlbmd0aDsgaSArPSA3MCkge1xyXG4gIGNvbGxpc2lvbnNNYXAucHVzaChjb2xsaXNpb25zLnNsaWNlKGksIDcwICsgaSkpO1xyXG59XHJcblxyXG5jb25zdCBiYXR0bGVab25lc01hcCA9IFtdO1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IGJhdHRsZVpvbmVzRGF0YS5sZW5ndGg7IGkgKz0gNzApIHtcclxuICBiYXR0bGVab25lc01hcC5wdXNoKGJhdHRsZVpvbmVzRGF0YS5zbGljZShpLCA3MCArIGkpKTtcclxufVxyXG5cclxuY29uc3QgYm91bmRhcmllcyA9IFtdO1xyXG5cclxuY29uc3Qgb2Zmc2V0ID0ge1xyXG4gIHg6IC03MzUsXHJcbiAgeTogLTY1MCxcclxufTtcclxuXHJcbmNvbGxpc2lvbnNNYXAuZm9yRWFjaCgocm93LCBpKSA9PiB7XHJcbiAgcm93LmZvckVhY2goKHN5bWJvbCwgaikgPT4ge1xyXG4gICAgaWYgKHN5bWJvbCA9PT0gMTAyNSlcclxuICAgICAgYm91bmRhcmllcy5wdXNoKFxyXG4gICAgICAgIG5ldyBCb3VuZGFyeSh7XHJcbiAgICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICB4OiBqICogQm91bmRhcnkud2lkdGggKyBvZmZzZXQueCxcclxuICAgICAgICAgICAgeTogaSAqIEJvdW5kYXJ5LmhlaWdodCArIG9mZnNldC55LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmNvbnN0IGJhdHRsZVpvbmVzID0gW107XHJcblxyXG5iYXR0bGVab25lc01hcC5mb3JFYWNoKChyb3csIGkpID0+IHtcclxuICByb3cuZm9yRWFjaCgoc3ltYm9sLCBqKSA9PiB7XHJcbiAgICBpZiAoc3ltYm9sID09PSAxMDI1KVxyXG4gICAgICBiYXR0bGVab25lcy5wdXNoKFxyXG4gICAgICAgIG5ldyBCb3VuZGFyeSh7XHJcbiAgICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICB4OiBqICogQm91bmRhcnkud2lkdGggKyBvZmZzZXQueCxcclxuICAgICAgICAgICAgeTogaSAqIEJvdW5kYXJ5LmhlaWdodCArIG9mZnNldC55LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmNvbnN0IG1hcEltYWdlID0gbmV3IEltYWdlKCk7XHJcbm1hcEltYWdlLnNyYyA9ICcuL2Fzc2V0cy9QZWxsZXQgVG93bi5wbmcnO1xyXG5cclxuY29uc3QgZm9yZWdyb3VuZEltYWdlID0gbmV3IEltYWdlKCk7XHJcbmZvcmVncm91bmRJbWFnZS5zcmMgPSAnLi9hc3NldHMvZm9yZWdyb3VuZE9iamVjdHMucG5nJztcclxuXHJcbmNvbnN0IHBsYXllckRvd25JbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5wbGF5ZXJEb3duSW1hZ2Uuc3JjID0gJy4vYXNzZXRzL3BsYXllckRvd24ucG5nJztcclxuY29uc3QgcGxheWVyVXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5wbGF5ZXJVcEltYWdlLnNyYyA9ICcuL2Fzc2V0cy9wbGF5ZXJVcC5wbmcnO1xyXG5jb25zdCBwbGF5ZXJMZWZ0SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxucGxheWVyTGVmdEltYWdlLnNyYyA9ICcuL2Fzc2V0cy9wbGF5ZXJMZWZ0LnBuZyc7XHJcbmNvbnN0IHBsYXllclJpZ2h0SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxucGxheWVyUmlnaHRJbWFnZS5zcmMgPSAnLi9hc3NldHMvcGxheWVyUmlnaHQucG5nJztcclxuXHJcbmNvbnN0IHBsYXllciA9IG5ldyBTcHJpdGUoe1xyXG4gIHBvc2l0aW9uOiB7XHJcbiAgICB4OiBjYW52YXMud2lkdGggLyAyIC0gMTkyIC8gNCAvIDIsXHJcbiAgICB5OiBjYW52YXMuaGVpZ2h0IC8gMiAtIDY4IC8gMixcclxuICB9LFxyXG4gIGltYWdlOiBwbGF5ZXJEb3duSW1hZ2UsXHJcbiAgZnJhbWVzOiB7IG1heDogNCwgaG9sZDogMTAgfSxcclxuICBzcHJpdGVzOiB7XHJcbiAgICB1cDogcGxheWVyVXBJbWFnZSxcclxuICAgIGRvd246IHBsYXllckRvd25JbWFnZSxcclxuICAgIGxlZnQ6IHBsYXllckxlZnRJbWFnZSxcclxuICAgIHJpZ2h0OiBwbGF5ZXJSaWdodEltYWdlLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuY29uc3QgYmFja2dyb3VuZCA9IG5ldyBTcHJpdGUoe1xyXG4gIHBvc2l0aW9uOiB7IHg6IG9mZnNldC54LCB5OiBvZmZzZXQueSB9LFxyXG4gIGltYWdlOiBtYXBJbWFnZSxcclxufSk7XHJcblxyXG5jb25zdCBmb3JlZ3JvdW5kID0gbmV3IFNwcml0ZSh7XHJcbiAgcG9zaXRpb246IHsgeDogb2Zmc2V0LngsIHk6IG9mZnNldC55IH0sXHJcbiAgaW1hZ2U6IGZvcmVncm91bmRJbWFnZSxcclxufSk7XHJcblxyXG5jb25zdCBrZXlzID0ge1xyXG4gIHc6IHtcclxuICAgIHByZXNzZWQ6IGZhbHNlLFxyXG4gIH0sXHJcbiAgYToge1xyXG4gICAgcHJlc3NlZDogZmFsc2UsXHJcbiAgfSxcclxuICBzOiB7XHJcbiAgICBwcmVzc2VkOiBmYWxzZSxcclxuICB9LFxyXG4gIGQ6IHtcclxuICAgIHByZXNzZWQ6IGZhbHNlLFxyXG4gIH0sXHJcbn07XHJcblxyXG5jb25zdCBtb3ZhYmxlcyA9IFtiYWNrZ3JvdW5kLCAuLi5ib3VuZGFyaWVzLCBmb3JlZ3JvdW5kLCAuLi5iYXR0bGVab25lc107XHJcblxyXG5mdW5jdGlvbiByZWN0YW5ndWxhckNvbGxpc2lvbih7IHJlY3RhbmdsZTEsIHJlY3RhbmdsZTIgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICByZWN0YW5nbGUxLnBvc2l0aW9uLnggKyByZWN0YW5nbGUxLndpZHRoID49IHJlY3RhbmdsZTIucG9zaXRpb24ueCAmJlxyXG4gICAgcmVjdGFuZ2xlMS5wb3NpdGlvbi54IDw9IHJlY3RhbmdsZTIucG9zaXRpb24ueCArIHJlY3RhbmdsZTIud2lkdGggJiZcclxuICAgIHJlY3RhbmdsZTEucG9zaXRpb24ueSA8PSByZWN0YW5nbGUyLnBvc2l0aW9uLnkgKyByZWN0YW5nbGUyLmhlaWdodCAmJlxyXG4gICAgcmVjdGFuZ2xlMS5wb3NpdGlvbi55ICsgcmVjdGFuZ2xlMS5oZWlnaHQgPj0gcmVjdGFuZ2xlMi5wb3NpdGlvbi55XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgYmF0dGxlU2NlbmUgPSBuZXcgQmF0dGxlKGN0eCwgYW5pbWF0ZSk7XHJcblxyXG5mdW5jdGlvbiBhbmltYXRlKCkge1xyXG4gIGNvbnN0IGFuaW1hdGlvbklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuICBiYWNrZ3JvdW5kLmRyYXcoY3R4KTtcclxuICBib3VuZGFyaWVzLmZvckVhY2goKGJvdW5kYXkpID0+IHtcclxuICAgIGJvdW5kYXkuZHJhdyhjdHgpO1xyXG4gIH0pO1xyXG4gIGJhdHRsZVpvbmVzLmZvckVhY2goKGJhdHRsZVpvbmUpID0+IHtcclxuICAgIGJhdHRsZVpvbmUuZHJhdyhjdHgpO1xyXG4gIH0pO1xyXG4gIHBsYXllci5kcmF3KGN0eCk7XHJcbiAgZm9yZWdyb3VuZC5kcmF3KGN0eCk7XHJcblxyXG4gIGxldCBtb3ZpbmcgPSB0cnVlO1xyXG4gIHBsYXllci5hbmltYXRlID0gZmFsc2U7XHJcblxyXG4gIGlmIChiYXR0bGVTY2VuZS5pbml0aWF0ZWQpIHJldHVybjtcclxuXHJcbiAgLy9hY3RpdmF0ZSBhIGJhdHRsZVxyXG4gIGlmIChrZXlzLncucHJlc3NlZCB8fCBrZXlzLmEucHJlc3NlZCB8fCBrZXlzLnMucHJlc3NlZCB8fCBrZXlzLmQucHJlc3NlZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXR0bGVab25lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBiYXR0bGVab25lID0gYmF0dGxlWm9uZXNbaV07XHJcbiAgICAgIGNvbnN0IG92ZXJsYXBwaW5nQXJlYSA9XHJcbiAgICAgICAgKE1hdGgubWluKFxyXG4gICAgICAgICAgcGxheWVyLnBvc2l0aW9uLnggKyBwbGF5ZXIud2lkdGgsXHJcbiAgICAgICAgICBiYXR0bGVab25lLnBvc2l0aW9uLnggKyBiYXR0bGVab25lLndpZHRoXHJcbiAgICAgICAgKSAtXHJcbiAgICAgICAgICBNYXRoLm1heChwbGF5ZXIucG9zaXRpb24ueCwgYmF0dGxlWm9uZS5wb3NpdGlvbi54KSkgKlxyXG4gICAgICAgIChNYXRoLm1pbihcclxuICAgICAgICAgIHBsYXllci5wb3NpdGlvbi55ICsgcGxheWVyLmhlaWdodCxcclxuICAgICAgICAgIGJhdHRsZVpvbmUucG9zaXRpb24ueSArIGJhdHRsZVpvbmUuaGVpZ2h0XHJcbiAgICAgICAgKSAtXHJcbiAgICAgICAgICBNYXRoLm1heChwbGF5ZXIucG9zaXRpb24ueSwgYmF0dGxlWm9uZS5wb3NpdGlvbi55KSk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICByZWN0YW5ndWxhckNvbGxpc2lvbih7XHJcbiAgICAgICAgICByZWN0YW5nbGUxOiBwbGF5ZXIsXHJcbiAgICAgICAgICByZWN0YW5nbGUyOiBiYXR0bGVab25lLFxyXG4gICAgICAgIH0pICYmXHJcbiAgICAgICAgb3ZlcmxhcHBpbmdBcmVhID4gKHBsYXllci53aWR0aCAqIHBsYXllci5oZWlnaHQpIC8gMiAmJlxyXG4gICAgICAgIE1hdGgucmFuZG9tKCkgPCAwLjAxXHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vZGVhY3RpdmF0ZSBjdXJyZW50IGFuaW1hdGlvbiBsb29wXHJcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbklkKTtcclxuXHJcbiAgICAgICAgYXVkaW8ubWFwLnN0b3AoKTtcclxuICAgICAgICBhdWRpby5pbml0QmF0dGxlLnBsYXkoKTtcclxuICAgICAgICBhdWRpby5iYXR0bGUucGxheSgpO1xyXG5cclxuICAgICAgICBiYXR0bGVTY2VuZS5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGdzYXAudG8oJyNjYW52YXMtb3ZlcmxheScsIHtcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICByZXBlYXQ6IDMsXHJcbiAgICAgICAgICB5b3lvOiB0cnVlLFxyXG4gICAgICAgICAgZHVyYXRpb246IDAuNCxcclxuICAgICAgICAgIG9uQ29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgIGdzYXAudG8oJyNjYW52YXMtb3ZlcmxheScsIHtcclxuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjQsXHJcbiAgICAgICAgICAgICAgb25Db21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgICAgIC8vYWN0aXZhdGUgYSBuZXcgYW5pbWF0aW9uIGxvb3BcclxuICAgICAgICAgICAgICAgIGJhdHRsZVNjZW5lLmluaXRCYXR0bGUoKTtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVNjZW5lLmFuaW1hdGVCYXR0bGUoKTtcclxuICAgICAgICAgICAgICAgIGdzYXAudG8oJyNjYW52YXMtb3ZlcmxheScsIHsgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNCB9KTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChrZXlzLncucHJlc3NlZCAmJiBsYXN0S2V5ID09PSAndycpIHtcclxuICAgIHBsYXllci5hbmltYXRlID0gdHJ1ZTtcclxuICAgIHBsYXllci5pbWFnZSA9IHBsYXllci5zcHJpdGVzLnVwO1xyXG4gICAge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvdW5kYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBib3VuZGF5ID0gYm91bmRhcmllc1tpXTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICByZWN0YW5ndWxhckNvbGxpc2lvbih7XHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTE6IHBsYXllcixcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMjoge1xyXG4gICAgICAgICAgICAgIC4uLmJvdW5kYXksXHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IHsgeDogYm91bmRheS5wb3NpdGlvbi54LCB5OiBib3VuZGF5LnBvc2l0aW9uLnkgKyAzIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgbW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChtb3ZpbmcpIG1vdmFibGVzLmZvckVhY2goKG1vdmFibGUpID0+IChtb3ZhYmxlLnBvc2l0aW9uLnkgKz0gMykpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoa2V5cy5hLnByZXNzZWQgJiYgbGFzdEtleSA9PT0gJ2EnKSB7XHJcbiAgICBwbGF5ZXIuYW5pbWF0ZSA9IHRydWU7XHJcbiAgICBwbGF5ZXIuaW1hZ2UgPSBwbGF5ZXIuc3ByaXRlcy5sZWZ0O1xyXG4gICAge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvdW5kYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBib3VuZGF5ID0gYm91bmRhcmllc1tpXTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICByZWN0YW5ndWxhckNvbGxpc2lvbih7XHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTE6IHBsYXllcixcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMjoge1xyXG4gICAgICAgICAgICAgIC4uLmJvdW5kYXksXHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IHsgeDogYm91bmRheS5wb3NpdGlvbi54ICsgMywgeTogYm91bmRheS5wb3NpdGlvbi55IH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgbW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1vdmluZykgbW92YWJsZXMuZm9yRWFjaCgobW92YWJsZSkgPT4gKG1vdmFibGUucG9zaXRpb24ueCArPSAzKSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChrZXlzLmQucHJlc3NlZCAmJiBsYXN0S2V5ID09PSAnZCcpIHtcclxuICAgIHBsYXllci5hbmltYXRlID0gdHJ1ZTtcclxuICAgIHBsYXllci5pbWFnZSA9IHBsYXllci5zcHJpdGVzLnJpZ2h0O1xyXG4gICAge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvdW5kYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBib3VuZGF5ID0gYm91bmRhcmllc1tpXTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICByZWN0YW5ndWxhckNvbGxpc2lvbih7XHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTE6IHBsYXllcixcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMjoge1xyXG4gICAgICAgICAgICAgIC4uLmJvdW5kYXksXHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IHsgeDogYm91bmRheS5wb3NpdGlvbi54IC0gMywgeTogYm91bmRheS5wb3NpdGlvbi55IH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgbW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1vdmluZykgbW92YWJsZXMuZm9yRWFjaCgobW92YWJsZSkgPT4gKG1vdmFibGUucG9zaXRpb24ueCAtPSAzKSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChrZXlzLnMucHJlc3NlZCAmJiBsYXN0S2V5ID09PSAncycpIHtcclxuICAgIHBsYXllci5hbmltYXRlID0gdHJ1ZTtcclxuICAgIHBsYXllci5pbWFnZSA9IHBsYXllci5zcHJpdGVzLmRvd247XHJcbiAgICB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm91bmRhcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGJvdW5kYXkgPSBib3VuZGFyaWVzW2ldO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHJlY3Rhbmd1bGFyQ29sbGlzaW9uKHtcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMTogcGxheWVyLFxyXG4gICAgICAgICAgICByZWN0YW5nbGUyOiB7XHJcbiAgICAgICAgICAgICAgLi4uYm91bmRheSxcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogeyB4OiBib3VuZGF5LnBvc2l0aW9uLngsIHk6IGJvdW5kYXkucG9zaXRpb24ueSAtIDMgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobW92aW5nKSBtb3ZhYmxlcy5mb3JFYWNoKChtb3ZhYmxlKSA9PiAobW92YWJsZS5wb3NpdGlvbi55IC09IDMpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuYW5pbWF0ZSgpO1xyXG5cclxuLy9iYXR0bGVTY2VuZS5pbml0QmF0dGxlKCk7XHJcbi8vYmF0dGxlU2NlbmUuYW5pbWF0ZUJhdHRsZSgpO1xyXG5cclxubGV0IGxhc3RLZXkgPSAnJztcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gIHN3aXRjaCAoZS5rZXkpIHtcclxuICAgIGNhc2UgJ3cnOlxyXG4gICAgICBrZXlzLncucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgIGxhc3RLZXkgPSAndyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnYSc6XHJcbiAgICAgIGtleXMuYS5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgbGFzdEtleSA9ICdhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdzJzpcclxuICAgICAga2V5cy5zLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICBsYXN0S2V5ID0gJ3MnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2QnOlxyXG4gICAgICBrZXlzLmQucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgIGxhc3RLZXkgPSAnZCc7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xyXG4gIHN3aXRjaCAoZS5rZXkpIHtcclxuICAgIGNhc2UgJ3cnOlxyXG4gICAgICBrZXlzLncucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2EnOlxyXG4gICAgICBrZXlzLmEucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3MnOlxyXG4gICAgICBrZXlzLnMucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2QnOlxyXG4gICAgICBrZXlzLmQucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbn0pO1xyXG5cclxuLy9ubyBhdXRvcGxheSBwb2xpY3kgb2YgYnJvd3NlcnNcclxubGV0IGNsaWNrZWQgPSBmYWxzZTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmICghY2xpY2tlZCkge1xyXG4gICAgYXVkaW8ubWFwLnBsYXkoKTtcclxuICAgIGNsaWNrZWQgPSB0cnVlO1xyXG4gIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6WyJTcHJpdGUiLCJNb25zdGVyIiwiYXR0YWNrcyIsIm1vbnN0ZXJzIiwiYXVkaW8iLCJCYXR0bGUiLCJhbmltYXRpb25JZCIsImFuaW1hdGUiLCJjb25zdHJ1Y3RvciIsImN0eCIsInJlbmRlcmVkU3ByaXRlcyIsImJhdHRsZUJhY2tncm91bmRJbWFnZSIsIkltYWdlIiwic3JjIiwiYmF0dGxlQmFja2dyb3VuZCIsInBvc2l0aW9uIiwieCIsInkiLCJpbWFnZSIsImRyYWdnbGUiLCJlbWJ5IiwicXVldWUiLCJpbml0aWFsaXplIiwiaW5pdGlhdGVkIiwiZGlhbG9ndWVCb3giLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImxlbmd0aCIsInNoaWZ0IiwiY3VycmVudFRhcmdldCIsInN0eWxlIiwiZGlzcGxheSIsImluaXRCYXR0bGUiLCJ3aWR0aCIsInJlcGxhY2VDaGlsZHJlbiIsIkRyYWdnbGUiLCJFbWJ5IiwiZm9yRWFjaCIsImF0dGFjayIsImJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJuYW1lIiwiYXBwZW5kIiwiYnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RlZEF0dGFjayIsInJlY2lwaWVudCIsImhlYWx0aCIsInB1c2giLCJmYWludCIsImdzYXAiLCJ0byIsIm9wYWNpdHkiLCJvbkNvbXBsZXRlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJtYXAiLCJwbGF5IiwicmFuZG9tQXR0YWNrIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidHlwZSIsImNvbG9yIiwiYW5pbWF0ZUJhdHRsZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRyYXciLCJzcHJpdGUiLCJCb3VuZGFyeSIsImhlaWdodCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZnJhbWVzIiwibWF4IiwiaG9sZCIsInNwcml0ZXMiLCJyb3RhdGlvbiIsImlzRW5lbXkiLCJiYXR0bGUiLCJzdG9wIiwidmljdG9yeSIsImhlYWx0aEJhciIsImRhbWFnZSIsImluaXRGaXJlYmFsbCIsImZpcmViYWxsSW1hZ2UiLCJmaXJlYmFsbCIsInNwbGljZSIsImZpcmViYWxsSGl0IiwieW95byIsInJlcGVhdCIsImR1cmF0aW9uIiwidGwiLCJ0aW1lbGluZSIsIm1vdmVtZW50RGlzdGFuY2UiLCJ0YWNrbGVIaXQiLCJ2YWwiLCJlbGFwc2VkIiwib25sb2FkIiwic2F2ZSIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsImdsb2JhbEFscGhhIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsIlRhY2tsZSIsIkZpcmViYWxsIiwiZGVmYXVsdFZvbHVtZSIsImhpZ2hWb2x1bWUiLCJIb3dsIiwiaHRtbDUiLCJ2b2x1bWUiLCJjYW52YXMiLCJnZXRDb250ZXh0IiwiY29sbGlzaW9uc01hcCIsImkiLCJjb2xsaXNpb25zIiwic2xpY2UiLCJiYXR0bGVab25lc01hcCIsImJhdHRsZVpvbmVzRGF0YSIsImJvdW5kYXJpZXMiLCJvZmZzZXQiLCJyb3ciLCJzeW1ib2wiLCJqIiwiYmF0dGxlWm9uZXMiLCJtYXBJbWFnZSIsImZvcmVncm91bmRJbWFnZSIsInBsYXllckRvd25JbWFnZSIsInBsYXllclVwSW1hZ2UiLCJwbGF5ZXJMZWZ0SW1hZ2UiLCJwbGF5ZXJSaWdodEltYWdlIiwicGxheWVyIiwidXAiLCJkb3duIiwibGVmdCIsInJpZ2h0IiwiYmFja2dyb3VuZCIsImZvcmVncm91bmQiLCJrZXlzIiwidyIsInByZXNzZWQiLCJhIiwicyIsImQiLCJtb3ZhYmxlcyIsInJlY3Rhbmd1bGFyQ29sbGlzaW9uIiwicmVjdGFuZ2xlMSIsInJlY3RhbmdsZTIiLCJiYXR0bGVTY2VuZSIsImJvdW5kYXkiLCJiYXR0bGVab25lIiwibW92aW5nIiwib3ZlcmxhcHBpbmdBcmVhIiwibWluIiwibGFzdEtleSIsIm1vdmFibGUiLCJrZXkiLCJjbGlja2VkIl0sInNvdXJjZVJvb3QiOiIifQ==