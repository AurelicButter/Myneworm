import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StatisticDisplayComponent } from "./statistic-display.component";

describe("StatisticDisplayComponent", () => {
	let component: StatisticDisplayComponent;
	let fixture: ComponentFixture<StatisticDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [StatisticDisplayComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(StatisticDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
