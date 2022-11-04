import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { CalendarOptions } from "@fullcalendar/angular";
import { CalendarManagerComponent } from "../shared/calendar-manager/calendar-manager.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DatepickerModalComponent } from "../shared/datepicker-modal/datepicker-modal.component";
import { ImprintData } from "../models/imprintData";
import { Title } from "@angular/platform-browser";
import { UtilitiesService } from "../services/utilities.service";
import { ImprintBookFetcher } from "../classes/ImprintBookFetcher.class";

/*
 * Global file values as CalendarOptions does not accept `this` keyword
 * like every other function in the component would.
 */
let imprintFetcher: ImprintBookFetcher;
let publisher: ImprintData;
let UtilityService: UtilitiesService;

@Component({
	selector: "app-imprint-page",
	templateUrl: "./imprint-page.component.html",
	styleUrls: ["./imprint-page.component.css"]
})
export class ImprintPageComponent implements OnInit {
	calendarVisible = false;
	calendarOptions: CalendarOptions | undefined;
	imprint: ImprintData;

	@ViewChild("calendar", { static: false }) calendarManager!: CalendarManagerComponent;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		public matDialog: MatDialog,
		private titleService: Title,
		private utilities: UtilitiesService
	) {
		imprintFetcher = new ImprintBookFetcher(this.service, this.utilities);
		UtilityService = this.utilities;
	}

	ngOnInit(): void {
		this.calendarOptions = {
			themeSystem: "standard",
			height: "calc(100vh - 190px)",
			initialView: "listMonth",
			editable: false,
			showNonCurrentDates: false,
			fixedWeekCount: false,
			headerToolbar: {
				left: "prev,today,dateSelector,next",
				center: "title",
				right: undefined
			},
			views: {
				listMonth: {
					eventContent: function (arg) {
						const formatTag = document.createElement("div");
						const typeTag = document.createElement("div");
						const bookTitle = document.createElement("div");

						formatTag.className = `${UtilityService.formatCSSClass(
							arg.event.extendedProps.format
						)} schedule-tag`;
						typeTag.className = `${UtilityService.formatCSSClass(
							arg.event.extendedProps.bookType
						)} schedule-tag`;
						bookTitle.className = "book-title";

						formatTag.innerHTML = UtilityService.formatReadable(arg.event.extendedProps.format);
						typeTag.innerHTML = UtilityService.formatReadable(arg.event.extendedProps.bookType);
						bookTitle.innerHTML = `<a href="${arg.event.url}">${arg.event.title}</a>`;

						const arrayOfDomNodes = [formatTag, typeTag, bookTitle];
						return { domNodes: arrayOfDomNodes };
					}
				}
			},
			datesSet: function (dateInfo) {
				imprintFetcher.getBooks(dateInfo.view.calendar, publisher.publisher_id, dateInfo.start);
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

		this.route.params.subscribe((data) => {
			this.service.getImprintInfo(data.id).subscribe((data: ImprintData) => {
				this.imprint = data;
				publisher = data;
				this.titleService.setTitle(`Myneworm - ${this.imprint.name}`);
			});
		});
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

	getLogo(id: number) {
		return this.service.getAsset(`imprint/${id}`);
	}
}
