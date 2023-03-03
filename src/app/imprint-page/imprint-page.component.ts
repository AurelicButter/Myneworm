import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { CalendarOptions } from "@fullcalendar/core";
import { CalendarManagerComponent } from "../shared/calendar-manager/calendar-manager.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DatepickerModalComponent } from "../shared/datepicker-modal/datepicker-modal.component";
import { ImprintData } from "../models/imprintData";
import { UtilitiesService } from "../services/utilities.service";
import { ImprintBookFetcher } from "../classes/ImprintBookFetcher.class";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { MetadataService } from "../services/metadata.service";
import { catchError } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

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
		private metaService: MetadataService,
		private utilities: UtilitiesService,
		// eslint-disable-next-line @typescript-eslint/ban-types
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		imprintFetcher = new ImprintBookFetcher(this.service, this.utilities);
		UtilityService = this.utilities;
	}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.calendarOptions = {
				plugins: [interactionPlugin, listPlugin],
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
							return {
								html: `
								<div class='${UtilityService.formatCSSClass(
									arg.event.extendedProps.format
								)} schedule-tag'>${UtilityService.formatReadable(arg.event.extendedProps.format)}</div>
								<div class='${UtilityService.formatCSSClass(
									arg.event.extendedProps.bookType
								)} schedule-tag'>${UtilityService.formatReadable(
									arg.event.extendedProps.bookType
								)}</div>
								<div class='book-title'><a href="${arg.event.url}">${arg.event.title}</a></div>
						`
							};
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
		}

		this.route.params.subscribe((data) => {
			this.service
				.getImprintInfo(data.id)
				.pipe(catchError((err) => this.utilities.catchAPIError(err)))
				.subscribe((data: ImprintData | null) => {
					if (data === null) {
						return;
					}
					this.imprint = data;
					publisher = data;
					this.metaService.updateMetaTags(
						this.imprint.name,
						`/publisher/${this.imprint.publisher_id}`,
						undefined,
						this.getLogo(this.imprint.publisher_id)
					);
				});
		});
	}

	selectDate(): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.id = "datepicker-modal";

		dialogConfig.height = "300px";
		dialogConfig.width = "400px";
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
