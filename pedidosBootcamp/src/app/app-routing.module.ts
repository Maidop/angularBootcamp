import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ClienteComponent} from './cliente/cliente.component';
import {ClienteFormComponent} from './cliente/cliente-form/cliente-form.component';
import {ProdutoComponent} from './produto/produto.component';
import {ProdutoFormComponent} from './produto/produto-form/produto-form.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'cliente', component: ClienteComponent,
  },
  {
    path: 'cliente/form', component: ClienteFormComponent,
  },
  {
    path: 'produto', component: ProdutoComponent,
  },
  {
    path: 'produto/form', component: ProdutoFormComponent,
  },
  {
    path: 'pedido', loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
