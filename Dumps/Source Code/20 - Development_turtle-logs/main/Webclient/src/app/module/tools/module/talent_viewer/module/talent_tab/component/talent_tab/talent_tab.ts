import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {Talent} from "../../value_object/talent";

@Component({
    selector: "TalentTab",
    templateUrl: "./talent_tab.html",
    styleUrls: ["./talent_tab.scss"]
})
export class TalentTabComponent implements OnInit, OnChanges {

    @Input() tab_label: string;
    @Input() i_talent_tree: Array<Array<Talent>>;
    @Input() expansion_id: number;
    @Output() talent_tree_changed: EventEmitter<Array<Array<Talent>>> = new EventEmitter();

    points_spend: number = 0;
    talent_tree: Array<Array<Talent>> = [];

    constructor() {
    }

    ngOnInit(): void {
        this.talent_tree = this.i_talent_tree;
        this.talentChanged(this.talent_tree[0][0]);
    }

    ngOnChanges(): void {
        this.talent_tree = this.i_talent_tree;
        this.talentChanged(this.talent_tree[0][0]);
    }

    talentChanged(talent: Talent): void {
        this.talent_tree[talent.row_index][talent.column_index] = talent;
        // No idea why a functional approach is not working o.o
        let result = 0;
        for (const row of this.talent_tree) {
            for (const talent of row) {
                result += talent.is_filler ? 0 : talent.points_spend;
            }
        }
        if (result !== this.points_spend) {
            this.points_spend = result;
            this.talent_tree_changed.next(this.talent_tree);
        }
    }

    hasDependencyLeftOfIt(talent: Talent): boolean {
        for (let i = talent.column_index; i < 4; ++i) {
            const c_talent = this.talent_tree[talent.row_index][i];
            if (!c_talent.is_filler && !!c_talent.parent && c_talent.parent.column_index < talent.column_index
                && (c_talent.parent.row_index === talent.row_index || c_talent.parent.row_index === talent.row_index - 1)) {
                return true;
            }
        }
        return false;
    }

    hasArrowPointerLeftToRight(talent: Talent): boolean {
        return !!talent.parent && talent.parent.row_index === talent.row_index && talent.parent.column_index < talent.column_index;
    }

    hasDependencyTopOfIt(talent: Talent): boolean {
        for (let i = talent.row_index; i < this.talent_tree.length; ++i) {
            const c_talent = this.talent_tree[i][talent.column_index];
            if (!c_talent.is_filler && !!c_talent.parent && c_talent.parent.row_index < talent.row_index
                && (c_talent.parent.column_index === talent.column_index || c_talent.parent.column_index === talent.column_index - 1 || c_talent.parent.column_index === talent.column_index - 2)) {
                return true;
            }
        }
        return false;
    }

    hasArrowPointerTopToBottom(talent: Talent): boolean {
        return !!talent.parent && talent.parent.row_index < talent.row_index
            && (talent.parent.column_index === talent.column_index || talent.parent.column_index === talent.column_index - 1);
    }

    findDependency(talent: Talent): Talent {
        if (!talent)
            return undefined;

        if (!!talent.parent) {
            return this.talent_tree[talent.parent.row_index][talent.parent.column_index];
        }

        if (this.hasDependencyLeftOfIt(talent) && talent.column_index < 3) {
            return this.findDependency(this.talent_tree[talent.row_index][talent.column_index + 1]);
        }

        if (this.hasDependencyTopOfIt(talent) && talent.row_index < this.talent_tree.length - 1) {
            return this.findDependency(this.talent_tree[talent.row_index + 1][talent.column_index]);
        }

        if (this.is_diagonal_arrow_filler(talent)) {
            if (!!this.talent_tree[talent.row_index + 1] && !!this.talent_tree[talent.row_index + 1][talent.column_index]?.parent)
                return this.talent_tree[this.talent_tree[talent.row_index + 1][talent.column_index].parent.row_index][this.talent_tree[talent.row_index + 1][talent.column_index].parent.column_index];
            if (!!this.talent_tree[talent.row_index + 2] && !!this.talent_tree[talent.row_index + 2][talent.column_index]?.parent)
                return this.talent_tree[this.talent_tree[talent.row_index + 2][talent.column_index].parent.row_index][this.talent_tree[talent.row_index + 2][talent.column_index].parent.column_index];
        }

        return undefined;
    }

