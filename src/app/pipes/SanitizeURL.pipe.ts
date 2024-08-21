import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
	standalone: true,
	name: "sanitizeURL"
})
export class SanitizeURLPipe implements PipeTransform {
	constructor(protected sanitizer: DomSanitizer) {}

	transform(value: string) {
		return this.sanitizer.bypassSecurityTrustUrl(value);
	}
}
