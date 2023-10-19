import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { WishlistComponent } from "./wishlist.component";
import { WishlistDisplayComponent } from "./wishlist-display/wishlist-display.component";

@NgModule({
	declarations: [WishlistComponent, WishlistDisplayComponent],
	imports: [BrowserModule, RouterModule, SharedModule],
	exports: [WishlistComponent]
})
export class WishlistModule {}
