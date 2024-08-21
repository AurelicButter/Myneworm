import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookCarouselComponent } from "src/app/components/book-carousel/book-carousel.component";
import { SeriesEntry } from "src/app/models/SeriesEntry";
import { BookFormatPipe } from "src/app/pipes/BookFormat.pipe";
import { MetadataService } from "src/app/services/metadata.service";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { MatExpansionModule } from "@angular/material/expansion";
import { SeriesSummary } from "src/app/models/classes/SeriesSummary";
import { DateReadablePipe } from "src/app/pipes/DateReadable.pipe";
import { SanitizeURLPipe } from "src/app/pipes/SanitizeURL.pipe";
import { BookData } from "src/app/models/bookData";
import { MarkdownModule } from "ngx-markdown";

interface SeriesCollection {
	paperback: BookData[];
	ebook: BookData[];
	hardcover: BookData[];
	audiobook: BookData[];
}

@Component({
	selector: "app-series-page",
	templateUrl: "./series-page.component.html",
	styleUrls: ["./series-page.component.css"],
	standalone: true,
	imports: [
		CommonModule,
		BookFormatPipe,
		BookCarouselComponent,
		MatExpansionModule,
		DateReadablePipe,
		SanitizeURLPipe,
		MarkdownModule
	]
})
export class SeriesPageComponent implements OnInit {
	seriesCollection: SeriesCollection = {
		paperback: [],
		ebook: [],
		hardcover: [],
		audiobook: []
	};
	seriesData: SeriesEntry;
	formatSummaries: SeriesSummary[] = [];
	focusedSummary: number = 0;

	constructor(
		private service: MynewormAPIService,
		private route: ActivatedRoute,
		private metaService: MetadataService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((data) => {
			this.service.getBySeriesID(data.id).subscribe((data: BookData[]) => {
				data.forEach((book) => {
					switch (book.book_type_name) {
						case "paperback":
							this.seriesCollection.paperback.push(book);
							break;
						case "ebook":
							this.seriesCollection.ebook.push(book);
							break;
						case "hardcover":
							this.seriesCollection.hardcover.push(book);
							break;
						case "audiobook":
							this.seriesCollection.audiobook.push(book);
							break;
					}
				});

				const keys = Object.keys(this.seriesCollection);

				keys.forEach((key: keyof SeriesCollection | string) => {
					const summary = new SeriesSummary(key);
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					const seriesColl: BookData[] = this.seriesCollection[key];

					summary.volumeCount = seriesColl.length;
					summary.firstEntry = {
						isbn: seriesColl[0].isbn,
						title: seriesColl[0].title,
						releaseDate: seriesColl[0].release_date
					};
					summary.latestEntry = {
						isbn: seriesColl[seriesColl.length - 1].isbn,
						title: seriesColl[seriesColl.length - 1].title,
						releaseDate: seriesColl[seriesColl.length - 1].release_date
					};
					this.formatSummaries.push(summary);
				});
			});

			this.service.getSeries(data.id).subscribe((series: SeriesEntry | null) => {
				if (series === null) {
					this.router.navigate(["/404"]);
					return;
				}

				this.seriesData = series;

				this.metaService.updateMetaTags(
					this.seriesData.name,
					`/series/${this.seriesData.series_id}`,
					this.seriesData.description
				);
			});
		});
	}

	isActiveTab(i: number) {
		return i === this.focusedSummary;
	}

	updateFocus(i: number) {
		this.focusedSummary = i;
	}
}
