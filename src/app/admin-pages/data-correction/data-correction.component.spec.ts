import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DataCorrectionComponent } from "./data-correction.component";

describe("DataCorrectionComponent", () => {
	let component: DataCorrectionComponent;
	let fixture: ComponentFixture<DataCorrectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataCorrectionComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(DataCorrectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
