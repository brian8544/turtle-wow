import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private element_ref: ElementRef) {
    }

    @Output()
    public clickOutside: any = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any): void {
        const clickedInside = this.element_ref.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
}
