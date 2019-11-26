import {Cliente} from '../model/cliente';

export abstract class ListComponent<T> {
  lista: T[];
  cols: any;
  loading = false;
}
