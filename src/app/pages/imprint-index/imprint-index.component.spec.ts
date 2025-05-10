import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ImprintIndexComponent } from "./imprint-index.component";

describe("ImprintIndexComponent", () => {
	let component: ImprintIndexComponent;
	let fixture: ComponentFixture<ImprintIndexComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ImprintIndexComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ImprintIndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
