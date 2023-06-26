import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { MetadataService } from "../services/metadata.service";
import { ActivatedRoute } from "@angular/router";

import { ListEntry } from "../models/ListEntry";
import { UtilitiesService } from "../services/utilities.service";
import { catchError } from "rxjs";
import { UserData } from "../models/userData";

@Component({
	selector: "user-list-page",
	templateUrl: "./user-list-page.component.html",
	styleUrls: ["./user-list-page.component.css"]
})
export class UserListPageComponent {
	public readingSource: MatTableDataSource<ListEntry> = new MatTableDataSource<ListEntry>();
	public completedSource: MatTableDataSource<ListEntry> = new MatTableDataSource<ListEntry>();
	public pausedSource: MatTableDataSource<ListEntry> = new MatTableDataSource<ListEntry>();
	public droppedSource: MatTableDataSource<ListEntry> = new MatTableDataSource<ListEntry>();
	public planningSource: MatTableDataSource<ListEntry> = new MatTableDataSource<ListEntry>();
	listUser = "";
	appliedFilter = 0;
	filter = {
		reading: false,
		completed: false,
		paused: false,
		dropped: false,
		planning: false
	};
	ownershipFilter: string[] = [];
	booktypeFilter: string[] = [];
	triggerListUpdate = false;

	constructor(
		private route: ActivatedRoute,
		public service: MynewormAPIService,
		private metaService: MetadataService,
		private utilities: UtilitiesService
	) {
		this.route.params.subscribe((data) => {
			this.metaService.updateMetaTags(`${data.username}'s List`, `/user/${data.username}/lists`);
			this.listUser = data.username;
		});
	}

	ngOnInit() {
		this.route.params.subscribe((data) => {
			this.service
				.getUser(data.username)
				.pipe(catchError((err) => this.utilities.catchAPIError(err)))
				.subscribe((userData: UserData | null) => {
					if (userData === null) {
						return;
					}

					this.service
						.getUserList(userData.user_id.toString())
						.pipe(catchError((err) => this.utilities.catchAPIError(err)))
						.subscribe((listEntries: ListEntry[] | null) => {
							if (listEntries === null) {
								return;
							}

							this.compileLists(listEntries);
						});
				});
		});
	}

	compileLists(listEntries: ListEntry[]) {
		const lists: { [key: string]: ListEntry[] } = {};

		for (const entry of listEntries) {
			entry["isExpanded"] = false;
			if (Object.prototype.hasOwnProperty.call(lists, entry.active_status)) {
				lists[entry.active_status].push(entry);
			} else {
				lists[entry.active_status] = [entry];
			}
		}

		for (const key of Object.keys(lists)) {
			switch (key) {
				case "reading":
					this.readingSource.data = lists[key];
					break;
				case "completed":
					this.completedSource.data = lists[key];
					break;
				case "paused":
					this.pausedSource.data = lists[key];
					break;
				case "dropped":
					this.droppedSource.data = lists[key];
					break;
				case "planning":
					this.planningSource.data = lists[key];
					break;
				default:
					throw new Error("Type not in switch for table data");
			}
		}

		this.refreshTables();
	}

	refreshTables() {
		this.triggerListUpdate = !this.triggerListUpdate;
	}

	updateFilterCount(newValue: boolean) {
		if (newValue) {
			this.appliedFilter++;
			return;
		}

		this.appliedFilter--;
	}

	statusUpdate(update: string): void {
		switch (update) {
			case "reading":
				this.filter.reading = !this.filter.reading;
				this.updateFilterCount(this.filter.reading);
				break;
			case "completed":
				this.filter.completed = !this.filter.completed;
				this.updateFilterCount(this.filter.completed);
				break;
			case "paused":
				this.filter.paused = !this.filter.paused;
				this.updateFilterCount(this.filter.paused);
				break;
			case "dropped":
				this.filter.dropped = !this.filter.dropped;
				this.updateFilterCount(this.filter.dropped);
				break;
			case "planning":
				this.filter.planning = !this.filter.planning;
				this.updateFilterCount(this.filter.planning);
				break;
		}
	}

	addOwnership(status: string) {
		const index = this.ownershipFilter.indexOf(status);
		index !== -1 ? this.ownershipFilter.splice(index, 1) : this.ownershipFilter.push(status);
		this.refreshTables();
	}

	addBooktype(booktype: string) {
		const index = this.booktypeFilter.indexOf(booktype);
		index !== -1 ? this.booktypeFilter.splice(index, 1) : this.booktypeFilter.push(booktype);
		this.refreshTables();
	}

	clearFilters() {
		this.ownershipFilter = [];
		this.booktypeFilter = [];
		this.filter = {
			reading: false,
			completed: false,
			paused: false,
			dropped: false,
			planning: false
		};

		this.appliedFilter = 0;
	}
}
