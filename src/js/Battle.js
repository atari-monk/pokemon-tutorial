import { Sprite } from './Sprite.js';
import { Monster } from './Monster.js';
import { attacks } from './data/attacks.js';
import { monsters } from './data/monsters.js';

export class Battle {
  #animationId;
  #animate;

  constructor(ctx, animate) {
    this.ctx = ctx;
    this.renderedSprites = [];
    this.attacks = attacks;
    this.#animationId = 0;
    this.#animate = animate;
    console.log(this.#animate);

    this.battleBackgroundImage = new Image();
    this.battleBackgroundImage.src = './assets/battleBackground.png';
    this.battleBackground = new Sprite({
      position: { x: 0, y: 0 },
      image: this.battleBackgroundImage,
    });

    this.draggle = null;
    this.emby = null;

    this.queue = [];

    this.initialize();
    this.initiated = false;
  }

  initialize() {
    const dialogueBox = document.querySelector('#dialogue-box');
    dialogueBox.addEventListener('click', (e) => {
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

    this.draggle = new Monster(monsters.Draggle);
    this.emby = new Monster(monsters.Emby);
    this.renderedSprites = [this.draggle, this.emby];
    this.queue = [];

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
          this.queue.push(() => {
            gsap.to('#canvas-overlay', {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(this.#animationId);
                this.#animate();
                document.querySelector('#user-interface').style.display =
                  'none';
                gsap.to('#canvas-overlay', { opacity: 0 });
              },
            });
          });
          this.initiated = false;
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
            this.queue.push(() => {
              gsap.to('#canvas-overlay', {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(this.#animationId);
                  this.#animate();
                  document.querySelector('#user-interface').style.display =
                    'none';
                  gsap.to('#canvas-overlay', { opacity: 0 });
                },
              });
            });
            this.initiated = false;
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
  }

  animateBattle() {
    this.#animationId = window.requestAnimationFrame(() =>
      this.animateBattle()
    );

    this.battleBackground.draw(this.ctx);

    console.log('this.#animationId: ', this.#animationId);

    this.renderedSprites.forEach((sprite) => {
      sprite.draw(this.ctx);
    });
  }
}