    canSpendPoints(talent: Talent): boolean {
        return this.points_spend >= talent.row_index * 5 && !this.isGrayedOut(talent);
    }

    canRetrievePoints(talent: Talent): boolean {
        let max_row_with_points = 0;
        for (let i = 0; i < this.talent_tree.length; ++i) {
            for (let j = 0; j < 4; ++j) {
                const c_talent = this.talent_tree[i][j];
                if (!!c_talent && !c_talent.is_filler && c_talent.points_spend > 0) {
                    max_row_with_points = i;
                }
            }
        }

        let points_spend_this_row_and_below = 0;
        let dependent_ability_has_points = false;
        for (let i = 0; i <= talent.row_index; ++i) {
            for (let j = 0; j < 4; ++j) {
                const c_talent = this.talent_tree[i][j];
                if (!c_talent.is_filler && c_talent.points_spend > 0) {
                    points_spend_this_row_and_below += c_talent.points_spend;

                    if (!!c_talent.parent && c_talent.parent.row_index === talent.row_index
                        && c_talent.parent.column_index === talent.column_index) {
                        dependent_ability_has_points = true;
                    }
                }
            }
        }


        return (max_row_with_points === talent.row_index
            || max_row_with_points === talent.row_index - 1 || points_spend_this_row_and_below > (talent.row_index + 1) * 5)
            && !dependent_ability_has_points;
    }

    isGrayedOut(talent: Talent): boolean {
        const dependency = this.findDependency(talent);
        return this.points_spend < talent.row_index * 5 || (!!dependency
            && (dependency.row_index !== talent.row_index || dependency.column_index !== talent.column_index)
            && dependency.points_spend < dependency.max_points);
    }

    is_dependency(talent: Talent, vertical: boolean): boolean {
        for (let i = 0; i < this.talent_tree.length; ++i) {
            for (let j = 0; j < 4; ++j) {
                if (!!this.talent_tree[i][j].parent && this.talent_tree[i][j].parent.row_index === talent.row_index
                    && this.talent_tree[i][j].parent.column_index === talent.column_index
                    && ((vertical && this.talent_tree[i][j].row_index > talent.row_index)
                        || (!vertical && this.talent_tree[i][j].column_index > talent.column_index))) {
                    return true;
                }
            }
        }
        return false;
    }

    find_child(talent: Talent, vertical: boolean): Talent {
        for (let i = talent.row_index; i < this.talent_tree.length; ++i) {
            for (let j = talent.column_index; j < 4; ++j) {
                if (!!this.talent_tree[i][j].parent && this.talent_tree[i][j].parent.row_index === talent.row_index
                    && this.talent_tree[i][j].parent.column_index === talent.column_index
                    && ((vertical && this.talent_tree[i][j].row_index > talent.row_index)
                        || (!vertical && this.talent_tree[i][j].column_index > talent.column_index))) {
                    return this.talent_tree[i][j];
                }
            }
        }
        return undefined;
    }

    is_arrow_golden(talent: Talent, vertical: boolean): boolean {
        if (!talent)
            return false;

        if (this.is_dependency(talent, vertical)) {
            let child = this.find_child(talent, vertical);
            return !this.isGrayedOut(child);
        }

        let dependency = this.findDependency(talent);
        if (!dependency) {
            // Special case
            if (vertical && talent.row_index < this.talent_tree.length - 1
                && !!this.talent_tree[talent.row_index + 1][talent.column_index].parent
                && this.talent_tree[talent.row_index + 1][talent.column_index].parent.row_index === talent.row_index
                && this.talent_tree[talent.row_index + 1][talent.column_index].parent.column_index === talent.column_index - 1) {
                return !this.isGrayedOut(this.talent_tree[talent.row_index + 1][talent.column_index]);
            }

            return false;
        }

        if (dependency.row_index <= talent.row_index && vertical) {
            for (let i = talent.row_index; i < this.talent_tree.length; ++i) {
                const c_talent = this.talent_tree[i][talent.column_index];
                if (!c_talent.is_filler && !!c_talent.parent && c_talent.parent.row_index === dependency.row_index && c_talent.parent.column_index === dependency.column_index) {
                    return !this.isGrayedOut(c_talent);
                }
            }
        }

        if (dependency.column_index <= talent.column_index && !vertical) {
            for (let i = talent.column_index; i < 4; ++i) {
                const c_talent = this.talent_tree[talent.row_index][i];
                if (!c_talent.is_filler && !!c_talent.parent && c_talent.parent.row_index === dependency.row_index && c_talent.parent.column_index === dependency.column_index) {
                    return !this.isGrayedOut(c_talent);
                }
            }
        }

        return false;
    }

