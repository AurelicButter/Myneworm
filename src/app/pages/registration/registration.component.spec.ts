import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RegistrationPageComponent } from "./registration.component";

describe("RegistrationPageComponent", () => {
	let component: RegistrationPageComponent;
	let fixture: ComponentFixture<RegistrationPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RegistrationPageComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(RegistrationPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
