export class BookCorrectionForm {
	isbn: string | undefined;
	title: string | undefined;
	release_date: string | undefined;
	cover_image: string | undefined;
	book_type: string | undefined;
	description: string | undefined;
	comment: string | undefined;
	publisher_id: number | undefined;
	format_name: string | undefined;
	cover_url?: string;
}
