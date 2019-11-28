import {Input} from '@angular/core';

export abstract class FormComponent<T> {
  @Input() objeto: T;

  abstract resetaForm(): void;

  preSave(): void {

  }

  salvar(): void {
    this.preSave();
  }
}
