import {Component, Input} from "@angular/core";
import {ProfessionDto} from "../../../../domain_value/profession_dto";

@Component({
    selector: "Profession",
    templateUrl: "./profession.html",
    styleUrls: ["./profession.scss"]
})
export class ProfessionComponent {

    @Input() profession: ProfessionDto;

}
