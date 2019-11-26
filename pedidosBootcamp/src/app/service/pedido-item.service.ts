import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {PedidoItem} from '../model/pedidoItem';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoItemService extends BaseService<PedidoItem>{

  constructor(protected http: HttpClient) {
    super(http, 'pedido-item');
  }
}
