import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SupportPageComponent } from "./support.component";

describe("SupportPageComponent", () => {
	let component: SupportPageComponent;
	let fixture: ComponentFixture<SupportPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SupportPageComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SupportPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
