import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pk',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {
  @Input() pokemonId: number = 0;
  @Input() respData = {};
  @Input() respPeso: number = 0;
  @Input() respGen: number = 0;
  @Input() respAltura: number = 0;

  pokemon: any = {};
  sprite: string = "";
  name: string = "";
  gen: number = 0;
  genImg: string = "";
  tipos: Array<any> = [];
  tiposTraducidos: Array<any> = [];
  tipo1: string = "";
  tipo1img: string = "";
  tipo2: string = "";
  tipo2img: string = "";
  peso: number = 0;
  altura: number = 0;
  respuestasNumericas = [""];

  ngOnChanges(changes: SimpleChanges) {
    // Verifica si el pokemonId cambió y si no es 0
    if (changes['pokemonId'] && this.pokemonId !== 0) {
      this.loadInfo(this.pokemonId);
    }
  }

  async loadInfo(num: number) {
    if (num === 0) {
      return; // Evita hacer la llamada a la API si el pokemonId es 0
    }
    
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      const data = await res.json();
      this.pokemon = data;
      this.sprite = data.sprites.front_default;
      this.name = data.name;
      this.tipos = data.types;
      this.tiposTraducidos = extraerTipos(this.tipos);
      this.tipo1 = this.tiposTraducidos[0];
      this.tipo1img = `assets/img/tipos/${this.tipo1}.png`;
      this.tipo2 = this.tiposTraducidos.length > 1 ? this.tiposTraducidos[1] : "Sin tipo";
      this.tipo2img = this.tiposTraducidos.length > 1 ? `assets/img/tipos/${this.tipo2}.png` : `assets/img/tipos/sinTipo.png`;
      this.peso = data.weight / 10;
      this.altura = data.height / 10;
      this.gen = obtenerGeneracion(data.id);
      this.genImg = `assets/img/generaciones/${this.gen}.png`;
      this.respuestasNumericas[0] = comparar(this.gen, this.respGen);
      this.respuestasNumericas[1] = comparar(this.peso, this.respPeso);
      this.respuestasNumericas[2] = comparar(this.altura, this.respAltura);
      console.log(this.respuestasNumericas);
      console.log(this.gen);
      console.log(this.respGen);
      console.log(this.peso);
      console.log(this.respPeso);
      console.log(this.altura);
      console.log(this.respAltura);

    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }

  constructor() {
    // No es necesario llamar a loadInfo aquí, ya que lo hacemos en ngOnChanges
  }
}

// Función para comparar los valores
function comparar(intento: number, respuesta: number): string {
  if (intento > respuesta) {
    return 'Mayor';
  } else if (intento < respuesta) {
    return 'Menor';
  } else {
    return 'Igual';
  }
}

// Función para extraer y traducir los tipos de Pokémon
function extraerTipos(arrayTipos: Array<any>) {
  let tiposExtraidos: string[] = [];
  arrayTipos.forEach((tipo) => {
    if (tipo && tipo.type && tipo.type.name) {
      let tipoTraducido = traducirTipo(tipo.type.name);
      tiposExtraidos.push(tipoTraducido);
    }
  });
  return tiposExtraidos;
}

// Función para obtener la generación de un Pokémon
function obtenerGeneracion(numeroPokédex: number): number {
  switch (true) {
    case (numeroPokédex >= 1 && numeroPokédex <= 151):
      return 1;  // Generación I
    case (numeroPokédex >= 152 && numeroPokédex <= 251):
      return 2;  // Generación II
    case (numeroPokédex >= 252 && numeroPokédex <= 386):
      return 3;  // Generación III
    case (numeroPokédex >= 387 && numeroPokédex <= 493):
      return 4;  // Generación IV
    case (numeroPokédex >= 494 && numeroPokédex <= 649):
      return 5;  // Generación V
    case (numeroPokédex >= 650 && numeroPokédex <= 721):
      return 6;  // Generación VI
    case (numeroPokédex >= 722 && numeroPokédex <= 809):
      return 7;  // Generación VII
    case (numeroPokédex >= 810 && numeroPokédex <= 905):
      return 8;  // Generación VIII
    case (numeroPokédex >= 906 && numeroPokédex <= 1025):
      return 9;  // Generación IX
    default:
      return -1;  // Generación desconocida
  }
}

// Función para traducir los tipos de Pokémon
function traducirTipo(tipo: string) {
  switch (tipo.toLowerCase()) {
    case "grass":
      return "planta";
    case "fire":
      return "fuego";
    case "water":
      return "agua";
    case "electric":
      return "electrico";
    case "bug":
      return "bicho";
    case "fairy":
      return "hada";
    case "normal":
      return "normal";
    case "poison":
      return "veneno";
    case "psychic":
      return "psiquico";
    case "ghost":
      return "fantasma";
    case "dragon":
      return "dragon";
    case "dark":
      return "siniestro";
    case "steel":
      return "acero";
    case "fighting":
      return "lucha";
    case "flying":
      return "volador";
    case "ice":
      return "hielo";
    case "rock":
      return "roca";
    case "ground":
      return "tierra";
    default:
      return "Desconocido"; 
  }
}
