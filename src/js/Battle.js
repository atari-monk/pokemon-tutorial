import { Sprite } from './Sprite.js';
import { Monster } from './Monster.js';
import { attacks } from './data/attacks.js';
import { monsters } from './data/monsters.js';

export class Battle {
  constructor(ctx) {
    this.ctx = ctx;
    this.renderedSprites = [];
    this.attacks = attacks;

    this.battleBackgroundImage = new Image();
    this.battleBackgroundImage.src = './assets/battleBackground.png';
    this.battleBackground = new Sprite({
      position: { x: 0, y: 0 },
      image: this.battleBackgroundImage,
    });

    this.draggle = new Monster(monsters.Draggle);
    this.emby = new Monster(monsters.Emby);

    this.queue = [];

    this.initialize();
  }

  initialize() {
    this.renderedSprites = [this.draggle, this.emby];

    this.emby.attacks.forEach((attack) => {
      const button = document.createElement('button');
      button.innerHTML = attack.name;
      document.querySelector('#attacks-container').append(button);
    });

    this.buttons = document.querySelectorAll('button');

    this.buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const selectedAttack = this.attacks[e.currentTarget.innerHTML];
        this.emby.attack({
          attack: selectedAttack,
          recipient: this.draggle,
          renderedSprites: this.renderedSprites,
        });

        if (this.draggle.health <= 0) {
          this.queue.push(() => {
            this.draggle.faint();
          });

          return;
        }

        const randomAttack =
          this.draggle.attacks[
            Math.floor(Math.random() * this.draggle.attacks.length)
          ];

        this.queue.push(() => {
          this.draggle.attack({
            attack: randomAttack,
            recipient: this.emby,
            renderedSprites: this.renderedSprites,
          });

          if (this.emby.health <= 0) {
            this.queue.push(() => {
              this.emby.faint();
            });
          }
        });
      });

      button.addEventListener('mouseenter', (e) => {
        const selectedAttack = this.attacks[e.currentTarget.innerHTML];
        document.querySelector('#attack-type').innerHTML = selectedAttack.type;
        document.querySelector('#attack-type').style.color =
          selectedAttack.color;
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
