import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {Produto} from '../model/Produto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService<Produto> {

  constructor(protected http: HttpClient) {
    super(http, 'produto');
  }
}
