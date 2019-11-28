import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormComponent} from '../../component/form.component';
import {PedidoItem} from '../../model/pedidoItem';
import {Produto} from '../../model/Produto';
import {ProdutoService} from '../../service/produto.service';

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.scss']
})
export class PedidoItemComponent extends FormComponent<PedidoItem> implements OnInit {

  produtoList: Produto[];
  @Input() displayItem = false; // Input, para dar acesso a outro component
  @Output() onClose = new EventEmitter<void>();
  @Output() onSalvar = new EventEmitter<PedidoItem>();

  constructor(private produtoService: ProdutoService) {
    super();
    this.produtoService.findAll().subscribe(produtos => this.produtoList = produtos);
  }

  ngOnInit() {
    this.resetaForm();
  }

  resetaForm(): void {
    this.objeto = new PedidoItem();
  }

  addLista(): void {
    this.onSalvar.emit(this.objeto);
    this.onClose.emit();
    this.resetaForm();
  }

  filtroProdutoSimples(event) {
    this.produtoService.complete(event.query).subscribe(data => this.produtoList = data);
  }

  produtoSelecionado(produto: Produto) {
    this.objeto.valorUnitario = produto.valorUnitario;
  }
}
