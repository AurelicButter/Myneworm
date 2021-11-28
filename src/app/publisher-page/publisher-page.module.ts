import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PublisherPageComponent } from "./publisher-page.component";

@NgModule({
	declarations: [PublisherPageComponent],
	imports: [BrowserModule],
	exports: [PublisherPageComponent]
})
export class PublisherPageModule {}
