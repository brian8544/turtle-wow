import {Component, Input} from "@angular/core";
import {ItemTooltip} from "../../domain_value/item_tooltip";

@Component({
    selector: "ItemTooltip",
    templateUrl: "./item_tooltip.html",
    styleUrls: ["./item_tooltip.scss"]
})
export class ItemTooltipComponent {

    @Input() payload: ItemTooltip;

    gemMatches(slot: number, gem: number): boolean {
        return slot === (gem & slot);
    }

    validSocketBonus(socket: any): boolean {
        return socket.slots.every((slot) => slot.item && this.gemMatches(slot.flag, slot.item.flag));
    }

    isEffectActive(items: any, threshold: number): boolean {
        return items.filter(item => item.active).length >= threshold;
    }

    getFilteredSetItems(): any {
        return this.payload.item_set.set_items
            .sort((left, right) => {
                if (left.active === right.active) return 0;
                if (left.active && !right.active) return -1;
                if (!left.active && right.active) return 1;
                if (left.inventory_type === right.inventory_type) {
                    if (left.item_level === right.inventory_type) {
                        return 0;
                    } else if (left.item_level < right.item_level) {
                        return 1;
                    }
                    return -1;
                } else if (left.inventory_type > right.inventory_type) {
                    return 1;
                }
                return -1;
            })
            .reduce((acc, item) => {
                if (item.active || !acc.find(inner_item => inner_item.inventory_type === item.inventory_type))
                    acc.push(item);
                return acc;
            }, [])
            .sort((left, right) => {
                if (left.inventory_type === right.inventory_type) return 0;
                if (left.inventory_type > right.inventory_type) return 1;
                return -1;
            });
    }

}
