import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../service/cliente.service';
import {Cliente} from '../model/cliente';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private json: any;


  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    // this.clienteService.findAll().subscribe(clientes => this.json = clientes);
    // this.clienteService.findOne(2).subscribe(clientes => this.json = clientes);
  }

}
