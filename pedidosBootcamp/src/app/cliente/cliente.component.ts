import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../service/cliente.service';
import {Cliente} from '../model/cliente';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {error} from 'util';
import {ListComponent} from '../component/list.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent extends ListComponent<Cliente> implements OnInit {

  constructor(private clienteService: ClienteService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    super();
    this.cols = [
      { field: 'id', header: 'ID' },
      {field: 'nome', header: 'Nome' },
      { field: 'cpf', header: 'CPF' },
      { field: 'telefone', header: 'Telefone' }
    ];
  }

  ngOnInit() {
  }

  carregarLista(): void {
    this.loading = true;
    this.clienteService.findAll().subscribe(clientes => {
      this.lista = clientes;
      this.loading = false;
    });
  }

  private deletar(id: number): void {
    this.clienteService.delete(id).subscribe( res => {
      this.messageService.add({
        severity: 'success',
        summary: 'Removido com sucesso'
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
