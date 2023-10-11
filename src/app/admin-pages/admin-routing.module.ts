import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IsModeratorGuard } from "../services/authentication/is-moderator.guard";
import { LandingComponent } from "./landing/landing.component";
import { HomePanelComponent } from "./home-panel/home-panel.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { UserReportComponent } from "./user-report/user-report.component";
import { DataCorrectionComponent } from "./data-correction/data-correction.component";

const routes: Routes = [
	{
		path: "",
		component: LandingComponent,
		canActivate: [IsModeratorGuard],
		children: [
			{ path: "", component: HomePanelComponent },
			{ path: "home", component: HomePanelComponent },
			{ path: "data-correction", component: DataCorrectionComponent },
			{ path: "user-management", component: UserManagementComponent },
			{ path: "user-report", component: UserReportComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
