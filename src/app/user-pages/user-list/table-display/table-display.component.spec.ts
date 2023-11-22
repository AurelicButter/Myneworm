import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TableDisplayComponent } from "./table-display.component";

describe("TableDisplayComponent", () => {
	let component: TableDisplayComponent;
	let fixture: ComponentFixture<TableDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TableDisplayComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TableDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
