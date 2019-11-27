import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {Cliente} from '../model/cliente';
import {Pedido} from '../model/pedido';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {dateStringToDateJs} from '../helper/date.helper';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseService<Pedido> {

  constructor(protected http: HttpClient) {
    super(http, 'pedido');
  }

  findOne(id: number): Observable<Pedido> {
    return super.findOne(id).pipe(map(val => {
      val.dataEmissao = dateStringToDateJs(val.dataEmissao.toString());
      return val;
    }));
  }
}
