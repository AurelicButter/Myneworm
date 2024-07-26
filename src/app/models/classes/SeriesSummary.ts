export class SeriesSummary {
	formatName: string;
	volumeCount: number;
	firstEntry: {
		isbn: string;
		title: string;
		releaseDate: string;
	};
	latestEntry: {
		isbn: string;
		title: string;
		releaseDate: string;
	};

	constructor(formatName: string) {
		this.formatName = formatName;

		this.firstEntry = {
			isbn: "",
			title: "",
			releaseDate: new Date().toISOString()
		};
		this.latestEntry = {
			isbn: "",
			title: "",
			releaseDate: new Date().toISOString()
		};
	}
}
