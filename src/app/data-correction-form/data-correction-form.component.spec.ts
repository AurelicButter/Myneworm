import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DataCorrectionFormComponent } from "./data-correction-form.component";

describe("DataCorrectionFormComponent", () => {
	let component: DataCorrectionFormComponent;
	let fixture: ComponentFixture<DataCorrectionFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataCorrectionFormComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataCorrectionFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
