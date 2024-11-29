import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FavouritesDisplayComponent } from "./favourites-display.component";

describe("FavouritesDisplayComponent", () => {
	let component: FavouritesDisplayComponent;
	let fixture: ComponentFixture<FavouritesDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FavouritesDisplayComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(FavouritesDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
