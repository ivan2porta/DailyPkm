import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { crearPK } from '../../utils/helpers';

@Component({
  selector: 'buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  busqueda: string = '';
  todosLosPokemonesId: number[] = [];
  todosLosPokemonesNombre: string[] = [];
  todosLosPokemonesImg: string[] = [];
  sugerenciasId: number[] = [];
  sugerenciasNombre: string[] = [];
  sugerenciasImg: string[] = [];
  sugerenciasContainer = document.getElementsByClassName("sugerencias-container")[0] as HTMLElement;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=1025')
      .subscribe(data => {
        this.todosLosPokemonesId = data.results.map((p: any) => p.id);
        this.todosLosPokemonesNombre = data.results.map((p: any) => p.name);
        this.todosLosPokemonesImg = data.results.map((p: any) => p.sprites.front_default);
      });
  }

  ngOnChange(): void{
    this.filtrarPokemones();
    for (let i = 0; i < this.todosLosPokemonesId.length; i++){
      this.sugerenciasContainer.innerHTML += 
      '<li><sugerencia [id]='+ this.todosLosPokemonesId[i] 
      +' [nombre]='+ this.todosLosPokemonesNombre[i] 
      + ' [img]='+ this.todosLosPokemonesImg[i] 
      + '></sugerencia></li>' 
    }
  }

  filtrarPokemones(): void {
    if (this.busqueda.length >= 2) {
      const valor = this.busqueda.toLowerCase();
      this.sugerenciasNombre = this.todosLosPokemonesNombre.filter(nombre => nombre.includes(valor));
      this.sugerenciasId = this.todosLosPokemonesId.filter(id => id.toString().includes(valor));
      this.sugerenciasImg = this.todosLosPokemonesImg.filter(img => img.includes(valor));
    } else {
      this.sugerenciasNombre = [];
      this.sugerenciasId = [];
      this.sugerenciasImg = [];
    }
  }
  

  seleccionar(pokemon: string): void {
    this.busqueda = pokemon;
    this.sugerenciasNombre = [];
    crearPK(this.busqueda);
  }
}
