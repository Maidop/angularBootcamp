import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ProdutoService} from '../../service/produto.service';
import {Produto} from '../../model/Produto';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {
  objeto: Produto;

  constructor(private produtoService: ProdutoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.produtoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  private resetaForm() {
    this.objeto = new Produto();
    this.objeto.descricao = '';
    this.objeto.valorUnitario = null;
  }

  salvar(): void {
    this.produtoService.save(this.objeto).subscribe(res => {
      this.objeto = res;
      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso'
      });
      this.router.navigateByUrl('produto');
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: error.error.message
      });
    });
  }

}
