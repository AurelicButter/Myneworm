import { TestBed } from "@angular/core/testing";

import { LazyLoadStyleService } from "./lazy-load-style.service";

describe("LazyLoadStyleService", () => {
	let service: LazyLoadStyleService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LazyLoadStyleService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
