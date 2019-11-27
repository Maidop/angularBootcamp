import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../model/pedido';
import {PedidoService} from '../../service/pedido.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService, SelectItem} from 'primeng/api';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';
import {ProdutoService} from '../../service/produto.service';
import {Produto} from '../../model/Produto';
import {PedidoItem} from '../../model/pedidoItem';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit {

  pedido: Pedido;
  clienteList: Cliente[];
  produtoList: Produto[];
  produto: Produto;
  display = false;
  pedidoItem: PedidoItem;
  pedidoItemList: PedidoItem[];
  clienteDropdown: SelectItem[];
  selectedCliente: Cliente;

  constructor(private pedidoService: PedidoService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private router: Router,
              private clienteService: ClienteService,
              private produtoService: ProdutoService) {
    this.clienteService.findAll().subscribe(lista => {
      this.clienteList = lista;

      this.clienteDropdown = this.clienteList.map(val => {
        const selectItem: SelectItem = {
          label: val.nome,
          value: val.id
        };
        return selectItem;
      })
    });
    produtoService.findAll().subscribe(res => this.produtoList = res);
    this.pedidoItem = new PedidoItem();
    this.pedidoItemList = [];
  }

  salvar(): void {
    this.pedido.cliente = this.selectedCliente;
    this.pedidoService.save(this.pedido).subscribe(res => {
      this.pedido = res;
      this.messageService.add({
        severity: 'success',
        summary: 'Pedido realizado com sucesso'
      });

      this.router.navigateByUrl('pedido');
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: error.error.message
      })
    });
    this.router.navigateByUrl('/pedido');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.pedidoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.pedido = res;
        });
      } else {
        this.newPedido();
      }
    });
  }

  private newPedido() {
    this.pedido = new Pedido();
    this.pedido.pedidoItemList = [];
  }

  showDialog() {
    this.display = true;
  }

  setPedidoItem() {
    this.pedidoItemList.push(this.pedidoItem);
    this.pedido.pedidoItemList = this.pedidoItemList;
    this.display = false;
  }
}
