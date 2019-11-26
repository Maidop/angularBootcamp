import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SidebarService} from './service/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pedidosBootcamp';
  displaySidebar = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.getMostrar$().subscribe(val => this.displaySidebar = val);
  }

  ngOnInit(): void {
    this.sidebarService.setMostrar(false);
  }

  abrirFecharMenu() {
    this.sidebarService.setMostrar(!this.displaySidebar);
  }
}
