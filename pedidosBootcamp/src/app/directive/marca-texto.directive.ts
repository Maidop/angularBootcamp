import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appMarcaTexto]'
})
export class MarcaTextoDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.marcaTexto('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.marcaTexto(null);
  }

  private marcaTexto(color: string) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

}
