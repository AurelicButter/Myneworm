import { TestBed } from "@angular/core/testing";

import { MynewormAdminService } from "./myneworm-admin.service";

describe("MynewormAdminService", () => {
	let service: MynewormAdminService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MynewormAdminService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
