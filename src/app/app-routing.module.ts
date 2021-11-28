import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookPageComponent } from "./book-page/book-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { PublisherPageComponent } from "./publisher-page/publisher-page.component";

const routes: Routes = [
	{ path: "", component: HomePageComponent },
	{ path: "home", pathMatch: "full", redirectTo: "" },
	{ path: "book/:isbn", component: BookPageComponent },
	{ path: "publisher/:id", component: PublisherPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
