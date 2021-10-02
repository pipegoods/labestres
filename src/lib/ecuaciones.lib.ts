import {
  IRegistro,
  RegistroIntervalo,
  RegistroTypeString,
} from "../interfaces/IReporte";
import * as MathJS from "mathjs";

// const listadoRR = (arrProps: IRegistro[]) => {
//   const arr = arrProps.slice();
//   return arr.map((a) => a.rr);
// };

// const calcularModa = (arrProps: IRegistro[]) => {
//   return MathJS.mode(listadoRR(arrProps));
// };

const calcularModaRR = (arrProps: number[]) => {
  return MathJS.mode(arrProps);
};

// const arrayMin = (arrProps: IRegistro[]) => {
//   return Math.min.apply(Math, listadoRR(arrProps));
// };

const arrayMinRR = (arrProps: number[]) => {
  return Math.min.apply(Math, arrProps);
};

// const arrayMax = (arrProps: IRegistro[]) => {
//   return Math.max.apply(Math, listadoRR(arrProps));
// };

const arrayMaxRR = (arrProps: number[]) => {
  return Math.max.apply(Math, arrProps);
};

export const timestamptodate = (arrProps: IRegistro[]) => {
  const arr = arrProps.slice();
  const arrReturn: RegistroTypeString[] = [];
  arr.forEach((a) => {
    const date = a.createdAt.toDate();

    // Minutes
    var minutes = "0" + date.getMinutes();

    // Seconds
    var seconds = "0" + date.getSeconds();
    arrReturn.push({
      rr: a.rr,
      bpm: a.bpm,
      id: a.id,
      createdAt: minutes.substr(-2) + ":" + seconds.substr(-2),
    });
  });
  return arrReturn;
};

// const modaaaa = (registro: IRegistro[]) => {
//   console.log(calcularModa(registro)[0]);
//   const moda = calcularModa(registro)[0];
//   console.log(`numero de registros: ${registro.length}`);
//   console.log("MAX: ", arrayMax(registro));
//   console.log("MIN: ", arrayMin(registro));

//   if (moda) {
//     const porModa =
//       (registro.filter((r) => r.rr === moda).length / registro.length) * 100;
//     const maxArrayRR = arrayMax(registro) / 1000;
//     const minArrayRR = arrayMin(registro) / 1000;

//     console.log("%moda: ", porModa);
//     console.log("2M: ", (2 * moda) / 1000);
//     console.log("RRMax - RRMin: ", maxArrayRR - minArrayRR);

//     const idm = porModa / (((2 * moda) / 1000) * (maxArrayRR - minArrayRR));
//     console.log("Indice de estres mental: ", idm);
//     alert(`El indice de estres es: ${idm}`);
//   }

//   console.log(calcularIDM(separarIntervalos(registro)));
//   return calcularIDM(separarIntervalos(registro));
// };

const agregaMinutos = (dt: Date, minutos: number) => {
  return new Date(dt.getTime() + minutos * 60000);
};

export const separarIntervalos = (arrProps: IRegistro[], minutoIntervao : number) => {
  const arr = arrProps.slice();
  const arrReturn: RegistroIntervalo[] = [];
  let ultimoDate: Date = agregaMinutos(arr[0].createdAt.toDate(), minutoIntervao);
  let arrRR: number[] = [];
  let bandera: boolean = false;
  arr.forEach((registro) => {
    if (registro.createdAt.toDate() <= ultimoDate) {
      arrRR.push(registro.rr);
    } else {
      bandera = true;
      arrReturn.push({
        idm: 0,
        listaRR: arrRR,
        hora:
          registro.createdAt.toDate().getHours() +
          ":" +
          registro.createdAt.toDate().getMinutes() +
          ":" +
          registro.createdAt.toDate().getSeconds(),
        is: 0,
      });
      arrRR = [];
      ultimoDate = agregaMinutos(registro.createdAt.toDate(), minutoIntervao);
    }
  });

  if (!bandera) {
    arrReturn.push({
      idm: 0,
      listaRR: arrRR,
      hora: arr[0].createdAt.toDate().toString(),
      is: 0,
    });
  }

  return arrReturn;
};

export const calcularIDM = (arrProps: RegistroIntervalo[]) => {
  const arr = arrProps.slice();
  let moda: number;
  let min;
  let max;
  let porModa;
  arr.forEach((registro) => {
    if (registro.listaRR.length > 0) {
      moda = calcularModaRR(registro.listaRR)[0];
      min = arrayMinRR(registro.listaRR) / 1000;
      max = arrayMaxRR(registro.listaRR) / 1000;
      porModa =
        (registro.listaRR.filter((r) => r === moda).length /
          registro.listaRR.length) *
        100;
      registro.idm = porModa / (((2 * moda) / 1000) * (max - min));
      if (registro.idm < 40) {
        registro.is = 1; // Relajado
      } else if (registro.idm >= 40 && registro.idm < 150) {
        registro.is = 2; // Normal
      } else {
        registro.is = 3; // Estresado
      }
    }
  });

  return arr;
};
