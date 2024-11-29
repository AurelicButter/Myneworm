import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchPageComponent } from "./search.component";

describe("SearchComponent", () => {
	let component: SearchPageComponent;
	let fixture: ComponentFixture<SearchPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchPageComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SearchPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
