import {Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, ViewChild} from "@angular/core";

@Component({
    selector: "MultiThumbInput",
    templateUrl: "./multi_thumb_input.html",
    styleUrls: ["./multi_thumb_input.scss"]
})
export class MultiThumbInputComponent implements OnChanges {

    @ViewChild("progress_bar", {static: true}) progress_bar: ElementRef;
    @ViewChild("slider0", {static: true}) slider0: ElementRef;
    @ViewChild("slider1", {static: true}) slider1: ElementRef;

    @Input() label_left: string = "";
    @Input() label_right: string = "";
    @Input() reference_start: number = 0;
    @Input() reference_end: number = 1;
    @Input() reference_slider0: number = 0;
    @Input() reference_slider1: number = 1;
    @Input() reference_label_function: any = (_args, input) => input.toString();
    @Input() reference_label_args: any;

    @Output() slider0_output: EventEmitter<number> = new EventEmitter();
    @Output() slider1_output: EventEmitter<number> = new EventEmitter();

    private movingSliderIndex: number = -1;
    private lastPosition: MouseEvent;

    private currentSliderPosition: [number, number] = [0, 1];

    ngOnChanges(changes: any): void {
        let prev_ref_start: number = !!changes.reference_start?.previousValue ? changes.reference_start.previousValue : this.reference_start;
        let prev_ref_end: number = !!changes.reference_end?.previousValue ? changes.reference_end.previousValue : this.reference_end;
        let ref_slider0_pos: number = !!changes.reference_slider0 ? (changes.reference_slider0.currentValue - this.reference_start) : this.currentSliderPosition[0] * (prev_ref_end - prev_ref_start);
        let ref_slider1_pos: number = !!changes.reference_slider1 ? (changes.reference_slider1.currentValue - this.reference_start) : this.currentSliderPosition[1] * (prev_ref_end - prev_ref_start);
        this.currentSliderPosition[0] = ref_slider0_pos / (this.reference_end - this.reference_start);
        this.currentSliderPosition[1] = ref_slider1_pos / (this.reference_end - this.reference_start);
        this.slider0.nativeElement.style.left = "calc(calc(100% - 16px) * " + this.currentSliderPosition[0] + ")";
        this.slider1.nativeElement.style.left = "calc(calc(100% - 16px) * " + this.currentSliderPosition[1] + ")";
    }

    onMouseDown(slider_index: number): void {
        this.movingSliderIndex = slider_index;
    }

    @HostListener("document:mousemove", ["$event"])
    onMouseMove(event: MouseEvent): void {
        if (this.movingSliderIndex === -1 || !this.lastPosition) {
            this.lastPosition = event;
            return
        }

        let difference: number = this.lastPosition.clientX - event.clientX;
        let slided_percent: number = Math.abs(difference) / this.progress_bar_length;
        let new_slider_percent: number;
        if (difference >= 0) {
            let temp_slided_percent: number = this.currentSliderPosition[this.movingSliderIndex] - slided_percent;
            if (this.currentSliderPosition[1 - this.movingSliderIndex] <= this.currentSliderPosition[this.movingSliderIndex]) {
                new_slider_percent = Math.max(0.02, Math.max(this.currentSliderPosition[1 - this.movingSliderIndex] + 0.02, temp_slided_percent))
            } else {
                new_slider_percent = Math.max(0, temp_slided_percent)
            }
        } else {
            let temp_slided_percent: number = this.currentSliderPosition[this.movingSliderIndex] + slided_percent;
            if (this.currentSliderPosition[1 - this.movingSliderIndex] >= this.currentSliderPosition[this.movingSliderIndex]) {
                new_slider_percent = Math.min(0.98, Math.min(this.currentSliderPosition[1 - this.movingSliderIndex] - 0.02, temp_slided_percent))
            } else {
                new_slider_percent = Math.min(1, temp_slided_percent)
            }
        }

        this.current_slider.nativeElement.style.left = "calc(calc(100% - 16px) * " + new_slider_percent + ")";
        this.currentSliderPosition[this.movingSliderIndex] = new_slider_percent;
        this.lastPosition = event;
    }

    @HostListener("document:mouseup")
    onMouseUp(): void {
        if (this.movingSliderIndex === -1)
            return;
        let slider_output = this.movingSliderIndex === 0 ? this.slider0_output : this.slider1_output;
        slider_output.next(this.currentSliderPosition[this.movingSliderIndex] * (this.reference_end - this.reference_start) + this.reference_start)
        this.movingSliderIndex = -1;
    }

    get current_slider(): ElementRef {
        if (this.movingSliderIndex === 0)
            return this.slider0;
        if (this.movingSliderIndex === 1)
            return this.slider1;
        return undefined;
    }

    get progress_bar_length(): number {
        return this.progress_bar.nativeElement.clientWidth;
    }

    get label_slider_left(): string {
        return this.reference_label_function(this.reference_label_args, this.reference_start + (this.reference_end - this.reference_start) * this.currentSliderPosition[0]);
    }

    get label_slider_right(): string {
        return this.reference_label_function(this.reference_label_args, this.reference_start + (this.reference_end - this.reference_start) * this.currentSliderPosition[1]);
    }

    get is_moving(): boolean {
        return this.movingSliderIndex >= 0;
    }

}
