import { Component, Input } from "@angular/core";

@Component({
	selector: "statistic-display",
	templateUrl: "./statistic-display.component.html",
	styleUrls: ["./statistic-display.component.css"],
	host: {
		"[style.width]": "'75%'"
	}
})
export class StatisticDisplayComponent {
	@Input() displayTitle: string;
	@Input() displayObj: { [key: string]: number };
	total = 0;

	ngOnChanges() {
		this.total = this.calculateTotal(this.displayObj);

		if (this.displayObj["reading"]) {
			this.displayObj["reading"] = 1;
		}
	}

	calculateTotal(object: { [key: string]: number }) {
		return Object.values(object).reduce((a, b) => a + b, 0);
	}

	calculatePercentage(item: number, total: number) {
		if (total === 0) {
			return 0;
		}
		return (item / total * 100).toFixed(2);
	}

	formatKey(key: string) {
		if (key === "previous_own") {
			return "Previously Owned";
		}
		return key;
	}

	onCompare() {
		return 1;
	}
}
