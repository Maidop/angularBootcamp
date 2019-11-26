import { Component, OnInit } from '@angular/core';
import {PedidoItemService} from '../service/pedido-item.service';
import {PedidoService} from '../service/pedido.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ListComponent} from '../component/list.component';
import {PedidoItem} from '../model/pedidoItem';
import {error} from "util";

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.scss']
})
export class PedidoItemComponent extends ListComponent<PedidoItem> implements OnInit {

  constructor(private pedidoItemService: PedidoItemService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    super();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'cliente', header: 'Cliente' },
      { field: 'dataEmissao', header: 'Data de Emissão' },
      { field: 'total', header: 'Total' }
    ];
  }

  ngOnInit() {
  }

  carregarLista(): void {
    this.loading = true;
    this.pedidoItemService.findAll().subscribe(pedidoItem => {
      this.lista = pedidoItem;
      this.loading = false;
    });
  }

  private deletar(id: number): void {
    this.pedidoItemService.delete(id).subscribe( res => {
      this.messageService.add({
        severity: 'success',
        summary: 'Pedido removido com sucesso'
      });
      this.carregarLista();
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: error.error.message
      });
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover o item?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deletar(id),
      reject: () => this.messageService.add({severity: 'info', detail: 'Item não excluído'}),
      acceptLabel: 'Sim',
      rejectLabel: 'Nao'
    });
  }

}
