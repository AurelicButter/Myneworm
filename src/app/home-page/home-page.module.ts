import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";

import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [HomePageComponent],
	imports: [CommonModule, SharedModule],
	exports: [HomePageComponent]
})
export class HomePageModule {}
