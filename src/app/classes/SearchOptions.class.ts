import { Params } from "@angular/router";

export default class SearchOptions {
	startDate?: string | undefined;
	endDate?: string | undefined;
	type?: string | undefined;
	format?: string | undefined;
	publisher_id?: number | undefined;
	limit?: number | undefined;
	term?: string | undefined;
	page = 1;

	generateParams(): Params {
		const queryParams: Params = {
			...this.startDate && { start: this.startDate },
			...this.endDate && { end: this.endDate },
			...this.term && { term: this.term },
			...this.publisher_id && { publisher: this.publisher_id },
			...this.type && { type: this.type },
			...this.format && { format: this.format },
			...this.limit && { limit: this.limit }
		};

		console.log(queryParams);

		return queryParams;
	}

	loadFromParams(params: Params) {
		this.term = params.term;
		this.startDate = params.start;
		this.endDate = params.end;
		this.page = params.page || 1;
		this.type = params.type;
		this.format = params.format;
		this.publisher_id = params.publisher;
	}

	hasAdvanceOptions(): boolean {
		return (
			this.startDate !== undefined ||
			this.endDate !== undefined ||
			this.type !== undefined ||
			this.format !== undefined ||
			this.publisher_id !== undefined
		);
	}

	hasInput(): boolean {
		return this.term !== undefined || this.hasAdvanceOptions();
	}
}
