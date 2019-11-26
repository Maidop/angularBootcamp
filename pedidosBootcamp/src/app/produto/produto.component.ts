import { Component, OnInit } from '@angular/core';
import {ListComponent} from '../component/list.component';
import {Cliente} from '../model/cliente';
import {Produto} from '../model/Produto';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ProdutoService} from '../service/produto.service';
import {error} from "util";

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent extends ListComponent<Produto> implements OnInit {

  constructor(private produtoService: ProdutoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    super();
    this.cols = [
      { field: 'id', header: 'ID' },
      {field: 'descricao', header: 'Descrição' },
      { field: 'valorUnitario', header: 'Valor Unitário' }
    ];
  }

  ngOnInit() {
  }

  carregarLista(): void {
    this.loading = true;
    this.produtoService.findAll().subscribe(produtos => {
      this.lista = produtos;
      this.loading = false;
    });
  }

  private deletar(id: number): void {
    this.produtoService.delete(id).subscribe( res => {
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
