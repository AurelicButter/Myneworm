import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListEntryModalComponent } from "./list-entry-modal.component";

describe("ListEntryModalComponent", () => {
	let component: ListEntryModalComponent;
	let fixture: ComponentFixture<ListEntryModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListEntryModalComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ListEntryModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
