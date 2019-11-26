import { Component, OnInit } from '@angular/core';
import {ListComponent} from '../component/list.component';
import {Cliente} from '../model/cliente';
import {Pedido} from '../model/pedido';
import {PedidoService} from '../service/pedido.service';
import {error} from 'util';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent extends ListComponent<Pedido> implements OnInit {

  constructor(private pedidoService: PedidoService,
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
    this.pedidoService.findAll().subscribe(pedidos => {
      this.lista = pedidos;
      this.loading = false;
    });
  }

  private deletar(id: number): void {
    this.pedidoService.delete(id).subscribe( res => {
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
