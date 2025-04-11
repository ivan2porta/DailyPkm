import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cuadro',
  templateUrl: './cuadro.component.html',
  styleUrls: ['./cuadro.component.css']
})
export class CuadroComponent implements OnChanges {
  @Input() imagen: string = "";
  @Input() alter: string = "";
  @Input() indicador: boolean = false;
  @Input() resp: string = "";

  flecha: string = "";

  // Método que se llama cuando cambian los inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resp'] && this.resp) {
      this.setFlecha();
    }
  }

  // Método que determina la flecha según el valor de 'resp'
  setFlecha(): void {
    if (this.resp === "Mayor") {
      this.flecha = "abajo";
    } else if (this.resp === "Menor") {
      this.flecha = "arriba";
    } else {
      this.flecha = "";  // Si no es "Mayor" ni "Menor", vaciar la flecha
    }
  }

  // Puedes usar ngOnInit para inicializar otras cosas si es necesario
  ngOnInit(): void {
    // Aquí podrías inicializar otro tipo de lógica si es necesario
    this.setFlecha();
  }
}

