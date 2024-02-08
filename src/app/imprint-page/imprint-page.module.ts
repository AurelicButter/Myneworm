import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ImprintPageComponent } from "./imprint-page.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [ImprintPageComponent],
	imports: [CommonModule, SharedModule],
	exports: [ImprintPageComponent]
})
export class ImprintPageModule {}
