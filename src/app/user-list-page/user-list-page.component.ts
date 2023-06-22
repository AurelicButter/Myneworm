import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { MetadataService } from "../services/metadata.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Sort } from "@angular/material/sort";

@Component({
	selector: "user-list-page",
	templateUrl: "./user-list-page.component.html",
	styleUrls: ["./user-list-page.component.css"]
})
export class UserListPageComponent {
	displayedColumns = ["cover", "title", "score", "reread", "active", "owner", "notes"];
	public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
	listUser = "";

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

		this.dataSource.data = [
			{
				list_id: 1,
				user_id: 1,
				isbn: 9781718356108,
				title: "Ascendance of a Bookworm: Part 3 Volume 4",
				start_date: "2023-01-10",
				end_date: "2023-02-10",
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
				score: 9,
				reread: 0,
				active_status: "completed",
				owner_status: "loaned",
				notes: "Wish I owned this for real..."
			}
		];
	}

	getCover(isbn: string) {
		return this.service.getAsset(`${isbn}`);
	}

	sortData(sort: Sort) {
		const data = this.dataSource.data;

		if (!sort.active || sort.direction === "") {
			this.dataSource.data = data;
			return;
		}

		this.dataSource.data = data.sort((a, b) => {
			const isAsc = sort.direction === "asc";
			switch (sort.active) {
				case "title":
					return compare(a.title, b.title, isAsc);
				case "score":
					return compare(a.score, b.score, isAsc);
				case "reread":
					return compare(a.reread, b.reread, isAsc);
				default:
					return 0;
			}
		});
	}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
