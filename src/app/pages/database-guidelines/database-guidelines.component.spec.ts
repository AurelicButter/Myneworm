import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DatabaseGuidelinesComponent } from "./database-guidelines.component";

describe("DatabaseGuidelinesComponent", () => {
	let component: DatabaseGuidelinesComponent;
	let fixture: ComponentFixture<DatabaseGuidelinesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DatabaseGuidelinesComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(DatabaseGuidelinesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
