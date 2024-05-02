import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BookCorrectionFormComponent } from "./book-correction-form.component";

describe("DataCorrectionFormComponent", () => {
	let component: BookCorrectionFormComponent;
	let fixture: ComponentFixture<BookCorrectionFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BookCorrectionFormComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BookCorrectionFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
