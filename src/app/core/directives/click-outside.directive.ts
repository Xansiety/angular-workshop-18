import { Directive, ElementRef, HostListener, inject, input, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  public clickOutSideEnabled = input(true);
  public avoidFirstTime = input(false);
  public clickOutSideDelay = input(0);

  private elementRef = inject(ElementRef);

  public clickOutside = output<MouseEvent>();

  public firstTime: boolean = true;

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {

    if (!this.clickOutSideEnabled()) return;

    const target = event.target as HTMLElement;
    const contains = this.elementRef.nativeElement.contains(target);

    if (target && !contains) {
      if (!this.avoidFirstTime() || (this.avoidFirstTime() && !this.firstTime)) {
        if (this.clickOutSideDelay()) {
          setTimeout(() => {
            this.clickOutside.emit(event);
          }, this.clickOutSideDelay());
        } else {
          this.clickOutside.emit(event);
        }
        return;
      }

      this.firstTime = false;
    }
  }
}
