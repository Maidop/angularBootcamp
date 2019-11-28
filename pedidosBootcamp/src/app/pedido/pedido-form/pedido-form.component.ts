import {Component, OnInit} from '@angular/core';
import {Pedido} from '../../model/pedido';
import {PedidoService} from '../../service/pedido.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';
import {Produto} from '../../model/Produto';
import {PedidoItem} from '../../model/pedidoItem';
import {FormComponent} from '../../component/form.component';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent extends FormComponent<Pedido> implements OnInit {
  clienteList: Cliente[];
  produto: Produto;
  displayItem = false;
  pedidoItem: PedidoItem;
  rowIndex: number;
  menuItens: MenuItem[];

  constructor(private pedidoService: PedidoService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private router: Router,
              private clienteService: ClienteService) {
    super();
    this.clienteService.findAll().subscribe(clientes => this.clienteList = clientes);
    this.menuItens = [
      {
        label: 'Limpar',
        icon: 'pi pi-trash',
        command: () => this.limparItens(),
      }
    ];
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
    this.calculaTotais();
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

  editar(rowIndex: number): void {
    this.rowIndex = rowIndex;
    this.pedidoItem = JSON.parse(JSON.stringify(this.objeto.pedidoItemList[rowIndex]));
    this.displayItem = true;
  }

  openModalItem(): void {
    this.displayItem = true;
    this.pedidoItem = new PedidoItem();
    this.rowIndex = -1;
  }

  salvarItem(pedidoItem: PedidoItem) {
    if (this.rowIndex >= 0) {
      this.objeto.pedidoItemList[this.rowIndex] = JSON.parse(JSON.stringify(pedidoItem));
    } else {
      this.objeto.pedidoItemList.push(pedidoItem);
    }
  }

  excluir(index: number): void {
    this.objeto.pedidoItemList.splice(index, 1);
  }

  private limparItens() {
    return this.objeto.pedidoItemList = [];
  }

  calculaTotais(): void {
    for (const item of this.objeto.pedidoItemList) {
      this.pedidoItem.totalQuantidade += item.quantidade;
      this.pedidoItem.totalDesconto += item.desconto;
      this.pedidoItem.totalValor += item.valorUnitario;
    }
  }
}
