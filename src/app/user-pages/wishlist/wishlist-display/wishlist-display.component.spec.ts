import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WishlistDisplayComponent } from "./wishlist-display.component";

describe("WishlistDisplayComponent", () => {
	let component: WishlistDisplayComponent;
	let fixture: ComponentFixture<WishlistDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [WishlistDisplayComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(WishlistDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
