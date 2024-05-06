import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	standalone: true,
	name: "bookFormat"
})
export class BookFormatPipe implements PipeTransform {
	transform(value: string) {
		if (!value) {
			return "";
		}
		return value
			.replace(/_/g, " ")
			.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
			.join(" ");
	}
}
