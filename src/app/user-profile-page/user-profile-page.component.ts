import { Component } from "@angular/core";

@Component({
	selector: "user-profile-page",
	templateUrl: "./user-profile-page.component.html",
	styleUrls: ["./user-profile-page.component.css"]
})
export class UserProfilePageComponent {
	activeStatusCount = {
		reading: 12,
		completed: 15,
		paused: 3,
		dropped: 7,
		planning: 100
	};
	ownershipCount = {
		owned: 45,
		previous_own: 20,
		loaned: 10,
		wanted: 100
	};
	bookTypeCount = {
		paperback: 67,
		ebook: 125,
		hardcover: 10,
		audiobook: 4
	};
	activeTotal = 0;
	ownershipTotal = 0;
	bookTypeTotal = 0;
	finishedInit = false;

	constructor() {
		this.activeTotal = this.calculateTotal(this.activeStatusCount);
		this.ownershipTotal = this.calculateTotal(this.ownershipCount);
		this.bookTypeTotal = this.calculateTotal(this.bookTypeCount);

		this.refreshComponent();
	}

	ngOnInit() {
		this.refreshComponent();
	}

	refreshComponent() {
		this.finishedInit = !this.finishedInit;
	}

	calculateTotal(object: { [key: string]: number }) {
		return Object.values(object).reduce((a, b) => a + b, 0);
	}

	calculatePercentage(item: number, total: number) {
		return (item / total * 100).toFixed(2);
	}
}
