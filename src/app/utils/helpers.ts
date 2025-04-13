export function extraerTipos(arrayTipos: Array<any>) {
    let tiposExtraidos: string[] = [];
    arrayTipos.forEach((tipo) => {
      if (tipo && tipo.type && tipo.type.name) {
        let tipoTraducido = traducirTipo(tipo.type.name);
        tiposExtraidos.push(tipoTraducido);
      }
    });
    return tiposExtraidos;
  }

export function traducirTipo(tipo: string) {
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

  export function obtenerGeneracion(numeroPokédex: number): number {
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
  
  export function getDailyRandomNumber(min: number = 1, max: number = 1025): number {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  
    // Convertir la fecha a un número hash (como semilla)
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed = (seed * 31 + today.charCodeAt(i)) >>> 0; // fuerza a unsigned 32-bit
    }
  
    // Pseudo-random generator (LCG)
    function seededRandom(seed: number): number {
      const a = 1664525;
      const c = 1013904223;
      const m = 2 ** 32;
      seed = (a * seed + c) % m;
      return seed / m;
    }
  
    const random = seededRandom(seed);
    return Math.floor(random * (max - min + 1)) + min;
  }
  
  function normalize(val: number, min: number, max: number): number {
    return (val - 0) / (100 - 0) * (max - min) + min;
  }
  
  export function getRoll(min: number, max: number): number {
    const date = new Date();
  
    const dateParts = [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1, 
      date.getUTCDate()
    ];
  
    const dateString = dateParts.map(n => n.toString().padStart(2, '0')).join('');
    const dateAsNumber = +dateString;
    const uniqueNumberString = Math.pow(dateAsNumber, 2).toString();
    const rollOutOf100 = parseInt(uniqueNumberString.slice(-2), 10);

    return Math.round(normalize(rollOutOf100, min, max));
  }