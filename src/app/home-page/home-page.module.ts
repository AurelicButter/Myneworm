import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomePageComponent } from "./home-page.component";

import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [HomePageComponent],
	imports: [BrowserModule, SharedModule],
	exports: [HomePageComponent]
})
export class HomePageModule {}
