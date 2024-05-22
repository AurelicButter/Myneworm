export interface BookCorrectionEntry {
	correction_id: number;
	isbn: number;
	title?: string;
	description?: string;
	cover_image?: string;
	format_name?: string;
	book_type?: string;
	release_date?: string;
	publisher_id?: number;
	series_id?: number;
	comment?: string;
	create_date: string;
	update_date: string;
	approved: boolean;
	mod_note?: string;
	submitter_id: number;
	approver_id?: number;
}

export interface BookCorrectionDisplayEntry extends BookCorrectionEntry {
	entry_title?: string | null;
}
