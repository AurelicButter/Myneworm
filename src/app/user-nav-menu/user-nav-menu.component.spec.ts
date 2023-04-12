import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserNavMenuComponent } from "./user-nav-menu.component";

describe("UserNavMenuComponent", () => {
	let component: UserNavMenuComponent;
	let fixture: ComponentFixture<UserNavMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserNavMenuComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(UserNavMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
