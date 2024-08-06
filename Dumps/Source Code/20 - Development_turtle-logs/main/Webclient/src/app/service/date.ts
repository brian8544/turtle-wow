import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";

@Injectable({
    providedIn: "root",
})
export class DateService {

    constructor(private datePipe: DatePipe) {}

    toRPLLLongEUDate(timestamp_in_ms: any): string {
        return this.datePipe.transform(new Date(Number(timestamp_in_ms)), 'dd.MM.yy hh:mm:ss', "+0000");
    }

    toRPLLLongDate(timestamp_in_ms: any): string {
        return this.datePipe.transform(new Date(Number(timestamp_in_ms)), 'dd.MM.yy hh:mm a', "+0000");
    }

    toRPLLShortDate(timestamp_in_ms: any): string {
        return this.datePipe.transform(new Date(Number(timestamp_in_ms)), 'dd.MM.yy', "+0000");
    }

    toRPLLTime(timestamp_in_ms: any): string {
        return this.datePipe.transform(new Date(Number(timestamp_in_ms)), 'HH:mm:ss', "+0000");
    }

    toRPLLTimePrecise(timestamp_in_ms: any): string {
        return this.datePipe.transform(new Date(Number(timestamp_in_ms)), 'HH:mm:ss:SSS', "+0000");
    }

    toRPLLTimePreciseLong(timestamp_in_ms: any): string {
        return this.datePipe.transform(new Date(Number(timestamp_in_ms)), 'dd.MM HH:mm:ss:SSS', "+0000");
    }

    toRPLLDateInputDate(timestamp_in_ms: any): string {
        return this.datePipe.transform(new Date(Number(timestamp_in_ms)), 'yyyy-MM-dd', "+0000");
    }

    toTimeSpan(timespan_in_ms: any): string {
        timespan_in_ms = Number(timespan_in_ms);
        const hours: number = Math.floor(timespan_in_ms / 3600000);
        timespan_in_ms -= hours * 3600000;
        const minutes: number = Math.floor(timespan_in_ms / 60000);
        timespan_in_ms -= minutes * 60000;
        const seconds: number = Math.floor(timespan_in_ms / 1000);
        let result: string = "";
        result += hours < 10 ? "0" + hours.toString() : hours.toString();
        result += ":";
        result += minutes < 10 ? "0" + minutes.toString() : minutes.toString();
        result += ":";
        result += seconds < 10 ? "0" + seconds.toString() : seconds.toString();
        return result;
    }

    toShortTimeSpan(timespan_in_ms: any): string {
        timespan_in_ms = Number(timespan_in_ms);
        const hours: number = Math.floor(timespan_in_ms / 3600000);
        timespan_in_ms -= hours * 3600000;
        const minutes: number = Math.floor(timespan_in_ms / 60000);
        timespan_in_ms -= minutes * 60000;
        const seconds: number = Math.floor(timespan_in_ms / 1000);
        let result: string = "";
        result += minutes < 10 ? "0" + minutes.toString() : minutes.toString();
        result += ":";
        result += seconds < 10 ? "0" + seconds.toString() : seconds.toString();
        return result;
    }

}
