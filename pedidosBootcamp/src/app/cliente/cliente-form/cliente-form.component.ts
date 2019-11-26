import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../../service/cliente.service';
import {Cliente} from '../../model/cliente';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService, SelectItem} from 'primeng/api';
import {error} from 'util';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  objeto: Cliente;
  clientes: Cliente[];
  clientesDropdown: SelectItem[];

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.clienteService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });

    this.clientesDropdown = this.clientes.map(val => {
      const selectItem: SelectItem = {
        label: val.nome,
        value: val
      };
      return selectItem;
    });
  }

  private resetaForm() {
    this.objeto = new Cliente();
    this.objeto.nome = '';
    this.objeto.cpf = '';
    this.objeto.telefone = '';
  }

  salvar(): void {
    this.clienteService.save(this.objeto).subscribe(res => {
      this.objeto = res;
      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso'
      });
      this.router.navigateByUrl('cliente');
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: error.error.message
      });
    });
  }
}
