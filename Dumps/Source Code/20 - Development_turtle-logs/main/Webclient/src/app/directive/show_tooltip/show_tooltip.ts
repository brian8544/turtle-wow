import {Directive, HostListener, Input, OnDestroy} from '@angular/core';
import {TooltipControllerService} from "../../service/tooltip_controller";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Directive({
    selector: '[showTooltip]'
})
export class ShowTooltipDirective implements OnDestroy {

    private subscription: Subscription;
    private clicked: boolean = false;
    private visibility$: Subject<[boolean, any]> = new Subject();
    private stay_visible: boolean = false;
    private timeout;

    @Input('showTooltip') tooltipArgs: any;

    constructor(
        private tooltipControllerService: TooltipControllerService,
        private routerService: Router
    ) {
        this.subscription = this.routerService.events.subscribe(() => {
            this.clicked = false;
            this.tooltipControllerService.hideTooltip();
        });
        this.subscription.add(this.visibility$.pipe(debounceTime(50)).subscribe(([show_tooltip, args]) => {
            this.stay_visible = false;
            if (show_tooltip) this.tooltipControllerService.showTooltip(this.tooltipArgs, false, args[0], args[1]);
            else this.tooltipControllerService.hideTooltip();
        }));
    }

    ngOnDestroy(): void {
        this.tooltipControllerService.hideTooltip();
        this.subscription?.unsubscribe();
    }

    @HostListener('click', ["$event"])
    onClick(event: any): void {
        if (!!this.tooltipArgs.stay_static) {
            this.stay_visible = true;
            this.timeout = setTimeout(() => this.visibility$.next([false, undefined]), 5000);
        }

        if (!this.isMobile()) {
            if (this.tooltipArgs.type === 16) {
                this.visibility$.next([true, [event.clientX, event.clientY]]);
            }
            return;
        }

        if (!this.clicked) this.tooltipControllerService.showTooltip(this.tooltipArgs, true, event.clientX, event.clientY);
        else this.tooltipControllerService.hideTooltip();
        this.clicked = !this.clicked;
    }

    @HostListener('mouseenter', ["$event"])
    onEnter(event: any): void {
        if (!!this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
        this.visibility$.next([true, [event.clientX, event.clientY]]);
    }

    @HostListener('mouseleave')
    onLeave(): void {
        if (this.stay_visible)
            return;
        this.visibility$.next([false, undefined]);
    }

    @HostListener('mousemove', ["$event"])
    onMove(event: any): void {
        if (this.stay_visible)
            return;
        this.tooltipControllerService.positionTooltip(this.isMobile(), event.clientX, event.clientY + document.getElementsByTagName("body")[0].scrollTop);
    }

    private isMobile(): boolean {
        return navigator.userAgent.toLowerCase().includes("mobile");
    }
}
