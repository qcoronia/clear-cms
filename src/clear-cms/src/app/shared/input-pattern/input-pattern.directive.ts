import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputPattern]'
})
export class InputPatternDirective {

  @Input() appInputPattern: string;

  constructor() { }

  @HostListener('keydown')
  public keydownEvent(evt: KeyboardEvent): boolean {
    const input = (evt.currentTarget as HTMLInputElement).value;
    const regex = new RegExp(this.appInputPattern);
    if (!regex.test(input)) {
      evt.preventDefault();
      return false;
    } else {
      return true;
    }
  }

}
