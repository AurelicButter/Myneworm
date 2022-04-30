import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { ImprintPageComponent } from "./imprint-page.component";

@NgModule({
	declarations: [ImprintPageComponent],
	imports: [BrowserModule, SharedModule],
	exports: [ImprintPageComponent]
})
export class ImprintPageModule {}
