import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../model/pedido';
import {PedidoService} from '../../service/pedido.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService, SelectItem} from 'primeng/api';
import {Cliente} from '../../model/cliente';
import {PedidoItemService} from '../../service/pedido-item.service';
import {ClienteService} from '../../service/cliente.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit {
  pedido: Pedido;
  clienteList: Cliente[];
  clienteDropdown: SelectItem[];
  constructor(private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private pedidoItemService: PedidoItemService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.clienteService.findAll().subscribe(val => this.clienteList = val);
    this.clienteDropdown = this.clienteList.map(val => {
      const selectItem: SelectItem = {
        label: val.nome,
        value: val
      };
      return selectItem;
    });

    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.pedidoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.pedido = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  private resetaForm() {
    this.pedido = new Pedido();
    this.pedido.cliente.nome = '';
    this.pedido.dataEmissao = null;
    this.pedido.total = null;
    this.pedido.pedidoItemList = [];
  }

  salvar(): void {
    this.pedidoService.save(this.pedido).subscribe(res => {
      this.pedido = res;
      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso'
      });
      this.router.navigateByUrl('pedido');
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: error.error.message
      });
    });
  }
}
