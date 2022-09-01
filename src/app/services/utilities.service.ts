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
}
