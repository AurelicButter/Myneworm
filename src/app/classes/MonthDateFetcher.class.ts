import { CalendarApi } from "@fullcalendar/core";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";

export class MonthDateFetcher {
	monthCache: string[] = [];

	constructor(private service: MynewormAPIService, private utilities: UtilitiesService) {}

	getDates(calendar: CalendarApi, dateObj: Date): void {
		const date = this.utilities.dateFormater(dateObj.getFullYear(), dateObj.getMonth() + 1);

		if (this.monthCache.includes(date)) {
			return;
		}

		this.service.getMonthData(date).subscribe((monthInput) => {
			this.monthCache.push(date);

			monthInput.forEach((entry) => {
				calendar.addEvent({
					id: entry.isbn,
					title: entry.title,
					start: entry.release_date,
					allDay: true,
					url: `./book/${entry.isbn}`,
					classNames: [this.utilities.formatCSSClass(entry.name), "default-imprint-colour"],
					extendedProps: {
						format: entry.format_name,
						imprint: entry.name,
						bookType: entry.book_type_name
					}
				});
			});
		});
	}
}
