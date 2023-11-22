import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { UserListComponent } from "./user-list/user-list.component";

const routes: Routes = [
	{
		path: ":username",
		children: [
			{ path: "", component: ProfileComponent },
			{ path: "profile", component: ProfileComponent },
			{ path: "lists", component: UserListComponent },
			{ path: "wishlist", component: WishlistComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule {}
