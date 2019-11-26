import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

export class SidebarService implements OnDestroy {
  private topicoMostrarSidebar = new BehaviorSubject<boolean>(false);

  constructor() { }

  getMostrar$(): Observable<boolean> {
    return this.topicoMostrarSidebar.asObservable();
  }

  setMostrar(mostrar: boolean): void {
    this.topicoMostrarSidebar.next(mostrar);
  }

  ngOnDestroy(): void {
    this.topicoMostrarSidebar.unsubscribe();
  }
}
