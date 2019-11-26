import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../model/pedido';
import {PedidoService} from '../../service/pedido.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Cliente} from '../../model/cliente';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit {
  objeto: Pedido;
  constructor(private pedidoService: PedidoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.pedidoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  private resetaForm() {
    this.objeto = new Pedido();
    this.objeto.cliente.nome = '';
    this.objeto.dataEmissao = null;
    this.objeto.total = null;
  }

}
