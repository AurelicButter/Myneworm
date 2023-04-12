import { TestBed } from "@angular/core/testing";

import { LocalCookiesService } from "./local-cookies.service";

describe("LocalCookiesService", () => {
	let service: LocalCookiesService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LocalCookiesService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
