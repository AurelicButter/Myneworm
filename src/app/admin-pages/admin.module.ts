import { NgModule } from "@angular/core";
import { LandingComponent } from "./landing/landing.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { HomePanelComponent } from "./home-panel/home-panel.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { DataCorrectionComponent } from "./data-correction/data-correction.component";
import { UserReportComponent } from "./user-report/user-report.component";

@NgModule({
	declarations: [
		LandingComponent,
		HomePanelComponent,
		UserManagementComponent,
		DataCorrectionComponent,
		UserReportComponent
	],
	imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