    resetTalents(): void {
        for (let i = 0; i < this.talent_tree.length; ++i)
            for (let j = 0; j < 4; ++j)
                if (!this.talent_tree[i][j].is_filler)
                    this.talent_tree[i][j].points_spend = 0;
        this.points_spend = 0;
        this.talent_tree_changed.next(this.talent_tree);
    }

    isVerticalArrowFiller(talent: Talent): boolean {
        const current_dependency = this.findDependency(talent);
        const lookahead_dependency = this.findDependency(this.talent_tree[talent.row_index + 1][talent.column_index]);
        return (!!current_dependency && !lookahead_dependency) || (!this.hasDependencyTopOfIt(talent) &&
            ((!!lookahead_dependency && !(lookahead_dependency.row_index === talent.row_index && lookahead_dependency.column_index === talent.column_index - 1)
                && (lookahead_dependency.row_index !== talent.row_index || lookahead_dependency.column_index !== talent.column_index))
                || (!!lookahead_dependency && !!current_dependency && (lookahead_dependency.row_index !== current_dependency.row_index
                    || lookahead_dependency.column_index !== current_dependency.column_index))
                || (!lookahead_dependency && !current_dependency)));
    }

    isHorizontalFiller(talent: Talent): boolean {
        const c_talent = this.talent_tree[talent.row_index][talent.column_index + 1];
        const has_diagonal_dependency = !talent.is_filler && talent.column_index < 3 && talent.row_index < this.talent_tree.length - 1
            && ((!!this.talent_tree[talent.row_index + 1][talent.column_index + 1].parent
                && this.talent_tree[talent.row_index + 1][talent.column_index + 1].parent.row_index === talent.row_index
                && this.talent_tree[talent.row_index + 1][talent.column_index + 1].parent.column_index === talent.column_index) ||
                (!!this.talent_tree[talent.row_index + 2] && !!this.talent_tree[talent.row_index + 2][talent.column_index + 1]?.parent
                    && this.talent_tree[talent.row_index + 2][talent.column_index + 1].parent.row_index === talent.row_index
                    && this.talent_tree[talent.row_index + 2][talent.column_index + 1].parent.column_index === talent.column_index));
        return !has_diagonal_dependency && (!this.hasDependencyLeftOfIt(c_talent) || this.hasDependencyTopOfIt(c_talent));
    }

    is_diagonal_arrow_filler(talent: Talent): boolean {
        return talent.is_filler && talent.row_index < this.talent_tree.length - 1
            && ((!!this.talent_tree[talent.row_index + 1][talent.column_index].parent
                && this.talent_tree[talent.row_index + 1][talent.column_index].parent.row_index === talent.row_index
                && this.talent_tree[talent.row_index + 1][talent.column_index].parent.column_index === talent.column_index - 1) ||
                (!!this.talent_tree[talent.row_index + 2] && !!this.talent_tree[talent.row_index + 2][talent.column_index]?.parent
                    && this.talent_tree[talent.row_index + 2][talent.column_index].parent.row_index === talent.row_index
                    && this.talent_tree[talent.row_index + 2][talent.column_index].parent.column_index === talent.column_index - 1));
    }

    is_diagonal_arrow_golden(talent: Talent): boolean {
        return this.is_diagonal_arrow_filler(talent) && !this.isGrayedOut(this.talent_tree[talent.row_index + 1][talent.column_index])
            && (!this.talent_tree[talent.row_index + 2] || !this.isGrayedOut(this.talent_tree[talent.row_index + 2][talent.column_index]));
    }
}
