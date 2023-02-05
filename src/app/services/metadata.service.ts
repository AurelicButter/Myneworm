import { Injectable } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

@Injectable({
	providedIn: "root"
})
export class MetadataService {
	private setImage = false;

	constructor(private titleService: Title, private metaService: Meta) {}

	updateMetaTags(title: string, path: string, description?: string, imageURL?: string) {
		this.titleService.setTitle(`Myneworm - ${title}`);
		this.metaService.updateTag({ name: "og:title", content: `Myneworm - ${title}` });
		this.metaService.updateTag({ name: "og:url", content: `https://myneworm.katsurin.com${path}` });

		if (description) {
			this.metaService.updateTag({ name: "description", content: description });
			this.metaService.updateTag({ name: "og:description", content: description });
		} else {
			this.metaService.updateTag({
				name: "description",
				content: "Track and stay up-to-date on upcoming light novel and manga releases"
			});
			this.metaService.updateTag({
				name: "og:description",
				content: "Track and stay up-to-date on upcoming light novel and manga releases"
			});
		}

		if (imageURL) {
			this.metaService.addTag({ name: "og:image", content: imageURL });
			this.setImage = true;
		} else if (this.setImage) {
			this.metaService.removeTag("name='og:image'");
			this.setImage = false;
		}
	}

	resetMetaTags(title: string) {
		this.titleService.setTitle(`Myneworm - ${title}`);
		this.metaService.updateTag({ name: "og:title", content: `Myneworm - ${title}` });
		this.metaService.updateTag({ name: "og:url", content: `https://myneworm.katsurin.com` });
		this.metaService.updateTag({
			name: "description",
			content: "Track and stay up-to-date on upcoming light novel and manga releases"
		});
		this.metaService.updateTag({
			name: "og:description",
			content: "Track and stay up-to-date on upcoming light novel and manga releases"
		});
		this.metaService.removeTag("name='og:image'");
		this.setImage = false;
	}
}
