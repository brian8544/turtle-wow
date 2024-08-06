import {AfterViewInit, Directive, ElementRef, HostListener, OnDestroy} from '@angular/core';

@Directive({
    selector: '[formValid]'
})
export class FormValidDirective implements AfterViewInit, OnDestroy {
    private static readonly UPDATE_INTERVAL: number = 500;
    private continueInterval: boolean = true;

    constructor(private form: ElementRef) {
        setTimeout(() => this.onUpdate(), FormValidDirective.UPDATE_INTERVAL);
    }

    ngOnDestroy(): void {
        this.continueInterval = false;
    }

    ngAfterViewInit(): void {
        this.updateValidity();
    }

    @HostListener('input')
    onInput(): void {
        this.updateValidity();
    }

    private onUpdate(): void {
        this.updateValidity();
        if (this.continueInterval)
            setTimeout(() => this.onUpdate(), FormValidDirective.UPDATE_INTERVAL);
    }

    private updateValidity(): void {
        const isValid = this.form.nativeElement.checkValidity();
        this.setValidAttribute(isValid);
    }

    private setValidAttribute(isValid: boolean): void {
        const children = this.form.nativeElement.children;
        for (let i = 0; i < children.length; ++i) {
            const innerChildren = children[i].children;
            for (let j = 0; j < innerChildren.length; ++j) {
                if (innerChildren[j].tagName === "BUTTON" && innerChildren[j].type === "submit")
                    innerChildren[j].dataset.formValid = isValid;
            }
        }
    }
}
