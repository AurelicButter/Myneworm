import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CalendarOptions } from "@fullcalendar/angular";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { CalendarManagerComponent } from "../shared/calendar-manager/calendar-manager.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DatepickerModalComponent } from "../shared/datepicker-modal/datepicker-modal.component";

@Component({
	selector: "app-home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
	calendarVisible = false;
	calendarOptions: CalendarOptions | undefined;

	@ViewChild("calendar", { static: false }) calendarManager!: CalendarManagerComponent;

	constructor(private route: ActivatedRoute, private service: MynewormAPIService, public matDialog: MatDialog) {}

	ngOnInit(): void {
		this.calendarOptions = {
			themeSystem: "standard",
			height: "calc(100vh - 190px)",
			initialView: "dayGridMonth",
			editable: false,
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
}
