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
  todosLosPokemones: { id: number; nombre: string; img: string }[] = [];
  sugerencias: { id: number; nombre: string; img: string }[] = [];
  sugerenciasContainer = document.getElementsByClassName("sugerencias-container")[0] as HTMLElement;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=1025')
      .subscribe(data => {
        this.todosLosPokemones = data.results.map((p: any) => {
          const id = parseInt(p.url.split('/')[6]);
          return {
            id,
            nombre: p.name,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        });
      });
  }
  
  

  // ngOnChange(): void{
  //   this.filtrarPokemones();
  //   for (let i = 0; i < this.todosLosPokemonesId.length; i++){
  //     this.sugerenciasContainer.innerHTML += 
  //     '<li><sugerencia [id]='+ this.todosLosPokemonesId[i] 
  //     +' [nombre]='+ this.todosLosPokemonesNombre[i] 
  //     + ' [img]='+ this.todosLosPokemonesImg[i] 
  //     + '></sugerencia></li>' 
  //   }
  // }

  filtrarPokemones(): void {
    if (this.busqueda.length >= 2) {
      const valor = this.busqueda.toLowerCase();
      this.sugerencias = this.todosLosPokemones.filter(poke =>
        poke.nombre.toLowerCase().includes(valor) ||
        poke.id.toString().includes(valor)
      );
    } else {
      this.sugerencias = [];
    }
  }
  

  
}
