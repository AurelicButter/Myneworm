import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PrivacyPageComponent } from "./privacy.component";

describe("PrivacyPageComponent", () => {
	let component: PrivacyPageComponent;
	let fixture: ComponentFixture<PrivacyPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PrivacyPageComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PrivacyPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
