import { Component, Input } from '@angular/core';

@Component({
  selector: 'cuadro',
  templateUrl: './cuadro.component.html',
  styleUrls: ['./cuadro.component.css']
})
export class CuadroComponent {
  @Input() imagen: string = "";
  @Input() alter: string = "";
}
