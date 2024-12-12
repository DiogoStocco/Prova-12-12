import { Usuario } from "./Usuario";

export interface Imc 
{
  id: number;
  indice: number;
  altura: number;
  peso: number;
  categoria: string;
  usuarioId: number;
  usuario?: Usuario;
}