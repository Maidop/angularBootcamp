import {Pedido} from './pedido';
import {Produto} from './Produto';

export class PedidoItem {
  id: number;
  produto: Produto;
  valorUnitario: number;
  quantidade: number;
  desconto: number;
  totalValor = 0;
  totalQuantidade = 0;
  totalDesconto = 0;
}
