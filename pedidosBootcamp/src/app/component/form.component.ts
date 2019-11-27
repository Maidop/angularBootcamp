export abstract class FormComponent<T> {
  objeto: T;

  abstract resetaForm(): void;

  preSave(): void {

  }

  salvar(): void {
    this.preSave();
  }
}
