import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomePageComponent } from "./home-page.component";

@NgModule({
	declarations: [HomePageComponent],
	imports: [BrowserModule],
	exports: [HomePageComponent]
})
export class HomePageModule {}
