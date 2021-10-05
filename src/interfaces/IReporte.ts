import firestore from "firebase/firestore";

export interface IReporte {
  id: string;
  nombreActividad: string;
  createdAt: firestore.Timestamp;
  idUser: string;
  registro: IRegistro[];
  status: boolean;
}

export interface IRegistro {
  bpm: number;
  createdAt: firestore.Timestamp;
  rr: number;
  id: string;
}

export interface RegistroTypeString {
  rr: number;
  bpm: number;
  id: string;
  createdAt: string;
}

export interface RegistroIntervalo {
  listaRR: number[];
  idm: number;
  is: number;
  hora: string;
}
