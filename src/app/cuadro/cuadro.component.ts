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

  color: boolean =false;
  flecha: string = "";

  // Método que se llama cuando cambian los inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resp'] && this.resp) {
      this.setFlecha();
      this.determinarColor();
      console.log(this.resp);
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

  determinarColor(){
    this.resp === "Igual" ? this.color = true : false;
  }
}



