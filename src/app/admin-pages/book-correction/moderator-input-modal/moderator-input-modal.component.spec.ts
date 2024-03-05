import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModeratorInputModalComponent } from "./moderator-input-modal.component";

describe("ModeratorInputModalComponent", () => {
	let component: ModeratorInputModalComponent;
	let fixture: ComponentFixture<ModeratorInputModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModeratorInputModalComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModeratorInputModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
