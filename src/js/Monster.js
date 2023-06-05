import { Sprite } from './Sprite.js';

export class Monster extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks
  }) {
    super({ position, image, frames, sprites, animate, rotation });
    this.health = 100;
    this.isEnemy = isEnemy;
    this.name = name;
    this.attacks = attacks;
  }

  attack({ attack, recipient, renderedSprites }) {
    const dialogueBox = document.querySelector('#dialogue-box');
    dialogueBox.style.display = 'block';
    dialogueBox.innerHTML = `${this.name} used ${attack.name}`;

    let healthBar = '#enemy-health-bar';
    if (this.isEnemy) healthBar = '#player-health-bar';

    let rotation = 1;
    if (this.isEnemy) rotation = -2.2;

    this.health -= attack.damage;

    switch (attack.name) {
      case 'Fireball':
        const fireballImage = new Image();
        fireballImage.src = './assets/fireball.png';
        const fireball = new Sprite({
          position: { x: this.position.x, y: this.position.y },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
          rotation,
        });

        renderedSprites.splice(1, 0, fireball);

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            //enemy gets hit
            gsap.to(healthBar, {
              width: this.health + '%',
            });

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            });

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08,
            });
            renderedSprites.splice(1, 1);
          },
        });

        break;
      case 'Tackle':
        const tl = gsap.timeline();

        let movementDistance = 20;
        if (this.isEnemy) movementDistance = -20;

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              //enemy gets hit
              gsap.to(healthBar, {
                width: this.health + '%',
              });

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });

              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, { x: this.position.x });
        break;
    }
  }
}
