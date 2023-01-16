import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { CalendarManagerComponent } from "../shared/calendar-manager/calendar-manager.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DatepickerModalComponent } from "../shared/datepicker-modal/datepicker-modal.component";
import { Title } from "@angular/platform-browser";
import { UtilitiesService } from "../services/utilities.service";
import { MonthDateFetcher } from "../classes/MonthDateFetcher.class";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

/*
 * Global file values as CalendarOptions does not accept `this` keyword
 * like every other function in the component would.
 */
let formatCSS: (arg0: string) => string;
let formatText: (arg0: string) => string;
let dateFetcher: MonthDateFetcher;

@Component({
	selector: "app-home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
	calendarVisible = false;
	calendarOptions: CalendarOptions | undefined;

	@ViewChild("calendar", { static: false }) calendarManager!: CalendarManagerComponent;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		public matDialog: MatDialog,
		private titleService: Title,
		private utilities: UtilitiesService
	) {
		this.titleService.setTitle("Myneworm - Home");
		dateFetcher = new MonthDateFetcher(this.service, this.utilities);

		formatCSS = this.utilities.formatCSSClass;
		formatText = this.utilities.formatReadable;
	}

	ngOnInit(): void {
		this.calendarOptions = {
			plugins: [dayGridPlugin, interactionPlugin, listPlugin],
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
						imprintTag.innerHTML = `<a href="./publisher/${
							arg.event.extendedProps.imprintID
						}">${arg.event.extendedProps.imprint.replace("Entertainment", "")}</a>`;
						typeTag.innerHTML = formatText(arg.event.extendedProps.bookType);
						bookTitle.innerHTML = `<a href="${arg.event.url}">${arg.event.title}</a>`;

						const arrayOfDomNodes = [formatTag, imprintTag, typeTag, bookTitle];
						return { domNodes: arrayOfDomNodes };
					}
				}
			},
			datesSet: function (dateInfo) {
				dateFetcher.getDates(dateInfo.view.calendar, dateInfo.start);
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

		this.calendarVisible = true;
	}

	selectDate(): void {
		/*const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.id = "datepicker-modal";

		dialogConfig.height = "350px";
		dialogConfig.width = "600px";
		const modalDialog = this.matDialog.open(DatepickerModalComponent, dialogConfig);

		modalDialog.afterClosed().subscribe((result) => {
			if (result) {
				this.calendarManager.updateDate(result);
			}
		});*/
	}
}
