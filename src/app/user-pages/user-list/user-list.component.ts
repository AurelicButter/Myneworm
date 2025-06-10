import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MynewormAPIService } from "../../services/myneworm-api.service";
import { MetadataService } from "../../services/metadata.service";
import { ActivatedRoute } from "@angular/router";

import { ListEntry } from "../../models/ListEntry";
import { UserData } from "../../models/userData";
import { LocalCookiesService } from "../../services/authentication/local-cookies.service";

@Component({
	selector: "user-list",
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.css"]
})
export class UserListComponent {
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
	hasEntries = false;
	isAuthUser = false;
	isLoading = true;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		private metaService: MetadataService,
		private cookieService: LocalCookiesService
	) {
		this.route.params.subscribe((data) => {
			this.metaService.updateMetaTags(`${data.username}'s List`, `/user/${data.username}/lists`);
			this.listUser = data.username;

			this.cookieService.userEvent.subscribe((value) => {
				this.isAuthUser = value.username === this.listUser;
			});
		});
	}

	ngOnInit() {
		this.route.params.subscribe((data) => {
			this.service.getUser(data.username).subscribe((userData: UserData | null) => {
				if (userData === null) {
					return;
				}

				this.service.getUserList(userData.user_id.toString()).subscribe((listEntries: ListEntry[] | null) => {
					if (listEntries === null) {
						return;
					}

					this.hasEntries = true;
					this.compileLists(listEntries);
				});
			});
		});
	}

	compileLists(listEntries: ListEntry[]) {
		for (const entry of listEntries) {
			entry["isExpanded"] = false;

			switch (entry.active_status) {
				case "reading":
					this.readingSource.data.push(entry);
					break;
				case "completed":
					this.completedSource.data.push(entry);
					break;
				case "paused":
					this.pausedSource.data.push(entry);
					break;
				case "dropped":
					this.droppedSource.data.push(entry);
					break;
				case "planning":
					this.planningSource.data.push(entry);
					break;
				default:
					throw new Error("Type not in switch for table data");
			}
		}

		this.refreshTables();
		this.isLoading = false;
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
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		index !== -1 ? this.ownershipFilter.splice(index, 1) : this.ownershipFilter.push(status);
		this.refreshTables();
	}

	addBooktype(booktype: string) {
		const index = this.booktypeFilter.indexOf(booktype);
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
