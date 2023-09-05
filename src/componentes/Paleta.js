import Phaser from "phaser";


// define una clase llamada "Paleta" que hereda de Phaser.GameObjects.Rectangle
export default class Paleta extends Phaser.GameObjects.Rectangle {
  velocidad;

  cursor;

  // constructor de la clase, se ejecuta cuando se crea una instancia de "Paleta"
  constructor(scene, x, y, w, h, color, velocidad) {
    // llama al constructor de la clase base (Phaser.GameObjects.Rectangle)
    super(scene, x, y, w, h, color);

    // agrega la paleta a la escena actual y agrega física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // comprueba si el cuerpo de la paleta es del tipo Phaser.Physics.Arcade.Body
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setImmovable(true);
      this.body.allowGravity = false;
      this.body.setCollideWorldBounds(true);
    }

    this.velocidad = velocidad;

    this.cursor = scene.input.keyboard.createCursorKeys();
  }

  actualizar() {
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      if (this.cursor.left.isDown) {
        this.body.setVelocityX(-this.velocidad);
      } else if (this.cursor.right.isDown) {
        this.body.setVelocityX(this.velocidad);
      } else {
        this.body.setVelocityX(0);
      }
    }
  }
}
