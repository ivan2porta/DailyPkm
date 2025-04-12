import { Component} from '@angular/core';
import { RespData } from './models/resp-data.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dailypkm';
  respData: RespData = {
    respuesta: getDailyRandomNumber(1, 1025),
    pokemon:  {},
    respuestaNombre: "",
    respuestaGen: 0,
    respuestaTipos: [""],
    respuestaTiposTraducidos: [""],
    respuestaTipo1: "",
    respuestaTipo2: "",
    respuestaPeso: 0,
    respuestaAltura: 0,
  }

  constructor() {
    this.init();
  }

  // Métodos asíncronos en el constructor
  async init() {
    await this.loadInfo(this.respData.respuesta);
    console.log(this.respData);
  }

  async loadInfo(num: number) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      const data = await res.json();
      this.respData.pokemon = data;
      this.respData.respuestaNombre = data.name;
      this.respData.respuestaTipos = data.types;
      this.respData.respuestaTiposTraducidos = extraerTipos(this.respData.respuestaTipos);
      this.respData.respuestaTipo1 = this.respData.respuestaTiposTraducidos[0];
      (this.respData.respuestaTiposTraducidos.length > 1) ? this.respData.respuestaTipo2 = this.respData.respuestaTiposTraducidos[1] : this.respData.respuestaTipo2 = "Sin tipo";
      this.respData.respuestaPeso = data.weight / 10;
      this.respData.respuestaAltura = data.height / 10;
      this.respData.respuestaGen = obtenerGeneracion(data.id);



    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }
}

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

function getDailyRandomNumber(min: number = 1, max: number = 1025): number {
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  // DJB2 hash para la fecha
  let hash = 5381;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) + hash) + today.charCodeAt(i); // hash * 33 + char
  }

  // Asegura un número positivo
  const positiveHash = Math.abs(hash);

  // Escalarlo al rango deseado
  return (positiveHash % (max - min + 1)) + min;
}





