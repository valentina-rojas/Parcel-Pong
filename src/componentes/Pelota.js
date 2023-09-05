import Phaser from "phaser";

export default class Pelota extends Phaser.GameObjects.Arc {
  velocidad;

  constructor(scene, x, y, r, color, velocidad) {
    super(scene, x, y, r, 0, 360, false, color);
    this.velocidad = velocidad;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // comprueba si el cuerpo de la paleta es del tipo Phaser.Physics.Arcade.Body
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setBounce(1, 1);
      this.body.setCollideWorldBounds(true);
      this.body.setVelocity(this.velocidad, this.velocidad);
    }
  }

  cambiarColor() {
    this.fillColor = Phaser.Display.Color.RandomRGB().color;
  }
}


