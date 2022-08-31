import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CalendarOptions } from "@fullcalendar/angular";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { CalendarManagerComponent } from "../shared/calendar-manager/calendar-manager.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DatepickerModalComponent } from "../shared/datepicker-modal/datepicker-modal.component";
import { Title } from "@angular/platform-browser";
import { ImprintColours } from "../enums/ImprintColours";
import { UtilitiesService } from "../services/utilities.service";

let formatCSS: (arg0: string) => string;
let formatText: (arg0: string) => string;

@Component({
	selector: "app-home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
	calendarVisible = false;
	calendarOptions: CalendarOptions | undefined;
	monthCache: string[] = [];

	@ViewChild("calendar", { static: false }) calendarManager!: CalendarManagerComponent;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		public matDialog: MatDialog,
		private titleService: Title,
		private utilities: UtilitiesService
	) {
		this.titleService.setTitle("Myneworm - Home");
	}

	ngOnInit(): void {
		formatCSS = this.utilities.formatCSSClass;
		formatText = this.utilities.formatReadable;

		this.calendarOptions = {
			themeSystem: "standard",
			height: "calc(100vh - 190px)",
			initialView: "dayGridMonth",
			dayMaxEventRows: 5,
			buttonText: {
				list: "schedule"
			},
			showNonCurrentDates: false,
			fixedWeekCount: false,
			headerToolbar: {
				left: "today,dateSelector",
				center: "title",
				right: "prev,dayGridWeek,dayGridMonth,listMonth,next"
			},
			views: {
				dayGridWeek: {
					dayMaxEventRows: false
				},
				listMonth: {
					eventContent: function (arg) {
						const formatTag = document.createElement("div");
						const imprintTag = document.createElement("div");
						const typeTag = document.createElement("div");
						const bookTitle = document.createElement("div");

						formatTag.className = `${formatCSS(arg.event.extendedProps.format)} schedule-tag`;
						imprintTag.className = `${formatCSS(arg.event.extendedProps.imprint)} schedule-tag`;
						typeTag.className = `${formatCSS(arg.event.extendedProps.bookType)} schedule-tag`;
						bookTitle.className = "book-title";

						formatTag.innerHTML = formatText(arg.event.extendedProps.format);
						imprintTag.innerHTML = arg.event.extendedProps.imprint.replace("Entertainment", "");
						typeTag.innerHTML = formatText(arg.event.extendedProps.bookType);
						bookTitle.innerHTML = `<a href="${arg.event.url}">${arg.event.title}</a>`;

						const arrayOfDomNodes = [formatTag, imprintTag, typeTag, bookTitle];
						return { domNodes: arrayOfDomNodes };
					}
				}
			},
			customButtons: {
				dateSelector: {
					icon: "calendar",
					text: "Select Date",
					click: () => {
						this.selectDate();
					}
				}
			}
		};

		this.getDates(this.utilities.dateFormater(new Date().getFullYear(), new Date().getMonth() + 1));

		this.calendarVisible = true;
	}

	selectDate(): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.id = "datepicker-modal";

		dialogConfig.height = "350px";
		dialogConfig.width = "600px";
		const modalDialog = this.matDialog.open(DatepickerModalComponent, dialogConfig);

		modalDialog.afterClosed().subscribe((result) => {
			if (result) {
				this.calendarManager.updateDate(result);
			}
		});
	}

	getDates(date: string): void {
		if (this.monthCache.includes(date)) {
			return;
		}

		this.service.getMonthData(date).subscribe((monthInput) => {
			this.monthCache.push(date);

			monthInput.forEach((entry) => {
				this.calendarManager.myCalendar?.getApi().addEvent({
					id: entry.isbn,
					title: entry.title,
					backgroundColor:
						ImprintColours[entry.name as keyof typeof ImprintColours] || ImprintColours.default,
					start: entry.release_date,
					allDay: true,
					url: `./book/${entry.isbn}`,
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
