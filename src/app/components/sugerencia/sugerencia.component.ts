import { Component, Input } from '@angular/core';

@Component({
  selector: 'sugerencia',
  templateUrl: './sugerencia.component.html',
  styleUrls: ['./sugerencia.component.css']
})
export class SugerenciaComponent {
  @Input() id: number = 0;
  @Input() nombre: string = "";
  @Input() img: string = "";
}