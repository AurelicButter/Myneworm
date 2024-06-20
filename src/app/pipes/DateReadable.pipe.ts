import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	standalone: true,
	name: "DateReadable"
})
export class DateReadablePipe implements PipeTransform {
	months = [...Array(12).keys()].map((key) => new Date(0, key).toLocaleString("en", { month: "long" }));

	transform(value: string) {
		if (!value) {
			return "";
		}
		const dateObj = new Date(value);
		return `${dateObj.getDate()} ${this.months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
	}
}
