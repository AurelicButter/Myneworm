import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResetPasswordLinkComponent } from "./reset-password-link.component";

describe("ResetPasswordLinkComponent", () => {
	let component: ResetPasswordLinkComponent;
	let fixture: ComponentFixture<ResetPasswordLinkComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ResetPasswordLinkComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ResetPasswordLinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
