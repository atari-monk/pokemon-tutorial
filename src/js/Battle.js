import { Sprite } from './Sprite.js';
import { attacks } from './data/attacks.js';

export class Battle {
  constructor(ctx, buttons) {
    this.ctx = ctx;
    this.buttons = buttons;
    this.renderedSprites = [];
    this.attacks = attacks;

    this.battleBackgroundImage = new Image();
    this.battleBackgroundImage.src = './assets/battleBackground.png';
    this.battleBackground = new Sprite({
      position: { x: 0, y: 0 },
      image: this.battleBackgroundImage,
    });

    this.draggleImage = new Image();
    this.draggleImage.src = './assets/draggleSprite.png';
    this.draggle = new Sprite({
      position: { x: 800, y: 100 },
      image: this.draggleImage,
      frames: { max: 4, hold: 30 },
      animate: true,
      isEnemy: true,
      name: 'Draggle',
    });

    this.embyImage = new Image();
    this.embyImage.src = './assets/embySprite.png';
    this.emby = new Sprite({
      position: { x: 280, y: 325 },
      image: this.embyImage,
      frames: { max: 4, hold: 30 },
      animate: true,
      name: 'Emby',
    });

    this.queue = [];

    this.initialize();
  }

  initialize() {
    this.renderedSprites = [this.draggle, this.emby];
    this.buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const selectedAttack = this.attacks[e.currentTarget.innerHTML];
        this.emby.attack({
          attack: selectedAttack,
          recipient: this.draggle,
          renderedSprites: this.renderedSprites,
        });

        this.queue.push(() => {
          this.draggle.attack({
            attack: this.attacks.Tackle,
            recipient: this.emby,
            renderedSprites: this.renderedSprites,
          });
        });

        this.queue.push(() => {
          this.draggle.attack({
            attack: this.attacks.Fireball,
            recipient: this.emby,
            renderedSprites: this.renderedSprites,
          });
        });
      });
    });

    const dialogueBox = document.querySelector('#dialogue-box');
    dialogueBox.addEventListener('click', (e) => {
      if (this.queue.length > 0) {
        this.queue[0]();
        this.queue.shift();
      } else e.currentTarget.style.display = 'none';
    });
  }

  animateBattle() {
    window.requestAnimationFrame(() => this.animateBattle());

    console.log('Animate Battle');
    this.battleBackground.draw(this.ctx);

    this.renderedSprites.forEach((sprite) => {
      sprite.draw(this.ctx);
    });
  }
}
