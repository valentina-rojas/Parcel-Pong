import Phaser from "phaser";
import Paleta from "../componentes/Paleta";
import Pelota from "../componentes/Pelota";
import events from "./EventCenter";

export default class Pong extends Phaser.Scene {
  nivel;

  puntos;

  obstaculos = [];

  paleta;

  pelota;

  velocidadPaleta;

  velocidadPelota;

  constructor() {
    super("pong");
  }

  init(data) {
    this.nivel = data.nivel || 1;
    this.puntos = data.puntos || 0;
    this.velocidadPaleta = data.velocidadPaleta || 300;
    this.velocidadPelota = data.velocidadPelota || 200;
  }

  create() {
    // lanza la escena de interfaz de usuario "ui" con datos iniciales
    this.scene.launch("ui", {
      nivel: this.nivel,
      puntos: this.puntos,
    });

    // crea una instancia de la paleta
    this.paleta = new Paleta(
      this,
      400,
      550,
      100,
      20,
      0xffffff,
      this.velocidadPaleta
    );

    // crea una instancia de la pelota
    this.pelota = new Pelota(
      this,
      400,
      300,
      10,
      0xffffff,
      this.velocidadPelota
    );

    // colision entre la paleta y la pelota
    this.physics.add.collider(
      this.paleta,
      this.pelota,
      this.chocaPaleta,
      null,
      this
    );

    this.obstaculos.forEach((obstaculo) => {
      const item = this.add.rectangle(
        obstaculo.x,
        obstaculo.y,
        obstaculo.ancho,
        obstaculo.alto,
        0xffffff
      );
      this.physics.add.existing(item);

      // comprueba si el cuerpo es de tipo Phaser.Physics.Arcade.Body
      if (item.body instanceof Phaser.Physics.Arcade.Body) {
        // si es un cuerpo de tipo Arcade, establece que es inamovible
        item.body.setImmovable(true);
      }

      // agrega una colisión entre la pelota y el obstáculo
      this.physics.add.collider(this.pelota, item);
    });
  }

  update() {
    // movimiento del jugador
    this.paleta.actualizar();
  }

  chocaPaleta() {
    this.puntos += 1;
    events.emit("actualizarDatos", {
      nivel: this.nivel,
      puntos: this.puntos,
    });

    if (this.puntos === 3) {
      this.pasarNivel();
    }

    this.pelota.cambiarColor();
  }

  pasarNivel() {
    this.nivel += 1;
    this.puntos = 0;
    this.velocidadPelota *= 1.1;
    this.velocidadPaleta += 50;
    this.obstaculos.push({
      x: Phaser.Math.Between(100, 700),
      y: Phaser.Math.Between(0, 400),
      ancho: Phaser.Math.Between(50, 100),
      alto: Phaser.Math.Between(20, 40),
    });

    // reinicia la escena actual con los nuevos datos
    this.scene.start("pong", {
      nivel: this.nivel,
      puntos: this.puntos,
      velocidadPelota: this.velocidadPelota,
      velocidadPaleta: this.velocidadPaleta,
      obstaculos: this.obstaculos,
    });
  }
}
