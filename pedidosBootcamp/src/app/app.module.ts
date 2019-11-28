import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {ClienteComponent} from './cliente/cliente.component';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ClienteFormComponent} from './cliente/cliente-form/cliente-form.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {
  AutoCompleteModule,
  CalendarModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  SidebarModule,
  SplitButtonModule
} from 'primeng/primeng';
import {SidebarService} from './service/sidebar.service';
import {ProdutoComponent} from './produto/produto.component';
import {ProdutoFormComponent} from './produto/produto-form/produto-form.component';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {PedidoModule} from './pedido/pedido.module';
import { MarcaTextoDirective } from './directive/marca-texto.directive';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    ClienteFormComponent,
    ProdutoComponent,
    ProdutoFormComponent,
    MarcaTextoDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    CardModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule,
    ConfirmDialogModule,
    SidebarModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    DialogModule,
    AutoCompleteModule,
    SplitButtonModule,
    PedidoModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    SidebarService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
