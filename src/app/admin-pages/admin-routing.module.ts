import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IsModeratorGuard } from "../services/authentication/is-moderator.guard";
import { LandingComponent } from "./landing/landing.component";
import { HomePanelComponent } from "./home-panel/home-panel.component";
import { UserReportComponent } from "./user-report/user-report.component";
import { DataCorrectionComponent } from "./data-correction/data-correction.component";
import { BookCorrectionLandingComponent } from "./book-correction-landing/book-correction-landing.component";
import { BookCorrectionComponent } from "./book-correction/book-correction.component";

const routes: Routes = [
	{
		path: "",
		component: LandingComponent,
		canActivate: [IsModeratorGuard],
		children: [
			{ path: "", component: HomePanelComponent },
			{ path: "home", component: HomePanelComponent },
			{ path: "user-report", component: UserReportComponent },
			{
				path: "corrections",
				children: [
					{ path: "book", component: BookCorrectionLandingComponent },
					{ path: "book/:isbn/:correctionID", component: BookCorrectionComponent },
					{ path: "series", component: DataCorrectionComponent }
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
