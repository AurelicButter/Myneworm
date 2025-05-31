import { CalendarApi } from "@fullcalendar/core";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";
import { MonthReleaseData } from "../models/monthReleaseData";

export class ImprintBookFetcher {
	dateCache: string[] = [];

	constructor(
		private service: MynewormAPIService,
		private utilities: UtilitiesService
	) {}

	getBooks(calendar: CalendarApi, publisherID: number, targetDate: Date): void {
		const currDate = `${targetDate.getFullYear()}${targetDate.getMonth() + 1}`;

		if (this.dateCache.includes(currDate)) {
			return;
		}

		this.service.getMonthData(currDate, publisherID.toString()).subscribe((data: MonthReleaseData[]) => {
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
