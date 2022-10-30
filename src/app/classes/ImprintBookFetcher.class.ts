import { CalendarApi } from "@fullcalendar/core";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";

export class ImprintBookFetcher {
	dateCache: string[] = [];

	constructor(private service: MynewormAPIService, private utilities: UtilitiesService) {}

	getBooks(calendar: CalendarApi, publisherID: number, targetDate: Date): void {
		const currDate = this.utilities.APIDateFormatter(targetDate);

		if (this.dateCache.includes(currDate)) {
			return;
		}

		this.service.searchBooks(publisherID.toString(), currDate).subscribe((data) => {
			this.dateCache.push(currDate);

			data.forEach((entry) => {
				calendar.addEvent({
					id: entry.isbn,
					title: entry.title,
					start: entry.release_date,
					allDay: true,
					url: `./book/${entry.isbn}`,
					classNames: ["default-imprint-colour"],
					extendedProps: {
						format: entry.format_name,
						bookType: entry.book_type_name
					}
				});
			});
		});
	}
}
