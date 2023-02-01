import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class UtilitiesService {
	constructor(private router: Router) {}

	dateFormater(year: number, month: number) {
		let result = `${year}`;
		if (month < 10) {
			result += `0${month}`;
		} else {
			result += month;
		}

		return result;
	}

	formatCSSClass(input: string) {
		return input.toLowerCase().replace(/\s/g, "-").replace(/_/g, "-");
	}

	formatReadable(input: string) {
		return input
			.replace(/_/g, " ")
			.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
			.join(" ");
	}

	dateReadable(dateInput: string) {
		const dateObj = new Date(dateInput);
		const months = [...Array(12).keys()].map((key) => new Date(0, key).toLocaleString("en", { month: "long" }));

		return `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
	}

	/*
	 * Formats the date into YYYY-MM-DD for Myneworm API usage
	 */
	APIDateFormatter(dateInput: Date): string {
		let currDate = `${dateInput.getFullYear()}-`;

		const month = dateInput.getMonth() + 1;
		if (month < 10) {
			currDate += "0";
		}
		currDate += `${month}-`;

		const date = dateInput.getDate();
		if (date < 10) {
			currDate += "0";
		}
		currDate += `${date}-`;

		return currDate;
	}

	toTitleCase(input: string) {
		const test = input.split(" ");
		let result = "";

		for (let i = 0; i < test.length; i++) {
			if (i !== 0) {
				result += " ";
			}
			result += test[i].charAt(0).toUpperCase() + test[i].slice(1);
		}

		return result;
	}

	/* Handle the error catching for pages */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	catchAPIError(error: any) {
		if (error.status === 404) {
			this.router.navigate(["/404"]);
		} else {
			console.error(error);
		}

		return of(null);
	}
}
