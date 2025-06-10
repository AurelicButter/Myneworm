import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MarkdownHelpModalComponent } from "./markdown-help.modal.component";

describe("MarkdownHelpModalComponent", () => {
	let component: MarkdownHelpModalComponent;
	let fixture: ComponentFixture<MarkdownHelpModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MarkdownHelpModalComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(MarkdownHelpModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
