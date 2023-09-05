import Phaser from "phaser";
import events from "./EventCenter";

export default class UI extends Phaser.Scene {
  constructor() {
    super("ui");
  }

  init(data) {
    this.nivel = data.nivel || 1;
    this.puntos = data.puntos || 0;
  }

  create() {
    this.nivelTexto = this.add.text(700, 15, `Nivel ${  this.nivel}`, {
      fontSize: "20px",
    });

    this.cantidadPuntosTexto = this.add.text(15, 15, `Puntos: ${  this.puntos}`, {
      fontSize: "20px",
    });

    // escuchar eventos
    events.on("actualizarDatos", this.actualizarDatos, this);
  }

  
  actualizarDatos(data) {
    this.nivel = data.nivel;
    this.puntos = data.puntos;

    this.nivelTexto.setText(`Nivel ${  this.nivel}`);

    this.cantidadPuntosTexto.setText(`Puntos: ${  this.puntos}`);
  }
}
