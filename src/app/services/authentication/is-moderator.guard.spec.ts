import { TestBed } from "@angular/core/testing";

import { IsModeratorGuard } from "./is-moderator.guard";

describe("IsModeratorGuard", () => {
	let guard: IsModeratorGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(IsModeratorGuard);
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});
});
