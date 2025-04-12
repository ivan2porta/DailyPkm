import { Component} from '@angular/core';
import { RespData } from './models/resp-data.interface';
import { getDailyRandomNumber, obtenerGeneracion, extraerTipos } from './utils/helpers';

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







