import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserActionDropdownComponent } from "./user-action-dropdown.component";

describe("UserActionDropdownComponent", () => {
	let component: UserActionDropdownComponent;
	let fixture: ComponentFixture<UserActionDropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserActionDropdownComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserActionDropdownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
