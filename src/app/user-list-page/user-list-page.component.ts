import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { MetadataService } from "../services/metadata.service";
import { ActivatedRoute, Router } from "@angular/router";

import { ListEntry } from "../models/ListEntry";

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

	constructor(
		private route: ActivatedRoute,
		public service: MynewormAPIService,
		private metaService: MetadataService,
		private router: Router
	) {
		this.route.params.subscribe((data) => {
			this.metaService.updateMetaTags(`${data.username}'s List`, `/user/${data.username}/lists`);
			this.listUser = data.username;
		});

		const dummyList: ListEntry[] = [
			{
				list_id: 1,
				user_id: 1,
				isbn: 9781718356108,
				title: "Ascendance of a Bookworm: Part 3 Volume 4",
				start_date: "2023-01-10",
				end_date: "2023-02-10",
				book_type: "paperback",
				score: 10,
				reread: 2,
				active_status: "completed",
				owner_status: "owned",
				notes: "Best book ever"
			},
			{
				list_id: 2,
				user_id: 1,
				isbn: 9781718346741,
				title: "Ascendance of a Bookworm: Short Story Collection Volume 1",
				start_date: "2023-02-10",
				end_date: "2023-03-15",
				book_type: "paperback",
				score: 9,
				reread: 0,
				active_status: "completed",
				owner_status: "loaned",
				notes: "Wish I owned this for real..."
			},
			{
				list_id: 3,
				user_id: 1,
				isbn: 9781718356139,
				title: "Ascendance of a Bookworm: Part 4 Volume 2",
				start_date: "2023-02-10",
				book_type: "ebook",
				score: 10,
				reread: 0,
				active_status: "reading",
				owner_status: "owned",
				notes: "<3"
			},
			{
				list_id: 4,
				user_id: 1,
				isbn: 9781718346406,
				title: "Ascendance of a Bookworm: Part 4 Volume 9",
				book_type: "audiobook",
				score: 0,
				reread: 0,
				active_status: "planning",
				owner_status: "wanting"
			},
			{
				list_id: 5,
				user_id: 1,
				isbn: 9781718356030,
				title: "Ascendance of a Bookworm: Part 2 Volume 1",
				book_type: "hardcover",
				score: 10,
				reread: 0,
				start_date: "2021-04-26",
				end_date: "2021-04-27",
				active_status: "completed",
				owner_status: "previous_own"
			}
		];

		const lists: { [key: string]: ListEntry[] } = {};

		for (const entry of dummyList) {
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

		if (index !== -1) {
			this.ownershipFilter.splice(index, 1);
			this.ownershipFilter = [...this.ownershipFilter];
			return;
		}

		this.ownershipFilter.push(status);
		this.ownershipFilter = [...this.ownershipFilter];
	}

	addBooktype(booktype: string) {
		const index = this.booktypeFilter.indexOf(booktype);

		if (index !== -1) {
			this.booktypeFilter.splice(index, 1);
			this.booktypeFilter = [...this.booktypeFilter];
			return;
		}

		this.booktypeFilter.push(booktype);
		this.booktypeFilter = [...this.booktypeFilter];
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
