import { TestBed } from "@angular/core/testing";

import { MynewormAPIService } from "./myneworm-api.service";

describe("MynewormAPIService", () => {
	let service: MynewormAPIService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MynewormAPIService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
