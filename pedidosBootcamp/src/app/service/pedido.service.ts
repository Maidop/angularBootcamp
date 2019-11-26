import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {Cliente} from '../model/cliente';
import {Pedido} from '../model/pedido';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseService<Pedido> {

  constructor(protected http: HttpClient) {
    super(http, 'pedido');
  }
}
