import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";

@Component({
	selector: "user-settings-page",
	templateUrl: "./user-settings-page.component.html",
	styleUrls: ["./user-settings-page.component.css"]
})
export class UserSettingsPageComponent implements OnInit {
	currPage: string;
	avatar: unknown;
	message: string;
	url: string | ArrayBuffer | null;

	constructor(private route: ActivatedRoute, private service: MynewormAPIService) {}

	ngOnInit() {
		this.route.params.subscribe((data) => {
			if (data.page) {
				this.currPage = data.page.toUpperCase();
			} else {
				this.currPage = "PROFILE";
			}
		});
	}

	updatePage(clickEvent: string) {
		this.currPage = clickEvent;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	onFileChanged(event) {
		const files = event.target.files;
		if (files.length === 0) {
			return;
		}

		if (files[0].type.match(/image\/*/) === null) {
			this.message = "Only images are supported.";
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = () => {
			this.url = reader.result;
		};
	}
}
