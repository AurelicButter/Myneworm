import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileComponent } from "./profile/profile.component";
import { UserRoutingModule } from "./user-routing.module";
import { StatisticDisplayComponent } from "./profile/statistic-display/statistic-display.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { WishlistDisplayComponent } from "./wishlist/wishlist-display/wishlist-display.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list/user-list.component";
import { TableDisplayComponent } from "./user-list/table-display/table-display.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
	declarations: [
		ProfileComponent,
		StatisticDisplayComponent,
		WishlistComponent,
		WishlistDisplayComponent,
		UserListComponent,
		TableDisplayComponent
	],
	imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatSortModule, UserRoutingModule]
})
export class UserModule {}
