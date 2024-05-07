import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class UtilitiesService {
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
		currDate += date;

		return currDate;
	}
}
