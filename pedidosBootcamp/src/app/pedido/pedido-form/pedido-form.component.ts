import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../model/pedido';
import {PedidoService} from '../../service/pedido.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';
import {ProdutoService} from '../../service/produto.service';
import {Produto} from '../../model/Produto';
import {PedidoItem} from '../../model/pedidoItem';
import {FormComponent} from '../../component/form.component';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent extends FormComponent<Pedido> implements OnInit {

  objeto: Pedido;
  clienteList: Cliente[];
  pedidoItem = new PedidoItem();
  produtoList: Produto[];
  produto: Produto;
  pedidoItemList: PedidoItem[];
  displayItem = false;

  constructor(private pedidoService: PedidoService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private router: Router,
              private clienteService: ClienteService,
              private produtoService: ProdutoService) {
    super();
    this.clienteService.findAll().subscribe(clientes => this.clienteList = clientes);
    this.produtoService.findAll().subscribe(produtos => this.produtoList = produtos);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        // tslint:disable-next-line:radix
        this.pedidoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  resetaForm(): void {
    this.objeto = new Pedido();
    this.objeto.dataEmissao = new Date();
    this.objeto.pedidoItemList = [];
  }

  preSave(): void {
    const erros: string[] = [];
    if (!this.objeto.cliente) {
      erros.push('Selecione um cliente');
    }

    if (!(this.objeto.pedidoItemList.length > 0)) {
      erros.push('Adicione ao menos um item ao pedido.');
    }

    if (erros.length) {
      this.messageService.add({
        severity: 'error',
        summary: 'Atenção',
        detail: erros[0]
      });
      throw new Error(erros[0]);
    }
  }

  salvar(): void {
    super.salvar();
    this.pedidoService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('pedido');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  addLista() {
    this.objeto.pedidoItemList.push(this.pedidoItem);
    this.displayItem = false;
    this.pedidoItem = new PedidoItem();
  }
}
