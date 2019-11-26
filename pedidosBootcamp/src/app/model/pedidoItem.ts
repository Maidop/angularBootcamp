import {Pedido} from './pedido';
import {Produto} from './Produto';

export class PedidoItem {
  id: number;
  pedido: Pedido;
  produto: Produto;
  valorUnitario: number;
  quantidade: number;
  desconto: number;
}
