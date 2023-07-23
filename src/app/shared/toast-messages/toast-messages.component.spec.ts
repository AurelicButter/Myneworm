import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToastMessagesComponent } from "./toast-messages.component";

describe("ToastMessagesComponent", () => {
	let component: ToastMessagesComponent;
	let fixture: ComponentFixture<ToastMessagesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ToastMessagesComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ToastMessagesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
