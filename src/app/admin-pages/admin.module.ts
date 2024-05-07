import { NgModule } from "@angular/core";
import { LandingComponent } from "./landing/landing.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { HomePanelComponent } from "./home-panel/home-panel.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { DataCorrectionComponent } from "./data-correction/data-correction.component";
import { UserReportComponent } from "./user-report/user-report.component";
import { BookCorrectionLandingComponent } from "./book-correction-landing/book-correction-landing.component";
import { MatTableModule } from "@angular/material/table";
import { BookCorrectionComponent } from "./book-correction/book-correction.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModeratorInputModalComponent } from "./book-correction/moderator-input-modal/moderator-input-modal.component";

@NgModule({
	declarations: [
		LandingComponent,
		HomePanelComponent,
		UserManagementComponent,
		DataCorrectionComponent,
		UserReportComponent,
		BookCorrectionLandingComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		MatTableModule,
		FormsModule,
		ReactiveFormsModule,
		ModeratorInputModalComponent,
		BookCorrectionComponent
	]
})
export class AdminModule {}
