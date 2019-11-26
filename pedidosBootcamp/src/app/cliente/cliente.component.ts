import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../service/cliente.service';
import {Cliente} from '../model/cliente';
import {delay, timeout} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {error} from "util";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  clienteList: Cliente[];
  cols: any;
  loading = false;

  constructor(private clienteService: ClienteService,
              private messageService: MessageService) {
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
      this.clienteList = clientes;
      this.loading = false;
    });
  }

  deletar(id: number): void {
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
}
