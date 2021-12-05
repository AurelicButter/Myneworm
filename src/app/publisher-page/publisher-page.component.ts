import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";

@Component({
	selector: "app-publisher-page",
	templateUrl: "./publisher-page.component.html",
	styleUrls: ["./publisher-page.component.css"]
})
export class PublisherPageComponent implements OnInit {
	constructor(private route: ActivatedRoute, private service: MynewormAPIService) {}

	ngOnInit(): void {}
}
