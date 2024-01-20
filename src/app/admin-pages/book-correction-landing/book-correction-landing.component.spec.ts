import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BookCorrectionLandingComponent } from "./book-correction-landing.component";

describe("BookCorrectionLandingComponent", () => {
	let component: BookCorrectionLandingComponent;
	let fixture: ComponentFixture<BookCorrectionLandingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BookCorrectionLandingComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BookCorrectionLandingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
